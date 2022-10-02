import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '@constants/api'
import { IMeetup, IEditedMeetup } from '@interfaces/index'

type Params = {
  limit?: number
  search?: string
}

export const meetupApi = createApi({
  reducerPath: 'meetupApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0ZTZjNTgxLWY4YWItNDc4YS05OTE4LTA4Zjg4NjEwMzQ2OSIsInJvbGVzIjoiVVNFUiIsImlhdCI6MTY2NDc0NjA3NSwiZXhwIjoxNjY0NzQ3ODc1fQ.y9RkZC_OdysX_XOCej4LOnimiYC7Yy2LuoRujgB2zws',
      )
      return headers
    },
  }),
  tagTypes: ['Meetups'],
  endpoints: (builder) => ({
    getAllMeetups: builder.query<IMeetup[], Params>({
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
        headers: {
          Authorization:
            '\'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0ZTZjNTgxLWY4YWItNDc4YS05OTE4LTA4Zjg4NjEwMzQ2OSIsInJvbGVzIjoiVVNFUiIsImlhdCI6MTY2NDc0NjA3NSwiZXhwIjoxNjY0NzQ3ODc1fQ.y9RkZC_OdysX_XOCej4LOnimiYC7Yy2LuoRujgB2zws',
        },
      }),
      invalidatesTags: ['Meetups'],
    }),
    updateMeetup: builder.mutation<IMeetup, IMeetup>({
      query: (meetup) => ({
        url: `/meetups/${meetup.id_meetup}`,
        method: 'PUT',
        body: meetup,
        headers: {
          Authorization:
            '\'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0ZTZjNTgxLWY4YWItNDc4YS05OTE4LTA4Zjg4NjEwMzQ2OSIsInJvbGVzIjoiVVNFUiIsImlhdCI6MTY2NDc0NjA3NSwiZXhwIjoxNjY0NzQ3ODc1fQ.y9RkZC_OdysX_XOCej4LOnimiYC7Yy2LuoRujgB2zws',
        },
      }),
      invalidatesTags: ['Meetups'],
    }),
    deleteMeetup: builder.mutation<IMeetup, string>({
      query: (id) => ({
        url: `/meetups/${id}`,
        method: 'DELETE',
        headers: {
          Authorization:
            '\'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0ZTZjNTgxLWY4YWItNDc4YS05OTE4LTA4Zjg4NjEwMzQ2OSIsInJvbGVzIjoiVVNFUiIsImlhdCI6MTY2NDc0NjA3NSwiZXhwIjoxNjY0NzQ3ODc1fQ.y9RkZC_OdysX_XOCej4LOnimiYC7Yy2LuoRujgB2zws',
        },
      }),
      invalidatesTags: ['Meetups'],
    }),
  }),
})
