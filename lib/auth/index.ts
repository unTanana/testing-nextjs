import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import config from '../util/config';

export const getSession = (request: NextApiRequest) => {
  const authHeader = request.headers?.authorization;
  const token = authHeader?.split(' ')[1];
  if (token) {
    try {
      // returns decoded string
      return jwt.verify(token, config.authSecret);
    } catch (e) {
      return null;
    }
  }
  return null;
};

const saveSession = (token: string) => {};
