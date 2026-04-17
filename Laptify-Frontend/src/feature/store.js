import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "./checkout/checkoutSlice.js";
import wishlistReducer from "./wishlist/wishlistSlice.js";

const store = configureStore({
  reducer : {
    wishlist: wishlistReducer,
    checkout: checkoutReducer,
  }  
})

export default store;
