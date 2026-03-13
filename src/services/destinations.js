import { get } from "../api/crud";

export const getDestinationsByRoad = async (road) => {
  if (!road) return [];
  try {
    const data = await get(`/api/destinations?road_name=${road}`);
    return data;
  } catch (err) {
    console.error("Failed to fetch destinations:", err);
    return [];
  }
};
