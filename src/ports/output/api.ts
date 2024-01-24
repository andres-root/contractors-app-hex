import { ContractInput, ContractOutput } from "../../core/models/contract";


export interface ApiOutputPort {
  findContractsById(id: number, profileId: number): Promise<ContractOutput>;
  findAllContracts(profileId: number): Promise<ContractOutput[]>
  // findUnpaidJobs(id: number): Promise<any[]>;
  // updateJobPayment(id: number): Promise<any>;
  // updateBalance(id: number, deposit: number): Promise<any>;
  // getBestProfession(start: string, end: string): Promise<any>;
  // getBestClients(start: string, end: string): Promise<any[]>;
}
