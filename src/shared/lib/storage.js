export function readLocalStorage(key) {
  return window.localStorage.getItem(key) ?? ''
}

export function writeLocalStorage(key, value) {
  window.localStorage.setItem(key, value)
}

export function removeLocalStorage(key) {
  window.localStorage.removeItem(key)
}
