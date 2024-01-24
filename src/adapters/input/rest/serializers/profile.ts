import { ProfileOutput, ProfileAttributes } from "../../../../core/models/profile";


export const serializeProfileOutput = (profile: ProfileOutput): ProfileAttributes => {
  return {
    id: profile.id,
    firstName: profile.firstName,
    lastName: profile.lastName,
    profession: profile.profession,
    balance: profile.balance,
    type: profile.type,
  };
}
