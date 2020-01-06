import { all } from "redux-saga/effects";
import watchCountAsync from "./countAsync";

export function* sayHello() {
  yield console.log("Hello Saga"); // eslint-disable-line no-console
}

export default function* rootSaga() {
  yield all([sayHello(), watchCountAsync()]);
}
