import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISearchInitialState } from '@interfaces/index'

const initialState: ISearchInitialState = {
  search: '',
}

const searchSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setSearchWord: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const { setSearchWord } = searchSlice.actions
export default searchSlice.reducer
