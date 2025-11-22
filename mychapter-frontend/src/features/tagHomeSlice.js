import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const tagHomeSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    tagHome: (state, action) => {
      return action.payload;
    },
  },
});

export const { tagHome } = tagHomeSlice.actions;
export default tagHomeSlice.reducer;
