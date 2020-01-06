import { CountAction } from "../actions/count";

export interface CountState {
  count: number;
}

export const initialState: CountState = {
  count: 0
};

export default function reducer(
  state: CountState = initialState,
  action: CountAction
) {
  switch (action.type) {
    case "ADD_COUNT": {
      return {
        ...state,
        count: state.count + 1
      };
    }
    default:
      return state;
  }
}
