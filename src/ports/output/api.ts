import { ContractOutput } from "../../core/models/contract";
import { JobOutput } from "../../core/models/job";
import { ProfileOutput } from "../../core/models/profile";
import { BestProfessionOutput, BestClientsOutput } from "../../core/models/interfaces";

export interface ApiOutputPort {
  findContractsById(id: number, profileId: number): Promise<ContractOutput>;
  findAllContracts(profileId: number): Promise<ContractOutput[]>
  findUnpaidJobs(profileId: number): Promise<JobOutput[]>;
  payJob(jobId: number, profileId: number): Promise<JobOutput>;
  depositBalance(userId: number, deposit: number): Promise<ProfileOutput>;
  findBestProfession(startDate: string, endDate: string): Promise<BestProfessionOutput>;
  findBestClients(startDate: string, endDate: string, limit: number): Promise<BestClientsOutput[]>;
}
