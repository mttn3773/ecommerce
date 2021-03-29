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
      console.log("PAYLOAD :", action.payload);
      console.log("CART :", state.cart);

      const indexOfExistingItem = state.cart.findIndex(
        (cartItem) => cartItem.product._id === action.payload._id
      );
      if (indexOfExistingItem === -1) {
        return {
          ...state,
          cart: [...state.cart, { product: action.payload, count: 1 }],
        };
      }
      const newCart = [...state.cart];
      newCart[indexOfExistingItem].count += 1;
      return { ...state, cart: newCart };
    case ACTIONS.SET_CART: {
      return { ...state, cart: action.payload };
    }
    default:
      return state;
  }
};
