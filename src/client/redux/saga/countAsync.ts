import { put, call, takeEvery } from "redux-saga/effects";
import { ADD_COUNT } from "../actions/count";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function* countAsync() {
  yield call(delay, 1000);
  yield put({ type: ADD_COUNT });
}

export const ADD_COUNT_ASYNC = "ADD_COUNT_ASYNC";
export default function* watchCountAsync() {
  yield takeEvery(ADD_COUNT_ASYNC, countAsync);
}
