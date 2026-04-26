import { get, post } from "../api/crud";

const mapStage = (s) => ({
  ...s,
  id: s.id,
  name: s.name,
  area: s.area,
  direction: s.direction,
  landmark: s.landmark,
});

export const addStage = (data) => {
  return post("/stages", data);
};

export const getOriginStages = (travelDirection = "inbound") => {
  const dir = travelDirection === "inbound" ? "inbound" : "outbound";
  return get(`/stages?direction=${dir}`).then((stages) => stages.map(mapStage));
};

export const getDestinationStages = (
  travelDirection = "inbound",
  fromStageId = null,
) => {
  let url = `/stages?`;

  if (fromStageId) {
    url += `from_id=${fromStageId}`;
  }

  return get(url).then((stages) => stages.map(mapStage));
};

export const getDestinationsByTown = (_town, search = "") =>
  getDestinationStages("inbound", search);
