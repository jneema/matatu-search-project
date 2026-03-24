import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const blackIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function NavigationController({ userPos, zoom }) {
  const map = useMap();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!userPos) return;
    if (isFirstRender.current) {
      map.setView(userPos, zoom);
      isFirstRender.current = false;
    } else {
      map.panTo(userPos, { animate: true, duration: 0.8, easeLinearity: 0.5 });
    }
  }, [userPos]);

  return null;
}

async function fetchRoadRoute(
  startLat,
  startLng,
  endLat,
  endLng,
  mode = "driving",
) {
  const profile = mode === "walking" ? "foot" : "driving";
  const url = `https://router.project-osrm.org/route/v1/${profile}/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.code !== "Ok" || !data.routes?.length) return null;
    return data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
  } catch (err) {
    console.warn("OSRM routing failed, using straight line:", err);
    return null;
  }
}

const LiveTripMap = ({
  originStage,
  destStage,
  demoMode = false,
  simulationPhase = "boarded",
  onLocationUpdate,
}) => {
  const [userPos, setUserPos] = useState(null);
  const [trailPositions, setTrailPositions] = useState([]);
  const [routeCoords, setRouteCoords] = useState([]);
  const watchRef = useRef(null);
  const demoRef = useRef(null);

  const NAV_ZOOM = simulationPhase === "walking" ? 18 : 16;
  const routeColor = simulationPhase === "walking" ? "#2563eb" : "#16a34a";

  useEffect(() => {
    if (demoRef.current) clearInterval(demoRef.current);
    if (watchRef.current) navigator.geolocation?.clearWatch(watchRef.current);
    setUserPos(null);
    setTrailPositions([]);
    setRouteCoords([]);

    if (demoMode) {
      if (!originStage?.latitude || !originStage?.longitude) return;

      let startLat, startLng, endLat, endLng, routeMode;

      if (simulationPhase === "walking") {
        startLat = originStage.latitude + 0.004;
        startLng = originStage.longitude + 0.003;
        endLat = originStage.latitude;
        endLng = originStage.longitude;
        routeMode = "walking";
      } else {
        if (!destStage?.latitude || !destStage?.longitude) return;
        startLat = originStage.latitude;
        startLng = originStage.longitude;
        endLat = destStage.latitude;
        endLng = destStage.longitude;
        routeMode = "driving";
      }

      fetchRoadRoute(startLat, startLng, endLat, endLng, routeMode).then(
        (coords) => {
          const path = coords ?? [
            [startLat, startLng],
            [endLat, endLng],
          ];
          setRouteCoords(path);

          let currentStep = 0;
          const steps = path.length - 1;

          const initial = path[0];
          setUserPos(initial);
          setTrailPositions([initial]);
          onLocationUpdate?.(initial);

          demoRef.current = setInterval(() => {
            currentStep++;
            if (currentStep > steps) {
              clearInterval(demoRef.current);
              return;
            }
            const pos = path[currentStep];
            setUserPos(pos);
            setTrailPositions((prev) => [...prev.slice(-50), pos]);
            onLocationUpdate?.(pos);
          }, 400);
        },
      );
    } else {
      // Real GPS — also fetch road route to show ahead of user
      if (originStage?.latitude && destStage?.latitude) {
        const mode = simulationPhase === "walking" ? "walking" : "driving";
        fetchRoadRoute(
          originStage.latitude,
          originStage.longitude,
          destStage.latitude,
          destStage.longitude,
          mode,
        ).then((coords) => {
          if (coords) setRouteCoords(coords);
        });
      }

      if (!navigator.geolocation) return;
      watchRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const p = [pos.coords.latitude, pos.coords.longitude];
          setUserPos(p);
          setTrailPositions((prev) => [...prev.slice(-50), p]);
          onLocationUpdate?.(p);
        },
        (err) => console.warn("GPS error:", err),
        { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 },
      );
    }

    return () => {
      if (demoRef.current) clearInterval(demoRef.current);
      if (watchRef.current) navigator.geolocation?.clearWatch(watchRef.current);
    };
  }, [demoMode, simulationPhase]);

  if (!originStage?.latitude || !originStage?.longitude) return null;

  const originPos = [originStage.latitude, originStage.longitude];
  const destPos =
    destStage?.latitude && destStage?.longitude
      ? [destStage.latitude, destStage.longitude]
      : null;

  // Slice route from closest point to user onwards — the "ahead" portion
  const remainingRoute = (() => {
    if (!userPos || routeCoords.length < 2) return [];
    let closestIdx = 0;
    let closestDist = Infinity;
    routeCoords.forEach(([lat, lng], i) => {
      const d = Math.abs(lat - userPos[0]) + Math.abs(lng - userPos[1]);
      if (d < closestDist) {
        closestDist = d;
        closestIdx = i;
      }
    });
    return routeCoords.slice(closestIdx);
  })();

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={userPos || originPos}
        zoom={NAV_ZOOM}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {userPos && <NavigationController userPos={userPos} zoom={NAV_ZOOM} />}

        {/* Full route — very faint background showing entire journey */}
        {routeCoords.length > 1 && (
          <Polyline
            positions={routeCoords}
            color={routeColor}
            weight={6}
            opacity={0.15}
          />
        )}

        {/* Remaining route ahead — prominent */}
        {remainingRoute.length > 1 && (
          <Polyline
            positions={remainingRoute}
            color={routeColor}
            weight={6}
            opacity={0.55}
          />
        )}

        {/* Trail behind — solid, shows where user has been */}
        {trailPositions.length > 1 && (
          <Polyline
            positions={trailPositions}
            color={routeColor}
            weight={6}
            opacity={0.9}
          />
        )}

        {/* User position dot */}
        {userPos && (
          <>
            <Circle
              center={userPos}
              radius={simulationPhase === "walking" ? 12 : 35}
              pathOptions={{
                color: routeColor,
                fillColor: routeColor,
                fillOpacity: 0.15,
                weight: 1.5,
              }}
            />
            <Circle
              center={userPos}
              radius={6}
              pathOptions={{
                color: "#ffffff",
                fillColor: routeColor,
                fillOpacity: 1,
                weight: 2.5,
              }}
            />
          </>
        )}

        {/* Walking — boarding stage as target */}
        {simulationPhase === "walking" && (
          <Marker position={originPos} icon={greenIcon}>
            <Popup>
              <p style={{ fontWeight: "bold", fontSize: 13 }}>
                {originStage.name}
              </p>
              {originStage.landmark && (
                <p style={{ fontSize: 11, color: "#6b7280" }}>
                  {originStage.landmark}
                </p>
              )}
              <p style={{ fontSize: 11, color: "#16a34a", marginTop: 4 }}>
                📍 Board here
              </p>
            </Popup>
          </Marker>
        )}

        {/* Boarded — alighting stage as target */}
        {simulationPhase === "boarded" && destPos && (
          <Marker position={destPos} icon={blackIcon}>
            <Popup>
              <p style={{ fontWeight: "bold", fontSize: 13 }}>
                {destStage.name}
              </p>
              {destStage.landmark && (
                <p style={{ fontSize: 11, color: "#6b7280" }}>
                  {destStage.landmark}
                </p>
              )}
              <p style={{ fontSize: 11, color: "#374151", marginTop: 4 }}>
                🚏 Alight here
              </p>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LiveTripMap;
