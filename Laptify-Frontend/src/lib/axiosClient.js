import axios from "axios";

export const axiosClient = axios.create({
    baseURL: 'http://localhost:8080' + '/api',
    headers: {
        "Content-Type": "application/json",
    },
})


export const getErrorMessage = (err, message) => {
  let res = message;
  if (axios.isAxiosError(err)) res = err.response?.data.message || message;
  return res;
};
