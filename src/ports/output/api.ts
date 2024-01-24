import { ContractOutput } from "../../core/models/contract";
import { JobOutput, Job } from "../../core/models/job";


export interface ApiOutputPort {
  findContractsById(id: number, profileId: number): Promise<ContractOutput>;
  findAllContracts(profileId: number): Promise<ContractOutput[]>
  findUnpaidJobs(profileId: number): Promise<JobOutput[]>;
  payJob(jobId: number, profileId: number): Promise<JobOutput>;
  // updateJobPayment(id: number): Promise<any>;
  // updateBalance(id: number, deposit: number): Promise<any>;
  // getBestProfession(start: string, end: string): Promise<any>;
  // getBestClients(start: string, end: string): Promise<any[]>;
}
