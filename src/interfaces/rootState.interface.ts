import { IProductJSON } from "./product.interface";
import { ICategoryJSON } from "./category.interface";
import { INotify } from "./notify.interface";
export interface IActionState {
  type: string;
  payload?: any;
}

export interface ICartItem {
  product: IProductJSON;
  count: number;
}

export interface IRootState {
  notify: INotify;
  categories: ICategoryJSON[];
  cart: ICartItem[];
}
