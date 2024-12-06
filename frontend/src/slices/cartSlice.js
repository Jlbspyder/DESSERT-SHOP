import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utilities/cartUtilities';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: '' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const menuItem = action.payload;

      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === menuItem._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        const newItem = { ...menuItem, quantity: 1 };
        state.cartItems.push(newItem);
      }

      return updateCart(state);
    },
    deleteCart: (state, action) => {
      const menuItem = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => item._id !== menuItem._id
      );

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const menuItem = action.payload;

      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === menuItem._id
      );
      if (state.cartItems[itemIndex].quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== menuItem._id
        );
      } else {
        state.cartItems[itemIndex].quantity -= 1;
      }

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    // saveAddressBook: (state, action) => {
    //   const address = action.payload;
    //   state.addressBook = [...state.addressBook, address];
    //   return updateCart(state);
    // },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    // saveCardDetails: (state, action) => {
    //   state.cardDetails = action.payload;
    //   return updateCart(state);
    // },
    clearCartItems: (state, action) => {
      state.cartItems =  [];
      return updateCart(state);
    },
    resetCart: (state) => (state.initialState),
    clearShippingAddress: (state, action) => {
      state.shippingAddress =  {
        name: '',
        address: '',
        city: '',
        postalCode: '',
        state: '',
        country: '',
      };
      return updateCart(state);
    }
  },
});

export const {
  addToCart,
  deleteCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearShippingAddress,
  resetCart,
  // saveAddressBook,
  // saveCardDetails,
  clearCartItems
} = cartSlice.actions;

export default cartSlice.reducer;
