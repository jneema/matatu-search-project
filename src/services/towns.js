import { get, post, put, remove } from "../api/crud";

export const getTowns = () => get("/api/towns");