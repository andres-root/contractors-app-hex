import { ContractInterface } from "../../adapters/input/rest/serializers/contract";
import { JobAttributes } from "../../core/models/job";
import { ProfileAttributes } from "../../core/models/profile";

export interface ApiInputPort {
  getContractsById(id: number, profileId: number): Promise<ContractInterface>
  getAllContracts(profileId: number): Promise<ContractInterface[]>;
  getUnpaidJobs(profileId: number): Promise<JobAttributes[]>;
  payJob(jobId: number, profileId: number): Promise<JobAttributes>;
  depositBalance(id: number, deposit: number, profileId: number): Promise<ProfileAttributes>;
  // bestProfession(start: string, end: string): Promise<any>;
  // bestClients(start: string, end: string): Promise<any[]>;
}
