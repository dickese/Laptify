import { axiosClient } from "@/lib/axiosClient.js";

export const getProducts = ({ page = 0, size = 5 }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  return axiosClient.get(`/products?${params.toString()}`);
};

export const createProduct = (data) => {
  return axiosClient.post(`/products`, data);
};