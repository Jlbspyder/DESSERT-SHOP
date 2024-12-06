import { ADDRESS_BOOK_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const addressBookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddressBook: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: ADDRESS_BOOK_URL,
        params: {
          pageNumber,
          keyword,
        },
      }),
      providesTags: ['Addressbook'],
      keepUnusedDataFor: 5,
    }),
    getAddressBookDetails: builder.query({
      query: (addressId) => ({
        url: `${ADDRESS_BOOK_URL}/${addressId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createAddress: builder.mutation({
      query: (address) => ({
        url: ADDRESS_BOOK_URL,
        method: 'POST',
        body: address,
      }),
      invalidatesTags: ['Addressbook'],
    }),
  }),
});

export const {
  useGetAddressBookQuery,
  useGetAddressBookDetailsQuery,
  useCreateAddressMutation,
} = addressBookApiSlice;
