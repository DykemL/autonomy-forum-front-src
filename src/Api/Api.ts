import AuthApi from "./AuthApi";
import RepliesApi from "./RepliesApi";
import SectionsApi from "./SectionsApi";
import TopicsApi from "./TopicsApi";
import UsersApi from "./UsersApi";

export type SetLoadingAction = (value: boolean) => void

class Api {
  static auth: AuthApi = new AuthApi();
  static sections: SectionsApi = new SectionsApi();
  static topics: TopicsApi = new TopicsApi();
  static replies: RepliesApi = new RepliesApi();
  static users: UsersApi = new UsersApi();
}

export default Api;