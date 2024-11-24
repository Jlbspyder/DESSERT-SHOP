import { MENU_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const menuApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: ({keyword, pageNumber}) => ({
        url: MENU_URL,
        params: {
          pageNumber,
          keyword
        }
      }),
      providesTags: ['Menu'],
      keepUnusedDataFor: 5,
    }),
    getMenuDetails: builder.query({
      query: (menuId) => ({
        url: `${MENU_URL}/${menuId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createMenu: builder.mutation({
      query: () => ({
        url: MENU_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Menu'],
    }),
    updateMenu: builder.mutation({
      query: (data) => ({
        url: `${MENU_URL}/${data.menuId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Menu'],
    }),
    uploadMenuImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteMenu: builder.mutation({
        query: (menuId) => ({
            url: `${MENU_URL}/${menuId}`,
            method: 'DELETE'
        })
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${MENU_URL}/${data.menuId}/reviews`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Menu']
    }),
    getTopMenu: builder.query({
      query: () => ({
        url: `${MENU_URL}/top`
      }),
      keepUnusedDataFor: 5
    })
  }),
});

export const {
  useGetMenuQuery,
  useGetMenuDetailsQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useUploadMenuImageMutation,
  useDeleteMenuMutation,
  useCreateReviewMutation,
  useGetTopMenuQuery
} = menuApiSlice;
