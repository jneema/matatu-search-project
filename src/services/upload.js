import { post } from "../api/crud";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return post("/upload", formData);
};