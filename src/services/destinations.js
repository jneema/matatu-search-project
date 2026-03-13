import { get } from "../api/crud";

export const getDestinationsByRoad = (roadName, search = "") =>
  get(`/api/destinations?road_name=${roadName}&search=${search}`);
