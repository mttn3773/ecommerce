import { IProductJSON } from "../interfaces/product.interface";
import { IRootState, IActionState } from "./../interfaces/rootState.interface";
import { ACTIONS } from "./Actions";
export const reducers = (
  state: IRootState,
  action: IActionState
): IRootState => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return { ...state, notify: action.payload };
    case ACTIONS.CATEGORIES:
      return { ...state, categories: action.payload };
    case ACTIONS.ADD_TO_CART:
      if ((action.payload as IProductJSON).inStock === 0) {
        return {
          ...state,
          notify: {
            ...state.notify,
            errors: [{ msg: "Product is out of stock" }],
          },
        };
      }
      const indexOfExistingItem = state.cart.findIndex(
        (cartItem) => cartItem.product._id === action.payload._id
      );
      if (indexOfExistingItem === -1) {
        return {
          ...state,
          cart: [...state.cart, { product: action.payload, count: 1 }],
        };
      }
      if (
        state.cart[indexOfExistingItem].count >=
        (action.payload as IProductJSON).inStock
      ) {
        return {
          ...state,
          notify: {
            ...state.notify,
            errors: [{ msg: "Product is out of stock" }],
          },
        };
      }
      const newCart = [...state.cart];
      newCart[indexOfExistingItem].count += 1;
      return { ...state, cart: newCart };
    case ACTIONS.SET_CART: {
      return { ...state, cart: action.payload };
    }

    case ACTIONS.REMOVE_FROM_CART: {
      const indexOfExistingItem = state.cart.findIndex(
        (cartItem) => cartItem.product._id === action.payload._id
      );
      if (indexOfExistingItem === -1) return state;
      const newCart = [...state.cart];
      newCart[indexOfExistingItem].count -= 1;
      if (newCart[indexOfExistingItem].count <= 0) {
        console.log(newCart);

        return {
          ...state,
          cart: newCart.filter((_, index) => index !== indexOfExistingItem),
        };
      }
      return { ...state, cart: newCart };
    }
    default:
      return state;
  }
};
