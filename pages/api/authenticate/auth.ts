import client from '../../../lib/redis';
import {NextApiResponse, NextApiRequest} from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies['portal-token'];
  const user = req.cookies['portal-user'];
  const userID = req.cookies['portal-user-id'];
  const access = await client.checkToken(token, {user, userID});

  const data = {
    user, // user that will be rendered on the front-end
    userID,
    access, // is user authenticated / valid?
  };

  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.status(200);
  res.send(data);
};
