import { DataTypes, Model, Optional } from "sequelize";
import db from "../../adapters/output/db/db";
import { Contract } from "./contract";


interface JobAttributes {
  id: number;
  description: string;
  price: number;
  paid?: boolean;
  paymentDate?: Date | null;
  ContractId?: number;
}

export interface JobInput extends Optional<JobAttributes, "id" | "ContractId" | "paid" | "paymentDate"> {}
export interface JobOutput extends Required<JobAttributes> {}
export class Job extends Model<JobAttributes, JobInput> implements JobAttributes {
  public id!: number;
  public description!: string;
  public price!: number;
  public paid!: boolean;
  public paymentDate!: Date | null;
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    paymentDate: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize: db,
    modelName: 'Job'
  }
);

Job.belongsTo(Contract);

export default Job;
