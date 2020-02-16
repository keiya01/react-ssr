export type CountAction =
  | ReturnType<typeof addCount>
  | ReturnType<typeof addCountAsync>;

export const ADD_COUNT = "ADD_COUNT";
export const addCount = () => {
  return {
    type: ADD_COUNT
  } as const;
};

export const ADD_COUNT_ASYNC = "ADD_COUNT_ASYNC";
export const addCountAsync = () => {
  return {
    type: ADD_COUNT_ASYNC
  } as const;
};
