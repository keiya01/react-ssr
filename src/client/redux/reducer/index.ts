import { combineReducers } from "redux";
import counter, {
  CountState,
  initialState as counterInitialState
} from "./counter";

export interface State {
  counter: CountState;
}

export const initialState: State = {
  counter: counterInitialState
};

export const rootReducer = combineReducers({
  counter
});
