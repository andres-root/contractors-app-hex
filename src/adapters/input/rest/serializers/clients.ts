import { BestClientsOutput} from "../../../../core/models/interfaces";

export interface BestclientsAttributes {
  id: number;
  paid: number;
  fullName: string;
}

export const serializeBestClientsOutput = (client: BestClientsOutput): BestclientsAttributes => {
  return {
    id: client.id,
    paid: client.paid,
    fullName: client["Contract.Client.fullName"],
  };
};
