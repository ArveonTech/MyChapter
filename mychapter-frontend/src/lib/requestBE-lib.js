import axios from "axios";

export const requestBE = async (method = "GET", resource, data = null, query = "", options = {}) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const url = query ? `${baseUrl}/${resource}?${query}` : `${baseUrl}/${resource}`;
  const { headers = {}, withCredentials = false } = options;

  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
      withCredentials,
    });
    if (response.status < 200 || response.status >= 300) {
      throw response;
    }

    return response;
  } catch (error) {
    if (!error.response) {
      throw {
        success: false,
        status: null,
        message: "Server failed to connect",
        data: null,
      };
    }

    throw {
      success: false,
      status: error.response.status,
      message: error.response.data?.message || "Request failed",
      data: error.response.data,
    };
  }
};
