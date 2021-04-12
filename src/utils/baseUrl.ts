import { NextApiRequest } from "next";
export const baseUrl = (req: NextApiRequest) => {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${protocol}://${host}/api`;
};
