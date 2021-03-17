import { ICategory } from "./../interfaces/category.interface";
import { IActionState } from "./../interfaces/rootState.interface";
import { INotify } from "./../interfaces/notify.interface";

export enum ACTIONS {
  NOTIFY = "NOTIFY",
  CATEGORIES = "CATEGORIES",
}

export const notify = (payload: INotify): IActionState => {
  return { type: "NOTIFY", payload };
};

export const setCategories = (payload: ICategory[]): IActionState => {
  return { type: "CATEGORIES", payload };
};
