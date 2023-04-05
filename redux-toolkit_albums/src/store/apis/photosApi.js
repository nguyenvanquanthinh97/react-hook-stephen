import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005/photos",
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => ({ type: "Photo", id: photo.id }));
          tags.push({ type: "AlbumsPhotos", id: album.id });
          return tags;
        },
        query: (album) => {
          return {
            url: "/",
            method: "GET",
            params: {
              albumId: album.id,
            },
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => [
          { type: "AlbumsPhotos", id: album.id },
        ],
        query: (album) => {
          return {
            url: "/",
            method: "POST",
            body: {
              url: faker.image.abstract(150, 150, true),
              albumId: album.id,
            },
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => [
          { type: "Photo", id: photo.id },
        ],
        query: (photo) => {
          return {
            url: `/${photo.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
export { photosApi };
