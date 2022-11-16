import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '@constants/api'
import {
  IMeetup,
  IEditedMeetup,
  RefreshTokenData,
  GetAllMeetupsQueryParams,
} from '@interfaces/index'
import { RootState } from '@store/index'
import { setCredentials, removeCredentials } from '@store/reducers/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authReducer.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.data === 'Unauthorized') {
    const RefreshResult = await baseQuery('/auth/refresh', api, extraOptions)
    if (RefreshResult?.data) {
      const user = api.getState().authReducer
      api.dispatch(
        setCredentials({ ...user, token: (RefreshResult.data as RefreshTokenData).accessToken }),
      )
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(removeCredentials())
    }
  }
  return result
}

export const meetupApi = createApi({
  reducerPath: 'meetupApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Meetups'],
  endpoints: (builder) => ({
    getAllMeetups: builder.query<IMeetup[], GetAllMeetupsQueryParams>({
      query: ({ limit = 1, search }) => ({
        url: '/meetups',
        params: {
          limit,
          search,
        },
      }),
      providesTags: (result) => ['Meetups'],
    }),
    createMeetup: builder.mutation<IMeetup, IEditedMeetup>({
      query: (meetup) => ({
        url: '/meetups',
        method: 'POST',
        body: meetup,
      }),
      invalidatesTags: ['Meetups'],
    }),
    updateMeetup: builder.mutation<IMeetup, IMeetup>({
      query: (meetup) => ({
        url: `/meetups/${meetup.id}`,
        method: 'PUT',
        body: meetup,
      }),
      invalidatesTags: ['Meetups'],
    }),
    deleteMeetup: builder.mutation<IMeetup, string>({
      query: (id) => ({
        url: `/meetups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Meetups'],
    }),
  }),
})
