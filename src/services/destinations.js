import { get } from "../api/crud";

const mapStage = (s) => ({
  ...s,                
  id: s.id,
  name: s.name,
  area: s.area,
  direction: s.direction,
  landmark: s.landmark,
});

export const getOriginStages = (travelDirection = "inbound") => {
  const dir = travelDirection === "inbound" ? "inbound" : "outbound";
  return get(`/stages?direction=${dir}`)
    .then((stages) => stages.map(mapStage));
};

export const getDestinationStages = (travelDirection = "inbound") => {
  const dir = travelDirection === "inbound" ? "outbound" : "inbound";

  return get(`/stages?direction=${dir}`)
    .then((stages) => stages.map(mapStage));
};

export const getDestinationsByTown = (_town, search = "") =>
  getDestinationStages("inbound", search);