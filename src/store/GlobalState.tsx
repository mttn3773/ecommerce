import { IRootState, IActionState } from "../interfaces/rootState.interface";
import { createContext, useEffect, useReducer } from "react";
import { reducers } from "./Reducers";
import { INotify } from "../interfaces/notify.interface";

const initialState: IRootState = {
  notify: {
    loading: false,
    errors: [],
    success: [],
  },
  categories: [],
};

export const DataContext = createContext<{
  state: IRootState;
  dispatch: React.Dispatch<IActionState>;
}>({ state: initialState, dispatch: () => {} });

export const DataPovider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
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
