export interface IMeetup {
  id_meetup: string
  title: string
  description: string
  time: string
  place: string
  tags: string[]
  userId: string
}

export type IEditedMeetup = Omit<IMeetup, 'userId' | 'id_meetup'>

export interface ISearchInitialState {
  search: string
}

export interface IAuthInitialState {
  isAuthorized: boolean
  userName: string
  userId: string
  token: string
}

export type LocalStorageData = Omit<IAuthInitialState, 'isAuthorized'>

export interface IUser {
  email: string
  password: string
}

export interface IUserRegistrationResponse {
  message: string
  user: {
    user_id: string
    email: string
    password: string
    role: string
  }
}

export interface IUserLoginResponse {
  message: string
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    role: string
  }
}

export type SignupError = {
  data: {
    message: string
  }
}

export type RefreshTokenData = {
  accessToken: string
}

export type GetAllMeetupsQueryParams = {
  limit?: number
  search?: string
}
