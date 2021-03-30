import { ICategory } from "./../interfaces/category.interface";
import { IActionState, ICartItem } from "./../interfaces/rootState.interface";
import { INotify } from "./../interfaces/notify.interface";
import { IProductJSON } from "../interfaces/product.interface";

export enum ACTIONS {
  NOTIFY = "NOTIFY",
  CATEGORIES = "CATEGORIES",
  ADD_TO_CART = "ADD_TO_CART",
  SET_CART = "SET_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
}

export const notify = (payload: INotify): IActionState => {
  return { type: "NOTIFY", payload };
};

export const setCategories = (payload: ICategory[]): IActionState => {
  return { type: "CATEGORIES", payload };
};
export const addToCart = (payload: IProductJSON): IActionState => {
  return { type: "ADD_TO_CART", payload };
};
export const removeFromCart = (payload: IProductJSON): IActionState => {
  return { type: "REMOVE_FROM_CART", payload };
};
export const setCar = (payload: ICartItem[]): IActionState => {
  return { type: "SET_CART", payload };
};
