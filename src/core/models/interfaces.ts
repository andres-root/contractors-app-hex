export interface BestProfessionOutput {
  "total_earnings": number;
  "Contract.Contractor.id": number;
  "Contract.Contractor.profession": string;
}

export interface BestClientsOutput {
  "id": number;
  "paid": number;
  "Contract.Client.id": number;
  "Contract.Client.fullName": string;
}
