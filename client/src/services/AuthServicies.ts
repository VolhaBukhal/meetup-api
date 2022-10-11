import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '@constants/api'
import { IUser, IUserRegistrationResponse, IUserLoginResponse } from '@interfaces/index'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      return headers
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    registration: builder.mutation<IUserRegistrationResponse, IUser>({
      query: (user) => ({
        url: '/auth/registration',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation<IUserLoginResponse, IUser>({
      query: (user) => ({
        url: '/auth/login',
        method: 'POST',
        body: user,
        credentials: 'include',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: '/auth/getuser',
      }),
    }),
  }),
})
