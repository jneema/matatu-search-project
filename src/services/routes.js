import { get } from "../api/crud";

export const getRoutes = (origin, destination) =>
  get(`/search?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);