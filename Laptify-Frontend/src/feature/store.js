import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "./checkout/checkoutSlice.js";
import wishlistReducer from "./wishlist/wishlistSlice.js";
import cartReducer from './cart/cartSlice.js'

const store = configureStore({
  reducer : {
    wishlist: wishlistReducer,
    checkout: checkoutReducer,
    cart: cartReducer,
  },
});

export default store;
