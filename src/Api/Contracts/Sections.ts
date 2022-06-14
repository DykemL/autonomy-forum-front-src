import { JsonObject, JsonProperty } from "json2typescript";
import { Guid } from "../../Common/Types";
import { UserInfo } from "./Common";
import { Topic } from "./Topics";

export enum SectionType {
  Main = 0,
  TopicGroup = 1
}

@JsonObject("SectionInfo")
export class Section {
  @JsonProperty("Id")
  id?: Guid;

  @JsonProperty("Type")
  type?: SectionType;

  @JsonProperty("Title")
  title?: string;

  @JsonProperty("Description")
  description?: string;

  @JsonProperty("Topics")
  topics?: Topic[] 

  prefect?: UserInfo;
}

export interface CreateSectionRequest {
  title: string,
  description: string
}