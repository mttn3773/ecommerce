import { useCookies } from "react-cookie";
import { verify } from "jsonwebtoken";
export const useAuth = (): boolean => {
  const [cookie, _setCookie] = useCookies(["auth"]);
  if (!cookie || !cookie.auth) return false;
  const isValid = verify(cookie.auth, process.env.JWT_SECRET!);
  if (!isValid) return false;
  return true;
};
