import api from ".";

const request = async (method, url, data = null) => {
  try {
    const isFormData = data instanceof FormData;

    const response = await api({
      method,
      url,
      data,
      headers: isFormData ? {} : { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("API ERROR:", error.response?.data || error.message);
    throw error;
  }
};

export const get = (url) => request("GET", url);

export const post = (url, data) => request("POST", url, data);

export const put = (url, data) => request("PUT", url, data);

export const remove = (url) => request("DELETE", url);
