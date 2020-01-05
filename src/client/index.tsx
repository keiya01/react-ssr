import React from "react";
import ReactDOM from "react-dom";
import { loadableReady } from "@loadable/component";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setStore } from "./redux/store";
import Router from "./components/Router";

const preloadedState = JSON.parse(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.querySelector("#initial-data")!.getAttribute("data-json")!
);
const { store } = setStore(preloadedState);

const render = async () => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>,
    document.querySelector("#root")
  );
};

loadableReady(render);

if (module.hot) {
  module.hot.accept("./components/Router", () => {
    render();
  });
}
