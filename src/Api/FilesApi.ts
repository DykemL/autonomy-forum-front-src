import ApiClient, { RequestResult } from './ApiClient';
import { File } from './Contracts/Files';

export default class FilesApi {
  async upload(content: FormData): Promise<RequestResult<File>> {
    return await ApiClient.postFormData('files/upload', content);
  }
}