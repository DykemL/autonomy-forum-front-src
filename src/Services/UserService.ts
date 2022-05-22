import { getUser as getUserFromJwt, removeJwt } from "../Common/Helpers/JwtHelper";
import userStore from "../Store/User/UserStore";

class UserService {
  updateAuthorizationState() {
    const user = getUserFromJwt();
    userStore.userName = user?.userName;
  }

  logout(): void {
    removeJwt();
    userStore.clear();
  }

  isAuthorized(): boolean {
    return userStore.isAuthorized;
  }
}

const userService = new UserService();
export default userService;