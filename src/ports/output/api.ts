import { ContractOutput } from "../../core/models/contract";
import { JobOutput } from "../../core/models/job";
import { ProfileOutput } from "../../core/models/profile";


export interface ApiOutputPort {
  findContractsById(id: number, profileId: number): Promise<ContractOutput>;
  findAllContracts(profileId: number): Promise<ContractOutput[]>
  findUnpaidJobs(profileId: number): Promise<JobOutput[]>;
  payJob(jobId: number, profileId: number): Promise<JobOutput>;
  depositBalance(userId: number, deposit: number): Promise<ProfileOutput>;
  // getBestProfession(start: string, end: string): Promise<any>;
  // getBestClients(start: string, end: string): Promise<any[]>;
}
