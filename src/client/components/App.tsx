import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../redux/reducer";
import { addCount, addCountAsync } from "../redux/actions/count";

const App = () => {
  const count = useSelector((state: State) => state.counter.count);
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(addCount());
  };

  const handleOnClickAsync = () => {
    dispatch(addCountAsync());
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
