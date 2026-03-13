import { get, post, put, remove } from "../api/crud";

export const getTowns = (search = "") => get(`/api/towns?search=${search}`);
