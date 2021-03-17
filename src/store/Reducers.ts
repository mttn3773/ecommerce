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
    default:
      return state;
  }
};
