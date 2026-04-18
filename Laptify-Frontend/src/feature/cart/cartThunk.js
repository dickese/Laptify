import { getErrorMessage } from "@/lib/axiosClient.js";
import { addToCart, getSelfCart } from "@/services/cartApi.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'sonner'


export const addItem = createAsyncThunk('cart/addItem', async (item, thunkAPI) => {
  try {
    const res = await addToCart(item);
    return res.data.data;
  } catch (e) {
    const message = getErrorMessage(e, 'Thêm sản phẩm vào giỏ hàng thất bại');
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const getCart = createAsyncThunk('cart/getCart', async (_, thunkAPI) => {
  try {
    const res = await getSelfCart({page: 0, size: 5});
    return res.data.data;
  } catch (e) {
    const message = getErrorMessage(e, 'Lấy giỏ hàng thất bại');
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});