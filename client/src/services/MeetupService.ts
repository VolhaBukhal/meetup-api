import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '@constants/api'
import { IMeetup } from '@interfaces/index'

export const meetupApi = createApi({
  reducerPath: 'meetupApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllMeetups: builder.query<IMeetup, string>({
      query: () => ({ url: '/meetups' }),
    }),
  }),
})

// export const {useGetAllMeetups} = meetupApi
