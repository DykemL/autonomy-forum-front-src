import { action, makeAutoObservable } from "mobx";
import { Nullable } from "../../Common/Types";

class UserStore {
  private _isAuthorized: boolean = false;
  private _userName?: string;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuthorized(): boolean {
    return this._isAuthorized;
  }

  get userName(): Nullable<string> {
    return this._userName;
  }

  set userName(userName: Nullable<string>) {
    this._userName = userName;
    this._isAuthorized = this._userName === undefined ? false : true;
  }

  clear() {
    this._isAuthorized = false;
    this._userName = undefined;
  }
}

const userStore = new UserStore();
export default userStore;