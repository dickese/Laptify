import { axiosClient } from "@/lib/axiosClient"

export const addItem = (item) => {
    console.log("Adding item to wishlist, productId:", item.productId);
    return axiosClient.post('/v1/wishlists/add', item.productId)
}

export const removeItem = (item) => {
    console.log("Removing item from wishlist, productId:", item.productId);
    return axiosClient.delete(`/v1/wishlists/${item.productId}`)
}

export const getWishlist = (userId) => {
    return axiosClient.get('/v1/wishlists', {
        data: userId
    })
}

export const getWishlistProducts = () => {
    return axiosClient.get('/v1/wishlists/products')
}