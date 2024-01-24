import { JobRepository } from "../../../adapters/output/repositories/job";
import { GetAllJobsFilter } from "../../../adapters/output/repositories/types";
import { JobInput, JobOutput, JobAttributes } from "../../../core/models/job";
import { serializeJobOutput, JobInterface } from "../../../adapters/input/rest/serializers/job";
import { JobInputPort } from "../../../ports/input/job";


export class ApiApp implements ApiInputPort {
  constructor(
    private profileRepository: ProfileRepository,
    private contractRepository: contractRepository,
    private jobRepository: JobRepository
  ) {
    this.profileRepository = profileRepository;
    this.contractRepository = contractRepository;
    this.jobRepository = jobRepository;
  }
  async getAllJobs(): Promise<JobInterface[]> {
    return (await this.jobRepository.getAllJobs()).map(serializeJobOutput);
  }

  async createJob(payload: JobAttributes): Promise<JobInterface> {
    return serializeJobOutput(await this.jobRepository.createJob(payload));
  }

  async updateJob(id: number, payload: Partial<JobInput>): Promise<JobInterface> {
    return serializeJobOutput(await this.jobRepository.updateJob(id, payload));
  }

  async getJobById(id: number): Promise<JobInterface> {
    return serializeJobOutput(await this.jobRepository.getJobById(id));
  }

  async deleteJobById(id: number): Promise<boolean> {
    return await this.jobRepository.deleteJobById(id);
  }
}
