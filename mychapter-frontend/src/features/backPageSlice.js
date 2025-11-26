import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const backPageSlice = createSlice({
  name: "backPage",
  initialState,
  reducers: {
    from: (state, action) => {
      return action.payload;
    },
  },
});

export const { from } = backPageSlice.actions;
export default backPageSlice.reducer;
