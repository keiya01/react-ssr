export type CountAction = ReturnType<typeof addCount>;

export const ADD_COUNT = "ADD_COUNT";
export const addCount = () => {
  return {
    type: ADD_COUNT
  } as const;
};
