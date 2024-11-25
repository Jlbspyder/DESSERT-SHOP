import { ADDRESS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const addressApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAddress: builder.query({
            query: ({keyword, pageNumber}) => ({
                url: ADDRESS_URL,
                params: {
                    pageNumber,
                    keyword
                }
            }),
            providesTags: ['Address'],
            keepUnusedDataFor: 5
        }),
        getAddressDetails: builder.query({
            query: ({addressId}) => ({
              url: `${ADDRESS_URL}/${addressId}`,
            }),
            keepUnusedDataFor: 5,
          }),
    })
})

export const { useGetAddressQuery, useGetAddressDetailsQuery } = addressApiSlice