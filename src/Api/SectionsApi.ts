import { Guid } from '../Common/Types';
import ApiClient, { RequestResult } from './ApiClient';
import { CreateSectionRequest, Section } from './Contracts/Sections';

export default class SectionsApi {
  async createSection(title: string, description: string): Promise<RequestResult> {
    const request: CreateSectionRequest = {
      title: title,
      description: description
    }
    return await ApiClient.put('Sections', request);
  }

  async getSections(): Promise<RequestResult<Section[]>> {
    return await ApiClient.get('Sections');
  }

  async getSectionById(sectionId: Guid): Promise<RequestResult<Section>> {
    return await ApiClient.get('Sections', sectionId);
  }

  async deleteSection(sectionId: Guid): Promise<RequestResult> {
    return await ApiClient.delete('Sections', sectionId);
  }
}