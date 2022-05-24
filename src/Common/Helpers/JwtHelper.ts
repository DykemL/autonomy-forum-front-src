import jwtDecode from 'jwt-decode';
import { getCookie, removeCookie } from 'typescript-cookie';
import { JwtUser } from '../../Store/User/User';
import { Role } from '../../Store/User/Roles';
import { AnyObject, Guid, Nullable } from '../Types';

const JWT_COOKIE_PATH: string = '.AspNetCore.Application.Jwt';
const REFRESH_COOKIE_PATH: string = '.AspNetCore.Application.Refresh';

const ID_PATH = 'nameid';
const USERNAME_PATH = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
const ROLES_PATH = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

export function getUser(): Nullable<JwtUser> {
  const decodedJwt = getDecodedJwt();
  if (decodedJwt == undefined) {
    return undefined;
  }

  const id: Nullable<Guid> = decodedJwt[ID_PATH];
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
    id: id,
    userName: userName,
    roles: roles
  };
}

export function isNeededToRefresh(): boolean {
  const jwt = getCookie(JWT_COOKIE_PATH);
  const refresh = getCookie(REFRESH_COOKIE_PATH);

  return jwt === undefined && refresh !== undefined;
}

export function getDecodedJwt(): Nullable<AnyObject> {
  const jwt = getCookie(JWT_COOKIE_PATH);
  return jwt !== undefined ? jwtDecode<Nullable<AnyObject>>(jwt) : undefined;
}

export function removeJwt(): void {
  removeCookie(JWT_COOKIE_PATH);
  removeCookie(REFRESH_COOKIE_PATH);
}