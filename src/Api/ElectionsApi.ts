import { Guid } from "../Common/Types";
import ApiClient, { RequestResult } from "./ApiClient";
import { Election, ElectionsConditions } from "./Contracts/Elections";

export default class ElectionsApi {
  async getElectionsConditions(): Promise<RequestResult<ElectionsConditions>> {
    return await ApiClient.get(`elections/conditions`);
  }

  async register(sectionId: Guid): Promise<RequestResult> {
    return await ApiClient.post(`elections/${sectionId}/register`);
  }

  async revokeRegister(sectionId: Guid): Promise<RequestResult> {
    return await ApiClient.post(`elections/${sectionId}/revoke-register`);
  }

  async getInfo(sectionId: Guid): Promise<RequestResult<Election>> {
    return await ApiClient.get(`elections/${sectionId}`);
  }

  async getInfos(): Promise<RequestResult<Election[]>> {
    return await ApiClient.get('elections');
  }

  async vote(sectionId: Guid, candidateId: Guid): Promise<RequestResult> {
    return await ApiClient.post(`elections/${sectionId}/vote/${candidateId}`);
  }
}