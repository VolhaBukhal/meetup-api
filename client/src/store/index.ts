import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { meetupApi } from '@services/MeetupService'
import { authApi } from '@services/AuthServicies'
import searchReducer from '@store/reducers/searchSlice'
import authReducer from '@store/reducers/authSlice'

const rootReducer = combineReducers({
  searchReducer,
  authReducer,
  [meetupApi.reducerPath]: meetupApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMeddleware) =>
    getDefaultMeddleware().concat(meetupApi.middleware).concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
