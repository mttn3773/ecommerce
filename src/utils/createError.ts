import { IError } from "./../interfaces/error.interface";

export const createError = ({ msg, param }: IError) => {
  return { errors: [{ msg, param }] };
};
