import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const titlePlainTextNoteSlice = createSlice({
  name: "titleHTML",
  initialState,
  reducers: {
    titlePlain: (state, action) => {
      return action.payload;
    },
  },
});

export const { titlePlain } = titlePlainTextNoteSlice.actions;
export default titlePlainTextNoteSlice.reducer;
