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
    createArticle: build.mutation({
      query: (body) => ({
        url: 'articles',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Article'],
    }),
    editArticle: build.mutation({
      // eslint-disable-next-line arrow-body-style
      query: (body) => {
        // const { article } = body;
        return {
          url: `articles/${body.article.slug}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Article'],
    }),
    deleteArticle: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article'],
    }),
  }),
});

export const {
  useGetArticleListQuery,
  useGetArticleQuery,
  useCreateArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
} = articleService;
