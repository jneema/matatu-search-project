import { get } from "../api/crud";

export const getRoads = (town, search = "") =>
  get(`/api/roads?town=${town}&search=${search}`);