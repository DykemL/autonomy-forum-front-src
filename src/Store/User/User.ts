import { Nullable } from "../../Common/Types";
import { Role } from "./UserRoles";

export interface User {
  userName: Nullable<string>;
  roles: Role[];
}