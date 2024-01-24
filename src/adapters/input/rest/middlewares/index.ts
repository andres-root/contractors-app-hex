import { Request, Response, NextFunction } from 'express';
import { Profile } from '../../../../core/models';


export interface RequestWithProfile extends Request {
  profile?: Profile;
}

export const getProfile = async (req: RequestWithProfile, res: Response, next: NextFunction) => {

  const profileId = req.get('profile_id') || 0;

  if (!profileId) {
    return res.status(400).send('Profile ID is required');
  }

  const profile = await Profile.findOne({ where: { id: Number(profileId) } });
  if (!profile) {
    return res.status(404).end();
  }

  req.profile = profile;
  next();
};

