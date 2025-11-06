import axios from "axios";

export const requestBE = async (method = "GET", resource, data = null, query = "", options = {}) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const url = query ? `${baseUrl}/${resource}?${query}` : `${baseUrl}/${resource}`;

  const { headers = {}, withCredentials = false } = options;

  return axios({
    method,
    url,
    headers,
    data,
    withCredentials,
  });
};
