import jwt from 'jsonwebtoken';
import { TokenPayload, AuthenticatedUser } from '@shared/types/auth.types';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error('JWT_SECRET and JWT_REFRESH_SECRET must be defined');
}

export const createAccessToken = (user: AuthenticatedUser): string => {
  return jwt.sign({ user }, JWT_SECRET, {
    expiresIn: '2h',
  });
};

export const createRefreshToken = (user: AuthenticatedUser): string => {
  return jwt.sign({ user }, JWT_REFRESH_SECRET, {
    expiresIn: '1d',
  });
};

export const decodeAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

export const decodeRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
};
