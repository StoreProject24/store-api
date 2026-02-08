import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_REFRESH_SECRET }: any = process.env;

export const createAccessToken = (data: any): string => {
  return jwt.sign({ user: data }, JWT_SECRET, {
    expiresIn: "2h",
  });
};

export const createRefreshToken = (data: any): string => {
  return jwt.sign({ user: data }, JWT_REFRESH_SECRET, {
    expiresIn: "1d",
  });
};

export const decodeAccessToken = (token: string) =>
  jwt.verify(token, JWT_SECRET);

export const decodeRefreshToken = (token: string) =>
  jwt.verify(token, JWT_REFRESH_SECRET);
