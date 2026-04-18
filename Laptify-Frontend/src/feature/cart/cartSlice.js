import { addItem, getCart } from '@/feature/cart/cartThunk.js';
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  cart: [],
  isLoading: true,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialValue,
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        console.log("get cart")
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false 
        state.cart = action.payload
      })
      .addCase(getCart.rejected, (state) => {
        state.isLoading = true;
      })

      .addCase(addItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export default cartSlice.reducer;