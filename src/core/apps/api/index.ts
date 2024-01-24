import { ApiRepository } from "../../../adapters/output/repositories/api";
import { ApiInputPort } from "../../../ports/input/api";
import { ContractInterface, serializeContractOutput } from "../../../adapters/input/rest/serializers/contract"
import { JobAttributes } from "../../../core/models/job";
import { serializeJobOutput } from "../../../adapters/input/rest/serializers/job";
import { ProfileAttributes } from "../../models/profile";
import { serializeProfileOutput } from "../../../adapters/input/rest/serializers/profile";
import { BestProfessionOutput, BestClientsOutput } from "../../models/interfaces";
import { serializeBestClientsOutput, BestclientsAttributes} from "../../../adapters/input/rest/serializers/clients";


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

  async depositBalance(userId: number, deposit: number): Promise<ProfileAttributes> {
    return serializeProfileOutput(await this.apiRepository.depositBalance(userId, deposit));
  }

  async getBestProfession(startDate: string, endDate: string): Promise<BestProfessionOutput> {
    return await this.apiRepository.findBestProfession(startDate, endDate);
  }

  async getBestClients(startDate: string, endDate: string, limit: number):  Promise<BestclientsAttributes[]> {
    return (await this.apiRepository.findBestClients(startDate, endDate, limit)).map(serializeBestClientsOutput);
  }
}
