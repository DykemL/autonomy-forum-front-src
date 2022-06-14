import { UserInfo } from "./Common";

export class PrivateMessage {
  sender?: UserInfo;

  receiver?: UserInfo;

  message?: string;

  creationDateTime?: string;
}