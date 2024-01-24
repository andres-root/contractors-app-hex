import { ContractInterface } from "../../adapters/input/rest/serializers/contract";
import { JobAttributes } from "../../core/models/job";

export interface ApiInputPort {
  getContractsById(id: number, profileId: number): Promise<ContractInterface>
  getAllContracts(profileId: number): Promise<ContractInterface[]>;
  getUnpaidJobs(profileId: number): Promise<JobAttributes[]>;
  payJob(jobId: number, profileId: number): Promise<JobAttributes>;
  // deposit(id: number, deposit: number): Promise<any>;
  // bestProfession(start: string, end: string): Promise<any>;
  // bestClients(start: string, end: string): Promise<any[]>;
}
