import serviceAPI from './serviceAPI';

export const authService = serviceAPI.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
    loginUser: build.mutation({
      query: (body) => ({
        url: 'users/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Article'],
    }),
    editUser: build.mutation({
      query: (body) => ({
        url: 'user',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useEditUserMutation } = authService;
