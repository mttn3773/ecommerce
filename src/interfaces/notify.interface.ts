import { IError } from "./error.interface";
interface ISuccess {
  msg: string;
  param: string;
}
export interface INotify {
  loading: boolean;
  errors: IError[];
  success: ISuccess[];
}
