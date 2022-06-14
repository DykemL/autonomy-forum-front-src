import { Role } from '../../Store/User/Roles';
import { JsonObject, JsonProperty } from 'json2typescript';
import { Guid } from '../../Common/Types';
import { Permission } from '../../Store/User/Permission';

@JsonObject("UserInfo")
export class UserInfo {
  @JsonProperty("Id")
  id?: Guid;

  @JsonProperty("UserName")
  userName?: string;

  @JsonProperty("Email")
  email?: string;

  avatarFilePath?: string;
}

@JsonObject("UserExtended")
export class UserExtended {
  id?: Guid;

  userName?: string;

  email?: string;

  roles?: Role[];

  permissions?: Permission[];

  repliesCount?: number;

  rating?: number;

  avatarFilePath?: string;
}