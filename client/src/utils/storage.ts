import { LS_PREFIX } from '@constants/index'
import { LocalStorageData } from '@interfaces/index'

export const saveUserToLocalStorage = (userInfo: LocalStorageData) => {
  const stringifiedValue = JSON.stringify(userInfo)
  localStorage.setItem(`${LS_PREFIX}user`, stringifiedValue)
}
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(`${LS_PREFIX}user`)
}
