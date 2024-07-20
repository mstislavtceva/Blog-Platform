/* eslint-disable import/no-extraneous-dependencies */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const serviceAPI = createApi({
  reducerPath: 'serviceAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
  }),
  endpoints: (build) => ({
    getArticleList: build.query({
      query: (page, limit = 5, offset = (page - 1) * limit) =>
        `articles?${limit && `limit=${limit}`}&${offset !== 0 ? `offset=${offset}` : `offset=${0}`}`,
    }),
    getArticle: build.query({
      query: (slug) => `articles/${slug}`,
    }),
  }),
});

export const { useGetArticleListQuery, useGetArticleQuery } = serviceAPI;
export default serviceAPI;
