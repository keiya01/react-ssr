import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducer";
import rootSaga from "./saga";

export const setStore = (preloadedState: Record<string, any> = {}) => {
  const saga = createSagaMiddleware();
  const middleware = applyMiddleware(saga);
  const enhancer = composeWithDevTools(middleware);
  const store = createStore(rootReducer, preloadedState, enhancer);
  const runSaga = async () => {
    return saga
      .run(rootSaga)
      .toPromise<SagaMiddleware<typeof runSaga>["run"]>();
  };

  if (process.env.IS_BROWSER) {
    runSaga();
  }

  if (module.hot) {
    module.hot.accept("./reducer", async () => {
      store.replaceReducer(require("./reducer").rootReducer);
    });
  }

  return { store, runSaga };
};
