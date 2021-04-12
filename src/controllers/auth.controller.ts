import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { createError } from "../utils/createError";
import { onSuccessResponse } from "../utils/onSuccessResponse";
import { sign } from "jsonwebtoken";

export const signIn = (req: NextApiRequest, _res: NextApiResponse) => {
  try {
    const { password } = req.body;
    if (!(password === process.env.ADMIN_PASSWORD)) {
      return createError({ msg: "Wrong password", param: "password" });
    }
    const token = sign({ isLogged: true }, process.env.JWT_SECRET!);
    return onSuccessResponse({
      msg: "Authenticated succesefully",
      data: { token },
    });
  } catch (error) {
    return createError({ msg: "Something went wrong" });
  }
};
