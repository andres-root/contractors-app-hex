import { ContractOutput } from "../../../../core/models/contract";

export interface ContractInterface {
  id: number;
  terms: string;
  ClientId?: number;
  ContractorId?: number;
  status: 'new' | 'in_progress' | 'terminated';
}

export function serializeContractOutput(contract: ContractOutput): ContractInterface {
  return {
    id: contract.id,
    terms: contract.terms,
    ClientId: contract.ClientId,
    ContractorId: contract.ContractorId,
    status: contract.status,
  };
}
