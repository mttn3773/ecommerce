import { IError } from "./../interfaces/error.interface";

export interface ErrorResponse {
  success: boolean;
  errors: IError[];
}

export const createError = ({ msg, param }: IError): ErrorResponse => {
  return { success: false, errors: [{ msg, param }] };
};
