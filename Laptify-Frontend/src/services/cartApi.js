import { axiosClient } from "@/lib/axiosClient.js";

export const addToCart = (item) => {
    return axiosClient.post("/carts/me", item)
}

export const getSelfCart = ({ page = 0, size = 5 }) => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    return axiosClient.get(`/carts/me?${params.toString()}`);
};