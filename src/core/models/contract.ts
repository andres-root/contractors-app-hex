import { DataTypes, Model, Optional } from "sequelize";
import db from "../../adapters/output/db/db";
import { Profile } from "./profile";


interface ContractAttributes {
  id: number;
  terms: string;
  ClientId?: number;
  ContractorId?: number;
  status: 'new' | 'in_progress' | 'terminated';
}

export interface ContractInput extends Optional<ContractAttributes, "id" | "ClientId" | "ContractorId"> {}
export interface ContractOutput extends Optional<ContractAttributes, "ClientId" | "ContractorId"> {}

export class Contract extends Model<ContractAttributes, ContractInput> implements ContractAttributes {
  public id!: number;
  public terms!: string;
  public status!: 'new' | 'in_progress' | 'terminated';
}

Contract.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    terms: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('new', 'in_progress', 'terminated')
    }
  },
  {
    sequelize: db,
    modelName: 'Contract'
  }
);

Contract.belongsTo(Profile, { as: 'Contractor' });
Contract.belongsTo(Profile, { as: 'Client' });

export default Contract;
