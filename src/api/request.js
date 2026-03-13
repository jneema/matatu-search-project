import api from ".";

export const request = async (method, url, data = null) => {
  try {
    const response = await api({
      method,
      url,
      data,
    });

    return response.data;
  } catch (error) {
    console.error("API ERROR:", error.response?.data || error.message);
    throw error;
  }
};
