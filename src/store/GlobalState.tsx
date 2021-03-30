import { IRootState, IActionState } from "../interfaces/rootState.interface";
import { createContext, useEffect, useReducer } from "react";
import { reducers } from "./Reducers";
import { INotify } from "../interfaces/notify.interface";
import { ACTIONS } from "./Actions";
const initialState: IRootState = {
  notify: {
    loading: false,
    errors: [],
    success: [],
  },
  cart: [],
  categories: [],
};

export const DataContext = createContext<{
  state: IRootState;
  dispatch: React.Dispatch<IActionState>;
}>({ state: initialState, dispatch: () => {} });

export const DataPovider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart } = state;

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("CART") || "");
    dispatch({ type: ACTIONS.SET_CART, payload: cart });
  }, []);
  useEffect(() => {
    localStorage.setItem("CART", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch("/api/categories", {
      method: "GET",
    }).then(
      async (response) => {
        const res = await response.json();
        dispatch({ type: "CATEGORIES", payload: res.categories });
      },
      async () => {
        dispatch({
          type: "NOTIFY",
          payload: {
            ...state.notify,
            errors: [{ msg: "Something went wrong" }],
          } as INotify,
        });
      }
    );
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
