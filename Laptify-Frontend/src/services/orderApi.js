import { axiosClient } from "@/lib/axiosClient.js";

export const createOrder = (order) => {
  return axiosClient.post('/orders', order);
};
