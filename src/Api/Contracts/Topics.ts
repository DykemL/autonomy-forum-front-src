import { Reply } from './Replies';
import { JsonObject, JsonProperty } from "json2typescript";
import { Guid } from '../../Common/Types';
import { UserInfo } from './Common';

@JsonObject("TopicInfo")
export class Topic {
  @JsonProperty("Id")
  id?: Guid;

  @JsonProperty("Author")
  author?: UserInfo;

  @JsonProperty("Title")
  title?: string;

  @JsonProperty("TitleMessage")
  titleMessage?: string;

  @JsonProperty("Replies")
  replies?: Reply[];

  @JsonProperty("CreationDateTime")
  creationDateTime?: string;
}

export interface CreateTopicRequest {
  title: string,
  titleMessage: string,
  sectionId: Guid
}