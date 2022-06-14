import { JsonObject, JsonProperty } from "json2typescript";
import { Guid } from "../../Common/Types";
import { UserInfo } from "./Common";
import { Section } from "./Sections";
import { Topic } from "./Topics";

@JsonObject("ReplyInfo")
export class Reply {
  @JsonProperty("Id")
  id?: Guid;  

  @JsonProperty("Author")
  author?: UserInfo;

  @JsonProperty("Topic")
  topic?: Topic;

  @JsonProperty("Message")
  message?: string;

  @JsonProperty("FavoredBy")
  favoredBy?: Guid[];

  @JsonProperty("FavoredBy")
  favoredUsersBy?: UserInfo[];

  @JsonProperty("CreationDateTime")
  creationDateTime?: Date;
}

export interface CreateReplyRequest {
  message: string,
  topicId: Guid
}

export interface DeleteReplyRequest {
  id: Guid
}