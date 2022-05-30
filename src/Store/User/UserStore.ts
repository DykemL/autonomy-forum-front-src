import { UserExtended } from './../../Api/Contracts/Common';
import { makeAutoObservable } from "mobx";
import { Nullable } from "../../Common/Types";

class UserStore {
  private _isAuthorized: boolean = false;
  private _user?: UserExtended;
  private _isUpdateInProgress: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuthorized(): boolean {
    return this._isAuthorized;
  }

  get user(): Nullable<UserExtended> {
    return this._user;
  }

  set user(user: Nullable<UserExtended>) {
    this._user = user;
    this._isAuthorized = this._user === undefined ? false : true;
  }

  get isUpdateInProgress(): boolean {
    return this._isUpdateInProgress;
  }

  set isUpdateInProgress(isInProgress: boolean) {
    this._isUpdateInProgress = isInProgress;
  }

  clear() {
    this._isAuthorized = false;
    this._user = undefined;
  }
}

const userStore = new UserStore();
export default userStore;