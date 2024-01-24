import { ApiRepository } from "../../../adapters/output/repositories/api";
import { ApiInputPort } from "../../../ports/input/api";
import { ContractInterface, serializeContractOutput } from "../../../adapters/input/rest/serializers/contract"
import { Job, JobAttributes } from "../../../core/models/job";
import { serializeJobOutput } from "../../../adapters/input/rest/serializers/job";


export class ApiApp implements ApiInputPort {
  constructor(
    private apiRepository: ApiRepository,
  ) {
    this.apiRepository = apiRepository;
  }

  async getContractsById(id: number, profileId: number): Promise<ContractInterface> {
    return serializeContractOutput(await this.apiRepository.findContractsById(id, profileId));
  }

  async getAllContracts(profileId: number): Promise<ContractInterface[]> {
    return (await this.apiRepository.findAllContracts(profileId)).map(serializeContractOutput);
  }

  async getUnpaidJobs(profileId: number): Promise<JobAttributes[]> {
    return (await this.apiRepository.findUnpaidJobs(profileId)).map(serializeJobOutput);
  }

  async payJob(JobId: number, profileId: number): Promise<JobAttributes> {
    return serializeJobOutput(await this.apiRepository.payJob(JobId, profileId));
  }

  // async deposit(id: number, deposit: number): Promise<{}> {
  //   return {}
  // }

  // async bestProfession(start: string, end: string): Promise<{}> {
  //   return {}
  // }

  // async bestClients(start: string, end: string):  Promise<{}[]> {
  //   return [{}]
  // }
}
