import { ApiRepository } from "../../../adapters/output/repositories/api";
import { ApiInputPort } from "../../../ports/input/api";
import { ContractInterface, serializeContractOutput } from "../../../adapters/input/rest/serializers/contract"


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

  // async getUnpaidJobs(id: number): Promise<{}[]> {
  //   return [{}]
  // }

  // async payJob(id: number): Promise<{}> {
  //   return {}
  // }

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
