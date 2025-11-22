import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const gridSlice = createSlice({
  name: "layoutRow",
  initialState,
  reducers: {
    layoutRow: (state, action) => {
      return action.payload;
    },
  },
});

export const { layoutRow } = gridSlice.actions;
export default gridSlice.reducer;
