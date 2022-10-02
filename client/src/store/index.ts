import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { meetupApi } from '@services/MeetupService'
import searchReducer from '@store/reducers/searchSlice'

const rootReducer = combineReducers({
  searchReducer,
  [meetupApi.reducerPath]: meetupApi.reducer,
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMeddleware) => getDefaultMeddleware().concat(meetupApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
