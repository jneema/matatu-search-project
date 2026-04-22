import { get } from "../api/crud";

const mapStage = (s) => ({
  id: s.id,
  name: s.name,
  area: s.area,
  direction: s.direction,
  landmark: s.landmark,
});


export const getOriginStages = (travelDirection = "inbound", search = "") => {
  const dir = travelDirection === "inbound" ? "INBOUND" : "OUTBOUND";
  return get(`/api/v1/stages?direction=${dir}&search=${encodeURIComponent(search)}`)
    .then((stages) => stages.map(mapStage));
};

export const getDestinationStages = (travelDirection = "inbound", search = "") => {
  const dir = travelDirection === "inbound" ? "OUTBOUND" : "INBOUND";

  return get(`/api/v1/stages?direction=${dir}&search=${encodeURIComponent(search)}`)
    .then((stages) => stages.map(mapStage));
};

export const getDestinationsByTown = (_town, search = "") =>
  getDestinationStages("inbound", search);