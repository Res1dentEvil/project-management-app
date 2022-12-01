export function setLocalStorage(token: string) {
  localStorage.setItem('token', JSON.stringify(token));
}

export function getLocalStorageToken() {
  let token = '';
  if (localStorage.getItem('token')) {
    token = JSON.parse(localStorage.getItem('token') || '');
  }
  return token;
}
