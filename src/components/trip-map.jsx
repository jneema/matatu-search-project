import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
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

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
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

const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FitBounds({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length >= 2) {
      map.fitBounds(positions, { padding: [50, 50] });
    } else if (positions.length === 1) {
      map.setView(positions[0], 16);
    }
  }, [positions.join(",")]);
  return null;
}

// walkingMode: "to_stage" — show user walking to boarding stage
// walkingMode: "from_stage" — show alighting stage, user walks to destination
// default: show origin → dest matatu route
const TripMap = ({
  originStage,
  destStage,
  height = "280px",
  showRoute = false,
  walkingMode = null, // "to_stage" | "from_stage" | null
}) => {
  const [userPos, setUserPos] = useState(null);

  useEffect(() => {
    if (!walkingMode) return;
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.warn("GPS unavailable:", err),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }, [walkingMode]);

  if (!originStage?.latitude || !originStage?.longitude) return null;

  const originPos = [originStage.latitude, originStage.longitude];
  const destPos =
    destStage?.latitude && destStage?.longitude
      ? [destStage.latitude, destStage.longitude]
      : null;

  // walking to stage: user → boarding stage
  if (walkingMode === "to_stage") {
    const positions = userPos ? [userPos, originPos] : [originPos];
    return (
      <div style={{ height, width: "100%" }}>
        <MapContainer
          zoom={15}
          center={originPos}
          style={{ height: "100%", width: "100%" }}
          zoomControl
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds positions={positions} />
          {/* User location */}
          {userPos && (
            <Marker position={userPos} icon={blueIcon}>
              <Popup>
                <p style={{ fontSize: 13, fontWeight: "bold" }}>You are here</p>
              </Popup>
            </Marker>
          )}
          {/* Boarding stage */}
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
          {/* Walking line */}
          {userPos && (
            <Polyline
              positions={[userPos, originPos]}
              color="#2563eb"
              weight={3}
              opacity={0.7}
              dashArray="8 5"
            />
          )}
        </MapContainer>
      </div>
    );
  }

  // arrived: show alighting stage — user needs to walk from here
  if (walkingMode === "from_stage") {
    const positions = destPos ? [destPos] : [originPos];
    return (
      <div style={{ height, width: "100%" }}>
        <MapContainer
          zoom={16}
          center={destPos ?? originPos}
          style={{ height: "100%", width: "100%" }}
          zoomControl
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds positions={positions} />
          {/* Alighting stage */}
          {destPos && (
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
                  🚏 You alighted here
                </p>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    );
  }

  // default: origin → dest route view
  const positions = destPos ? [originPos, destPos] : [originPos];
  return (
    <div style={{ height, width: "100%" }}>
      <MapContainer
        zoom={14}
        center={originPos}
        style={{ height: "100%", width: "100%" }}
        zoomControl
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds positions={positions} />
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
        {destPos && (
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
        {showRoute && destPos && (
          <Polyline
            positions={[originPos, destPos]}
            color="#16a34a"
            weight={3}
            opacity={0.7}
            dashArray="8 6"
          />
        )}
      </MapContainer>
    </div>
  );
};

export default TripMap;
