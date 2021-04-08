import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";
import { IncomingMessage } from "node:http";
import { verify } from "jsonwebtoken";
export const checkAuthorized = (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  }
): boolean => {
  const auth = req.cookies["auth"];
  if (!auth) return false;
  const isValid = verify(auth, process.env.JWT_SECRET!);
  if (!isValid) return false;
  return true;
};
