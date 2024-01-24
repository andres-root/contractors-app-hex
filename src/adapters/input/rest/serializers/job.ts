import { JobOutput, JobAttributes } from "../../../../core/models/job";


export const serializeJobOutput = (job: JobOutput): JobAttributes => {
  return {
    id: job.id,
    description: job.description,
    price: job.price,
    paid: job.paid,
    paymentDate: job.paymentDate,
    ContractId: job.ContractId,
  };
};
