import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { FiltersState } from "./types";

const initialState: FiltersState = {
  indexPage: {
    activeFilter: "",
  },
};

const { actions, reducer } = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setActiveFilter: (
      state,
      { payload: { value, filterName } }: PayloadAction<{ value: string; filterName: keyof FiltersState }>
    ): FiltersState => ({
      ...state,
      [filterName]: {
        ...state[filterName],
        activeFilter: value,
      },
    }),
  },
});

export const { setActiveFilter } = actions;

export default reducer;