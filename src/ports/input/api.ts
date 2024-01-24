import { ContractInterface } from "../../adapters/input/rest/serializers/contract";

export interface ApiInputPort {
  getContractsById(id: number, profileId: number): Promise<ContractInterface>
  // getAllContracts(): Promise<any[]>;
  // getUnpaidJobs(id: number): Promise<any[]>;
  // payJob(id: number): Promise<any>;
  // deposit(id: number, deposit: number): Promise<any>;
  // bestProfession(start: string, end: string): Promise<any>;
  // bestClients(start: string, end: string): Promise<any[]>;
}
