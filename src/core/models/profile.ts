import { DataTypes, Model, Optional } from "sequelize";
import db from "../../adapters/output/db/db";


export interface ProfileAttributes {
  id: number;
  firstName: string;
  lastName: string;
  profession: string;
  balance: number;
  type: 'client' | 'contractor';
}

export interface ProfileInput extends Optional<ProfileAttributes, "id"> {}
export interface ProfileOutput extends Required<ProfileAttributes> {}
export class Profile extends Model<ProfileAttributes, ProfileInput> implements ProfileAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public profession!: string;
  public balance!: number;
  public type!: 'client' | 'contractor';
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.DECIMAL(12, 2)
    },
    type: {
      type: DataTypes.ENUM('client', 'contractor')
    }
  },
  {
    sequelize: db,
    modelName: 'Profile'
  }
);

export default Profile;
