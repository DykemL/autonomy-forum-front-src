import jwtDecode from 'jwt-decode';
import { getCookie, removeCookie } from 'typescript-cookie';
import { User } from '../../Store/User/User';
import { Role } from '../../Store/User/UserRoles';
import { AnyObject, Nullable } from '../Types';

const JWT_COOKIE_PATH: string = '.AspNetCore.Application.Jwt';
const REFRESH_COOKIE_PATH: string = '.AspNetCore.Application.Refresh';

const USERNAME_PATH = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
const ROLES_PATH = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

export function getUser(): Nullable<User> {
  const decodedJwt = getDecodedJwt();
  if (decodedJwt == undefined) {
    return undefined;
  }

  const userName: Nullable<string> = decodedJwt[USERNAME_PATH];
  const rawRoles: any = decodedJwt[ROLES_PATH];
  let roles: Role[] = [];
  if (rawRoles === undefined) {
    roles = [];
  }
  if (typeof rawRoles === 'string') {
    roles = [rawRoles as Role]
  } else {
    roles = rawRoles as Role[];
  }

  return {
    userName: userName,
    roles: roles
  };
}

export function getDecodedJwt(): Nullable<AnyObject> {
  const jwt = getCookie(JWT_COOKIE_PATH);
  return jwt !== undefined ? jwtDecode<Nullable<AnyObject>>(jwt) : undefined;
}

export function removeJwt(): void {
  removeCookie(JWT_COOKIE_PATH);
  removeCookie(REFRESH_COOKIE_PATH);
}