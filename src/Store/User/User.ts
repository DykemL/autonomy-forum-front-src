import { Guid } from "../../Common/Types";
import { Role } from "./Roles";

export interface JwtUser {
  id?: Guid;
  userName?: string;
  roles?: Role[];
}