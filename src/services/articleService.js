import serviceAPI from './serviceAPI';

export const articleService = serviceAPI.injectEndpoints({
  endpoints: (build) => ({
    getArticleList: build.query({
      query: ({ page, limit = 5 }) => ({
        url: 'articles',
        params: {
          limit,
          offset: (page - 1) * limit,
        },
      }),
      providesTags: () => ['Article'],
    }),
    getArticle: build.query({
      query: (slug) => ({
        url: `articles/${slug}`,
      }),
      transformResponse: (response) => response.article,
      providesTags: () => ['Article'],
    }),
  }),
});

export const { useGetArticleListQuery, useGetArticleQuery } = articleService;
