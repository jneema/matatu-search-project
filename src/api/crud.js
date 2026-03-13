import { request } from "./request";

export const get = (url) => request("GET", url);

export const post = (url, data) => request("POST", url, data);

export const put = (url, data) => request("PUT", url, data);

export const remove = (url) => request("DELETE", url);
