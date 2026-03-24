import { get } from "../api/crud";

export const getRoutes = (origin, destination) =>
  get(`/api/v1/trips/search?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);