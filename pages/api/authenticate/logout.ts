import {Message} from '../../..';
import {NextApiRequest, NextApiResponse} from 'next';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  // set headers
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader('Set-Cookie', [`portal-token=; Path='/'; HttpOnly`, `portal-user=; Path='/'; HttpOnly`, `portal-user-id=; Path='/';HttpOnly`]);
  res.status(200);

  res.send({
    status: true,
    message: "You have been logged out.",
  } as Message);
};
