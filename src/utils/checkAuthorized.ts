import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";
import { IncomingMessage } from "node:http";
import { verify } from "jsonwebtoken";
export const checkAuthorized = (cookie: { [name: string]: any }): boolean => {
  const auth = cookie["auth"];
  if (!auth) return false;
  const isValid = verify(auth, process.env.JWT_SECRET!);
  if (!isValid) return false;
  return true;
};

export const serverCheckAuthorized = (token: string): boolean => {
  const isValid = verify(token, process.env.JWT_SECRET!);
  if (!isValid) return false;
  return true;
};
