import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../redux/reducer";
import { ADD_COUNT } from "../redux/actions/count";
import { ADD_COUNT_ASYNC } from "../redux/saga/countAsync";

const App = () => {
  const count = useSelector((state: State) => state.counter.count);
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch({ type: ADD_COUNT });
  };

  const handleOnClickAsync = () => {
    dispatch({ type: ADD_COUNT_ASYNC });
  };

  return (
    <div>
      <h1>Click below buttons</h1>
      <p>{count}</p>
      <button type="button" onClick={handleOnClick}>
        Sync
      </button>
      <button type="button" onClick={handleOnClickAsync}>
        Async
      </button>
    </div>
  );
};

export default App;
