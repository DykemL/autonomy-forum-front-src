import { setCookie, getCookie, removeCookie } from 'typescript-cookie';

const INFINITY: number = 9999999;
const IS_LOGOUT: string = '.AspNetCore.IsLogout';

export function setLogout(isLogoutValue: boolean): void {
  if (isLogoutValue) {
    setCookie(IS_LOGOUT, 'true', {'expires': INFINITY});
    return;
  }

  setCookie(IS_LOGOUT, 'false', {'expires': INFINITY});
  removeCookie(IS_LOGOUT);
}

export function isLogout(): boolean {
  let state = getCookie(IS_LOGOUT);
  return state == 'true' || state === undefined;
}