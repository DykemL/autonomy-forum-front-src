import { AnyObject } from "./Types";

export default class UrlHelper {
  static buildUrl(path: string, pathParams: AnyObject): string {
    const pathParamsString = new URLSearchParams(pathParams).toString();
    return `${path}?${pathParamsString}`;
  }
}