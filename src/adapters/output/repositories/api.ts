import { Op } from 'sequelize';

import { ApiOutputPort } from '../../../ports/output/api';
import { Contract, Job, Profile } from "../../../core/models";
import { ContractOutput } from '../../../core/models/contract';
import { JobOutput } from '../../../core/models/job';
import { ProfileOutput } from '../../../core/models/profile';

import db from "../db/db";



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

  async findUnpaidJobs(profileId: number): Promise<JobOutput[]> {
    try {
      const jobs = await Job.findAll({
          where: {
            paid: false
          },
          include: [{
            model: Contract,
            where: {
              [Op.or]: [
                { ContractorId: profileId },
                { ClientId: profileId }
              ]
            }
          }]
        });

        if (!jobs) {
          throw new Error("jobs not found");
        }

        return jobs;
    } catch (error) {
      console.error('error fetching unpaid jobs:', error);
      throw error;
    }
  }

  async payJob(jobId: number, profileId: number): Promise<JobOutput> {
    try {
      const result = await db.transaction(async (t) => {
        const profile = await Profile.findOne({ where: { id: profileId } });

        if (!profile) {
            throw new Error('Profile not found');
        }

        if (profile.balance === undefined || profile.balance === null || profile.balance <= 0 ) {
            throw new Error('Profile balance not enough');
        }

        const job = await Job.findOne({where: {id: jobId}});
        if (!job) {
            throw new Error('Job not found');
        }
        const contract = await Contract.findOne({ where: { id: Number(job.ContractId) } });

        if (!contract) {
            throw new Error('Contract not found');
        }
        const contractor = await Profile.findOne({ where: { id: Number(contract.ContractorId) } });

        if (!contractor) {
            throw new Error('Contractor not found');
        }

        // TODO: Add numerical validations
        const newClientBalance = profile.balance - Number(job.price);
        const newContractorBalance = contractor.balance + Number(job.price);
        await profile.update({ balance: newClientBalance }, { transaction: t });
        await contractor.update({ balance: newContractorBalance }, { transaction: t });
        await job.update({ paid: true, paymentDate: new Date() }, { transaction: t });
        return job;
    });

    console.log('Transaction has been committed', result);
    return result;
    } catch (error) {
      console.error('Transaction was rolled back due to an error', error);
      throw error;
    }
  }


  async depositBalance(userId: number, deposit: number): Promise<ProfileOutput> {
    try {

      const result = await db.transaction(async (t) => {
        const profile = await Profile.findOne({ where: { id: userId } });

        if (!profile) {
          throw new Error('Profile not found');
        }

        if(deposit > (profile.balance * 0.25)) {
          throw new Error('Deposit too high');
        }

        if (!profile) {
            throw new Error('Profile not found');
        }

        await profile.update({ balance: profile.balance + deposit }, { transaction: t });
        return profile;
      });

      console.log('Transaction has been committed', result);
      return result;
    } catch (error) {
      console.error('Transaction was rolled back due to an error', error);
      throw error;
    }
  }

  // async getBestProfession(start: string, end: string): Promise<any> {
  //     return Promise.resolve({});
  // }

  // async getBestClients(start: string, end: string): Promise<any[]> {
  //     return Promise.resolve([]);
  // }
}
