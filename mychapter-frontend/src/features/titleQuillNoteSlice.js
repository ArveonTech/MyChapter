import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const titleQuillNoteSlice = createSlice({
  name: "titleQuill",
  initialState,
  reducers: {
    titleQuill: (state, action) => {
      return action.payload;
    },
  },
});

export const { titleQuill } = titleQuillNoteSlice.actions;
export default titleQuillNoteSlice.reducer;
