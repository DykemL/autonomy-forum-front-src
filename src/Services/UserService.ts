import { Permission } from './../Store/User/Permission';
import { UserExtended } from './../Api/Contracts/Common';
import userStore from "../Store/User/UserStore";
import Api from '../Api/Api';
import { Guid, Nullable } from '../Common/Types';
import { isLogout, setLogout } from '../Common/Helpers/JwtHelper';

class UserService {
  login(user?: UserExtended) {
    setLogout(false);
    userStore.user = user;
  }

  async updateAuthorizationState(): Promise<void> {
    if (userStore.isUpdateInProgress || isLogout()) {
      return;
    }
    userStore.isUpdateInProgress = true;
    const result = await Api.auth.current();
    if (!result.ensureSuccess()) {
      //snackbarService.push('Произошла ошибка авторизации', 'warning');
      const result = await Api.auth.refresh();
      if (!result.ensureSuccess()) {
        //snackbarService.push('Произошла ошибка авторизации', 'error')
        this.logout();
        userStore.isUpdateInProgress = false;
        return;
      }
      this.login(result.body);
      userStore.isUpdateInProgress = false;
      return;
    }

    this.login(result.body);
    userStore.isUpdateInProgress = false;
  }

  checkPermission(permission: Permission): boolean {
    if (userStore.user == undefined || userStore.user.permissions == undefined) {
      return false;
    }
    return userStore.user.permissions.indexOf(permission) != -1;
  }

  logout(): void {
    setLogout(true);
    userStore.clear();
  }

  prepareLogin(): void {
    setLogout(false);
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