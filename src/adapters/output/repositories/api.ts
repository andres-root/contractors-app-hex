import { Op } from 'sequelize';

import { ApiOutputPort } from '../../../ports/output/api';
import { Contract, Job, Profile } from "../../../core/models";
import { ContractOutput } from '../../../core/models/contract';


export class ApiRepository implements ApiOutputPort {

  async findContractsById(id: number, profileId: number): Promise<ContractOutput> {
    try {
      const contract = await Contract.findOne({where: {ClientId: profileId}})
      if (!contract) {
        throw new Error("contract not found");
      }
      return contract;
    } catch (error) {
      console.error('error fetching contract:', error);
      throw error;
    }
  }

  async findAllContracts(profileId: number): Promise<ContractOutput[]> {
    try {
      const contracts = await Contract.findAll({
        where: {
          [Op.or]: [
            { ContractorId: profileId },
            { ClientId: profileId }
          ]
        }
      });
      if (!contracts) {
        throw new Error("contracts not found");
      }
      return contracts;
    } catch (error) {
      console.error('error fetching all contracts:', error);
      throw error;
    }
  }

  // async findUnpaidJobs(id: number): Promise<any[]> {
  //     return Promise.resolve([]);
  // }

  // async updateJobPayment(id: number): Promise<any> {
  //     return Promise.resolve({});
  // }

  // async updateBalance(id: number, deposit: number): Promise<any> {
  //     return Promise.resolve({});
  // }

  // async getBestProfession(start: string, end: string): Promise<any> {
  //     return Promise.resolve({});
  // }

  // async getBestClients(start: string, end: string): Promise<any[]> {
  //     return Promise.resolve([]);
  // }
}
