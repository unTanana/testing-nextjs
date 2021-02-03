import jwt from 'jsonwebtoken';
import { parse, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage } from 'http';
import config from '../util/config';

const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const getSession = (request: IncomingMessage) => {
  let cookies;
  if (request.headers.cookie) {
    cookies = parse(request.headers.cookie || '');
  } else {
    const apiReq = request as NextApiRequest;
    cookies = apiReq.cookies;
  }

  console.log('cookies:', cookies);
  const { session } = cookies;
  if (session) {
    try {
      // returns decoded string
      return jwt.verify(session, config.authSecret);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const saveSession = (token: string, res: NextApiResponse) => {
  const cookie = serialize('session', token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', cookie);
};

export function removeSession(res: NextApiResponse) {
  const cookie = serialize('session', '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}
