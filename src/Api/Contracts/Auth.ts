import { JsonObject, JsonProperty } from "json2typescript";

export class RegisterRequest {
  userName?: string;
  email?: string;
  password?: string;
}

@JsonObject('RegisterResult')
export class RegisterResponse {
  @JsonProperty('Message')
  message: string = '';
}

export class LoginRequest {
  userName?: string;
  password?: string; 
}