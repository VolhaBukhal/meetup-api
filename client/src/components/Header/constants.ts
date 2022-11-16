import { PAGE_ROUTES } from '@constants/routes'

export const pages = [{ page: 'Board', path: PAGE_ROUTES.MEETUPS }]
export const settingsUnAuthorized = [
  { page: 'Login', path: PAGE_ROUTES.LOGIN },
  { page: 'SignUp', path: PAGE_ROUTES.SIGNUP },
]
export const settingsAuthorized = [{ page: 'Logout', path: PAGE_ROUTES.HOME }]
