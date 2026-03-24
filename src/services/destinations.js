import { get } from "../api/crud";

const mapStage = (s) => ({
  id: s.id,
  name: s.name,
  area: s.area,
  direction: s.direction,
  landmark: s.landmark,
});

// inbound travel: origin = INBOUND stages, destination = BOTH stages (CBD)
// outbound travel: origin = BOTH stages (CBD), destination = OUTBOUND stages
export const getOriginStages = (travelDirection = "inbound", search = "") => {
  const dir = travelDirection === "inbound" ? "INBOUND" : "BOTH";
  return get(`/api/v1/stages?direction=${dir}&search=${encodeURIComponent(search)}`)
    .then((stages) => stages.map(mapStage));
};

export const getDestinationStages = (travelDirection = "inbound", search = "") => {
  const dir = travelDirection === "inbound" ? "BOTH" : "OUTBOUND";
  return get(`/api/v1/stages?direction=${dir}&search=${encodeURIComponent(search)}`)
    .then((stages) => stages.map(mapStage));
};

export const getDestinationsByTown = (_town, search = "") =>
  getDestinationStages("inbound", search);