import {
  readLocalStorage,
  removeLocalStorage,
  writeLocalStorage,
} from '../../../shared/lib/storage'

const tokenStorageKey = 'observer-dashboard-token'

export function readSessionToken() {
  return readLocalStorage(tokenStorageKey)
}

export function writeSessionToken(token) {
  writeLocalStorage(tokenStorageKey, token)
}

export function clearSessionToken() {
  removeLocalStorage(tokenStorageKey)
}
