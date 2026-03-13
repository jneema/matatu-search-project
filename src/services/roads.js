import { get } from "../api/crud";

export const getRoads = (town) =>
  get(`/api/roads?town=${town}`);
