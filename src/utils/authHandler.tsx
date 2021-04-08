import { NextApiRequest } from "next";
import { verify } from "jsonwebtoken";
export const authHandler = (req: NextApiRequest): boolean => {
  const auth = req.cookies["auth"];
  if (!auth) return false;
  const isValid = verify(auth, process.env.JWT_SECRET!);
  if (!isValid) return false;
  return true;
};
