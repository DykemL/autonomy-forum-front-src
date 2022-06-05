import { JsonObject, JsonProperty } from "json2typescript";
import { Guid, Nullable } from "../../Common/Types";

@JsonObject("File")
export class File {
  @JsonProperty("Id")
  id: Nullable<Guid>;

  @JsonProperty("Name")
  name: Nullable<Guid>;

  @JsonProperty("Path")
  path: Nullable<Guid>;
}