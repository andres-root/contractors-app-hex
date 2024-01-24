import { ContractInterface } from "../../adapters/input/rest/serializers/contract";
import { JobAttributes } from "../../core/models/job";
import { ProfileAttributes } from "../../core/models/profile";
import { BestProfessionOutput, BestClientsOutput } from "../../core/models/interfaces";

export interface ApiInputPort {
  getContractsById(id: number, profileId: number): Promise<ContractInterface>
  getAllContracts(profileId: number): Promise<ContractInterface[]>;
  getUnpaidJobs(profileId: number): Promise<JobAttributes[]>;
  payJob(jobId: number, profileId: number): Promise<JobAttributes>;
  depositBalance(userId: number, deposit: number): Promise<ProfileAttributes>;
  getBestProfession(start: string, end: string): Promise<BestProfessionOutput>;
  getBestClients(start: string, end: string, limit: number): Promise<BestClientsOutput[]>;
}
