import { ICategoryJSON } from "./category.interface";
import { INotify } from "./notify.interface";
export interface IActionState {
  type: string;
  payload?: any;
}

export interface IRootState {
  notify: INotify;
  categories: ICategoryJSON[];
}
