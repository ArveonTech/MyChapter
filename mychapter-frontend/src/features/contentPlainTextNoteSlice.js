import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const contentPlainTextNoteSlice = createSlice({
  name: "titleHTML",
  initialState,
  reducers: {
    contentPlain: (state, action) => {
      return action.payload;
    },
  },
});

export const { contentPlain } = contentPlainTextNoteSlice.actions;
export default contentPlainTextNoteSlice.reducer;
