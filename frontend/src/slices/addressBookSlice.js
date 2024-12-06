import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('address')
  ? JSON.parse(localStorage.getItem('address'))
  : { addresses: [] };

const addressBookSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    saveAddresses: (state, action) => {
        const address = action.payload;
        state.addresses = [...state.addresses, address];
        localStorage.setItem('address', JSON.stringify(state.addresses));
      },
    deleteAddress: (state, action) => {
    const address = action.payload;

    state.addresses = state.addresses.filter(
        (item) => item._id !== address
    );
    },
  },
});

export const { saveAddresses, deleteAddress } = addressBookSlice.actions;

export default addressBookSlice.reducer;
