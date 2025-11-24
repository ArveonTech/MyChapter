import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const contentQuillNoteSlice = createSlice({
  name: "contentQuill",
  initialState,
  reducers: {
    contentQuill: (state, action) => {
      return action.payload;
    },
  },
});

export const { contentQuill } = contentQuillNoteSlice.actions;
export default contentQuillNoteSlice.reducer;
