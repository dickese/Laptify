import { addItem as addItemToWishlist, removeItem as removeItemFromWishlist, getWishlist, getWishlistProducts } from "@/services/user/wishlistService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addItem = createAsyncThunk(
    "wishlist/addItem",async (item, thunkAPI) => {
        try {
            await addItemToWishlist(item)
            return item.productId
        } catch (error) {            
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const removeItem = createAsyncThunk(
    "wishlist/removeItem",async (item, thunkAPI) => {
        try {
            await removeItemFromWishlist(item)
            return item.productId
        } catch (error) {            
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const fetchUserWishlist = createAsyncThunk(
    "wishlist/fetchUserWishlist", async (userId, thunkAPI) => {
        try {
            const response = await getWishlist(userId)
            return response.data
        } catch (error) {            
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const fetchUserWishlistProducts = createAsyncThunk(
    "wishlist/fetchUserWishlistProducts",async (_, thunkAPI) => {
        try {
            const response = await getWishlistProducts()
            return response.data
        } catch (error) {            
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)