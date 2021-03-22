import { IError } from "./error.interface";

export interface IApiResponse {
  success: boolean;
  msg?: string;
  data?: any;
  errors?: IError[];
}
