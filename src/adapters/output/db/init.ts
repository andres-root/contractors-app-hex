import { Job, Contract, Profile } from "../../../core/models";

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = async () => {
  try {
    await Profile.sync({ force: isTest, alter: isDev || isTest });
    await Contract.sync({ force: isTest, alter: isDev || isTest });
    await Job.sync({ force: isTest, alter: isDev || isTest });
  } catch (error) {
    console.error('error initializing db:', error);
    throw error;
  }
};
export default dbInit;
