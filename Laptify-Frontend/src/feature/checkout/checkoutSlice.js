import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  items: [],
  customerInfo: {
    fullName: '',
    email: '',
    address: '',
    phoneNumber: '',
    saveForNextTime: false,
  },
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: initialValue,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setCustomerInfo: (state, action) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload };
    },
    clearCheckout: (state) => {
      state.items = [];
      state.customerInfo = {
        fullName: '',
        email: '',
        address: '',
        phoneNumber: '',
        saveForNextTime: false,
      };
    },
  },
});

export const { setItems, setCustomerInfo, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;