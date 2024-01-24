import { ApiOutputPort } from '../../../ports/output/api';


export class ApiRepository implements ApiOutputPort {

  async findContractsById(id: number): Promise<any[]> {
      return Promise.resolve([]);
  }

  async findAllContracts(): Promise<any[]> {
      return Promise.resolve([]);
  }

  async findUnpaidJobs(id: number): Promise<any[]> {
      return Promise.resolve([]);
  }

  async updateJobPayment(id: number): Promise<any> {
      return Promise.resolve({});
  }

  async updateBalance(id: number, deposit: number): Promise<any> {
      return Promise.resolve({});
  }

  async getBestProfession(start: string, end: string): Promise<any> {
      return Promise.resolve({});
  }

  async getBestClients(start: string, end: string): Promise<any[]> {
      return Promise.resolve([]);
  }
}
