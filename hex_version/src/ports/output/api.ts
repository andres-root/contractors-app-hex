export interface ApiOutputPort {
  findContractsById(id: number): Promise<any[]>;
  findAllContracts(): Promise<any[]>;
  findUnpaidJobs(id: number): Promise<any[]>;
  updateJobPayment(id: number): Promise<any>;
  updateBalance(id: number, deposit: number): Promise<any>;
  getBestProfession(start: string, end: string): Promise<any>;
  getBestClients(start: string, end: string): Promise<any[]>;
}
