import { DataTypes, Model } from "sequelize";
import db from "../../adapters/output/db/db";
import { Profile } from "./profile";


interface ContractAttributes {
  id: number;
  terms: string;
  status: 'new' | 'in_progress' | 'terminated';
}

export class Contract extends Model<ContractAttributes> implements ContractAttributes {
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
