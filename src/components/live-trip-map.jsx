import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
  ZoomControl,
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

const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const orangeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Follows the user only while `follow` is true. When false, only sets the
// initial view once. Pass `fitBoundsTo` (array of extra positions) to use
// fitBounds on the first fix instead of setView — useful to show user + stage.
function NavigationController({ userPos, zoom, follow, fitBoundsTo }) {
  const map = useMap();
  const initialised = useRef(false);

  useEffect(() => {
    if (!userPos) return;
    if (!initialised.current) {
      if (fitBoundsTo?.length) {
        map.fitBounds(L.latLngBounds([userPos, ...fitBoundsTo]), {
          padding: [60, 60],
          maxZoom: 16,
          animate: true,
        });
      } else {
        map.setView(userPos, zoom);
      }
      initialised.current = true;
      return;
    }
    if (follow) {
      map.panTo(userPos, { animate: true, duration: 0.8, easeLinearity: 0.5 });
    }
  }, [userPos]);

  return null;
}

// Fires once on mount — used to zoom to the arrival summary bounds.
function FitBoundsController({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (!bounds) return;
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 17, animate: true });
  }, []);
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

const FAR_THRESHOLD_M = 1500;

const LiveTripMap = ({
  originStage,
  destStage,
  demoMode = false,
  simulationPhase = "boarded",
  onLocationUpdate,
  walkFromOverride = null,
  onFarFromStage,
  zoomPosition = "bottomleft",
}) => {
  const [userPos, setUserPos] = useState(null);
  const [trailPositions, setTrailPositions] = useState([]);
  const [routeCoords, setRouteCoords] = useState([]);
  const [demoArrived, setDemoArrived] = useState(false);
  const watchRef = useRef(null);
  const demoRef = useRef(null);
  const lastRouteFetchPos = useRef(null);
  const demoStartPos = useRef(null);
  const lastRealGPSPos = useRef(null);

  const NAV_ZOOM = simulationPhase === "walking" ? 18 : 16;
  const routeColor = simulationPhase === "walking" ? "#2563eb" : "#16a34a";

  const metersBetween = (a, b) => {
    const R = 6371000;
    const dLat = ((b[0] - a[0]) * Math.PI) / 180;
    const dLng = ((b[1] - a[1]) * Math.PI) / 180;
    const s =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((a[0] * Math.PI) / 180) *
        Math.cos((b[0] * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
  };

  useEffect(() => {
    if (demoRef.current) clearInterval(demoRef.current);
    if (watchRef.current) navigator.geolocation?.clearWatch(watchRef.current);
    setUserPos(null);
    setTrailPositions([]);
    setRouteCoords([]);
    setDemoArrived(false);
    lastRouteFetchPos.current = null;
    demoStartPos.current = null;

    console.log(
      "[LiveTripMap] init — demoMode:",
      demoMode,
      "phase:",
      simulationPhase,
    );
    console.log("[LiveTripMap] originStage:", originStage);
    console.log("[LiveTripMap] destStage:", destStage);

    if (demoMode) {
      if (!originStage?.latitude || !originStage?.longitude) return;

      let startLat, startLng, endLat, endLng, routeMode;

      if (simulationPhase === "walking") {
        // Priority: manual override → last real GPS → destStage → fallback offset
        if (walkFromOverride?.lat && walkFromOverride?.lng) {
          startLat = walkFromOverride.lat;
          startLng = walkFromOverride.lng;
        } else {
          const gps = lastRealGPSPos.current;
          if (gps) {
            startLat = gps[0];
            startLng = gps[1];
          } else if (destStage?.latitude && destStage?.longitude) {
            startLat = destStage.latitude + 0.001;
            startLng = destStage.longitude + 0.001;
          } else {
            startLat = originStage.latitude + 0.004;
            startLng = originStage.longitude + 0.003;
          }
        }
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
          demoStartPos.current = initial;
          setUserPos(initial);
          setTrailPositions([initial]);
          onLocationUpdate?.(initial);

          demoRef.current = setInterval(() => {
            currentStep++;
            if (currentStep > steps) {
              clearInterval(demoRef.current);
              setDemoArrived(true);
              return;
            }
            const pos = path[currentStep];
            setUserPos(pos);
            setTrailPositions((prev) => [...prev, pos]);
            onLocationUpdate?.(pos);
          }, 400);
        },
      );
    } else {
      if (
        simulationPhase === "boarded" &&
        originStage?.latitude &&
        destStage?.latitude
      ) {
        fetchRoadRoute(
          originStage.latitude,
          originStage.longitude,
          destStage.latitude,
          destStage.longitude,
          "driving",
        ).then((coords) => {
          if (coords) setRouteCoords(coords);
        });
      }

      // If override is set, pin the marker there immediately (don't wait for GPS)
      if (simulationPhase === "walking" && walkFromOverride?.lat) {
        setUserPos([walkFromOverride.lat, walkFromOverride.lng]);
        fetchRoadRoute(
          walkFromOverride.lat,
          walkFromOverride.lng,
          originStage.latitude,
          originStage.longitude,
          "walking",
        ).then((coords) => {
          if (coords) setRouteCoords(coords);
        });
      }

      if (!navigator.geolocation) {
        console.warn("[LiveTripMap] geolocation not available");
        return;
      }
      console.log("[LiveTripMap] starting GPS watch — phase:", simulationPhase);
      watchRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const p = [pos.coords.latitude, pos.coords.longitude];
          console.log(
            "[LiveTripMap] GPS fix:",
            p,
            "accuracy:",
            pos.coords.accuracy,
            "m",
          );
          lastRealGPSPos.current = p;
          // Don't overwrite userPos with GPS when override is active in walking mode
          if (!(simulationPhase === "walking" && walkFromOverride?.lat)) {
            setUserPos(p);
            setTrailPositions((prev) => [...prev.slice(-50), p]);
            onLocationUpdate?.(p);
          }

          if (simulationPhase === "walking" && originStage?.latitude) {
            // Fire onFarFromStage once if user is more than threshold away
            const distToStage = metersBetween(p, [
              originStage.latitude,
              originStage.longitude,
            ]);
            if (distToStage > FAR_THRESHOLD_M) onFarFromStage?.();

            // Use walk override or real GPS as route start
            const routeStart = walkFromOverride?.lat
              ? [walkFromOverride.lat, walkFromOverride.lng]
              : p;

            const last = lastRouteFetchPos.current;
            const dist = last ? metersBetween(last, routeStart) : null;
            const shouldFetch = !last || dist > 30;
            if (shouldFetch) {
              lastRouteFetchPos.current = routeStart;
              fetchRoadRoute(
                routeStart[0],
                routeStart[1],
                originStage.latitude,
                originStage.longitude,
                "walking",
              ).then((coords) => {
                if (coords) setRouteCoords(coords);
              });
            }
          }
        },
        (err) =>
          console.warn("[LiveTripMap] GPS error:", err.code, err.message),
        { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 },
      );
    }

    return () => {
      if (demoRef.current) clearInterval(demoRef.current);
      if (watchRef.current) navigator.geolocation?.clearWatch(watchRef.current);
    };
  }, [demoMode, simulationPhase, walkFromOverride]);

  if (!originStage?.latitude || !originStage?.longitude) return null;

  if (!demoMode && simulationPhase === "walking" && !userPos) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
        <div className="w-5 h-5 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-xs text-gray-400 font-medium">
          Getting your location…
        </p>
      </div>
    );
  }

  const originPos = [originStage.latitude, originStage.longitude];
  const destPos =
    destStage?.latitude && destStage?.longitude
      ? [destStage.latitude, destStage.longitude]
      : null;

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

  // Bounds for arrival summary zoom
  const arrivalBounds = (() => {
    if (!demoArrived || !demoStartPos.current) return null;
    if (simulationPhase === "walking") {
      // start of walk → boarding stage
      return L.latLngBounds([demoStartPos.current, originPos]);
    }
    if (simulationPhase === "boarded" && destPos) {
      // boarding stage → alighting stage
      return L.latLngBounds([originPos, destPos]);
    }
    return null;
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
        <ZoomControl position={zoomPosition} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* NavigationController stays mounted so initialised persists across override changes */}
        {!demoArrived && (
          <NavigationController
            userPos={userPos}
            zoom={NAV_ZOOM}
            follow={demoMode}
            fitBoundsTo={
              !demoMode && simulationPhase === "walking" && !walkFromOverride
                ? [originPos]
                : !demoMode && simulationPhase === "boarded" && destPos
                  ? [destPos]
                  : undefined
            }
          />
        )}

        {/* When override is set, zoom to fit override → stage (separate from NavigationController) */}
        {walkFromOverride?.lat && !demoArrived && (
          <FitBoundsController
            key={walkFromOverride.name}
            bounds={L.latLngBounds([
              [walkFromOverride.lat, walkFromOverride.lng],
              originPos,
            ])}
          />
        )}

        {/* On demo arrival: zoom to show full walk from start to stage */}
        {demoArrived && arrivalBounds && (
          <FitBoundsController bounds={arrivalBounds} />
        )}

        {/* Boarded real mode: fit origin → destination on mount so both markers are visible */}
        {!demoMode && simulationPhase === "boarded" && destPos && (
          <FitBoundsController
            key="boarded-origin-dest"
            bounds={L.latLngBounds([originPos, destPos])}
          />
        )}

        {/* Full planned route (faint) */}
        {routeCoords.length > 1 && (
          <Polyline
            positions={routeCoords}
            color={routeColor}
            weight={6}
            opacity={demoArrived ? 0.7 : 0.15}
          />
        )}

        {/* Remaining route ahead (brighter while navigating) */}
        {!demoArrived && remainingRoute.length > 1 && (
          <Polyline
            positions={remainingRoute}
            color={routeColor}
            weight={6}
            opacity={0.55}
          />
        )}

        {/* Trail walked so far */}
        {trailPositions.length > 1 && (
          <Polyline
            positions={trailPositions}
            color={routeColor}
            weight={6}
            opacity={0.9}
          />
        )}

        {/* Position marker: override location when set, otherwise real GPS */}
        {walkFromOverride?.lat ? (
          <Marker
            position={[walkFromOverride.lat, walkFromOverride.lng]}
            icon={blueIcon}
          >
            <Popup>
              <p style={{ fontWeight: "bold", fontSize: 13 }}>Walk from here</p>
              <p style={{ fontSize: 11, color: "#6b7280" }}>
                {walkFromOverride.name}
              </p>
            </Popup>
          </Marker>
        ) : (
          userPos && (
            <Marker position={userPos} icon={blueIcon}>
              <Popup>
                <p style={{ fontWeight: "bold", fontSize: 13 }}>You are here</p>
              </Popup>
            </Marker>
          )
        )}

        {/* Accuracy ring — always at real GPS position */}
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
          </>
        )}

        {/* Walking phase: stage marker (destination of walk) */}
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
                Board here
              </p>
            </Popup>
          </Marker>
        )}

        {/* Walking arrival: orange pin where the walk started */}
        {demoArrived &&
          simulationPhase === "walking" &&
          demoStartPos.current && (
            <Marker position={demoStartPos.current} icon={orangeIcon}>
              <Popup>
                <p style={{ fontWeight: "bold", fontSize: 13 }}>
                  You started here
                </p>
              </Popup>
            </Marker>
          )}

        {/* Boarded phase: origin (boarding) marker */}
        {simulationPhase === "boarded" && (
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
                Boarded here
              </p>
            </Popup>
          </Marker>
        )}

        {/* Boarded phase: destination (alight) marker — always visible */}
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
                Alight here
              </p>
            </Popup>
          </Marker>
        )}

        {/* Boarded arrival: orange pin at the boarding stage (where they got on) */}
        {demoArrived && simulationPhase === "boarded" && (
          <Marker position={originPos} icon={orangeIcon}>
            <Popup>
              <p style={{ fontWeight: "bold", fontSize: 13 }}>
                {originStage.name}
              </p>
              {originStage.landmark && (
                <p style={{ fontSize: 11, color: "#6b7280" }}>
                  {originStage.landmark}
                </p>
              )}
              <p style={{ fontSize: 11, color: "#ea580c", marginTop: 4 }}>
                You boarded here
              </p>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LiveTripMap;
