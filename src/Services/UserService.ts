import { Permission } from './../Store/User/Permission';
import { UserExtended } from './../Api/Contracts/Common';
import { getUser, isNeededToRefresh, removeJwt } from "../Common/Helpers/JwtHelper";
import userStore from "../Store/User/UserStore";
import Api from '../Api/Api';
import snackbarService from './SnackbarService';
import { Guid, Nullable } from '../Common/Types';

class UserService {
  updateAuthorizationState(user?: UserExtended) {
    userStore.user = user;
  }

  async updateAuthorizationStateFromServer(): Promise<void> {
    const isNeededToRefreshValue = isNeededToRefresh();
    if (isNeededToRefreshValue) {
      const result = await Api.auth.refresh();
      if (!result.ensureSuccess()) {
        //snackbarService.push('Произошла ошибка авторизации', 'error')
        this.logout();
        return;
      }
      this.updateAuthorizationState(result.body);
      return;
    }

    const user = getUser();
    if (user === undefined) {
      return;
    }

    const result = await Api.auth.current();
    if (!result.ensureSuccess()) {
      //snackbarService.push('Произошла ошибка авторизации', 'warning');
      this.logout();
      return;
    }

    this.updateAuthorizationState(result.body);
  }

  checkPermission(permission: Permission): boolean {
    if (userStore.user == undefined || userStore.user.permissions == undefined) {
      return false;
    }
    return userStore.user.permissions.indexOf(permission) != -1;
  }

  logout(): void {
    removeJwt();
    userStore.clear();
  }

  getUserName(): Nullable<string> {
    return userStore.user?.userName;
  }

  getUserId(): Nullable<Guid> {
    return userStore.user?.id;
  }

  isAuthorized(): boolean {
    return userStore.isAuthorized;
  }
}

const userService = new UserService();
export default userService;