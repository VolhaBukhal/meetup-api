import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthInitialState } from '@interfaces/index'
import { saveUserToLocalStorage, removeUserFromLocalStorage } from '@utils/storage'

const initialState: IAuthInitialState = {
  isAuthorized: false,
  userName: '',
  userId: '',
  token: '',
}

const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Omit<IAuthInitialState, 'isAuthorized'>>) => {
      saveUserToLocalStorage({
        userId: action.payload.userId,
        userName: action.payload.userName,
        token: action.payload.token,
      })
      state.isAuthorized = true
      state.userId = action.payload.userId
      state.userName = action.payload.userName
      state.token = action.payload.token
    },
    removeCredentials: (state) => {
      removeUserFromLocalStorage()
      state.isAuthorized = false
      state.userId = ''
      state.userName = ''
      state.token = ''
    },
  },
})

export const { setCredentials, removeCredentials } = authSlice.actions
export default authSlice.reducer
