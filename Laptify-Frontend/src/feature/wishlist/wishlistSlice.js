import { createSlice } from "@reduxjs/toolkit"
import { addItem, fetchUserWishlist, removeItem } from "./wishlistThunk"

const initialValue = {
    productIdMap: {},
    total: 0
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState : initialValue,
    extraReducers: builder => {
        builder.addCase(fetchUserWishlist.pending, (state, action) => {
            console.log("Fetching wishlist for userId:", action.meta.arg);
        })

        builder.addCase(fetchUserWishlist.fulfilled, (state, action) => {
            const data = action.payload.productIds || []
            data.forEach(productId => state.productIdMap[productId] = true)
            state.total = data.length;
        })
        builder.addCase(addItem.pending, (state, action) => {
            console.log("Added to wishlist:", action.payload);
        })
        builder.addCase(addItem.fulfilled, (state, action) => {
            state.productIdMap[action.payload] = true
            state.total += 1;
        })
        builder.addCase(addItem.rejected, (state, action) => {
            delete state.productIdMap[action.meta.arg.productId]
        })

        builder.addCase(removeItem.fulfilled, (state, action) => {
            console.log("Removed from wishlist:", action.payload);
            delete state.productIdMap[action.payload]
            state.total -= 1;
        })
    }
})

export default wishlistSlice.reducer