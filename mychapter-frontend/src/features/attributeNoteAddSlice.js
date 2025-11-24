import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tag: "",
  status: "",
  incArchive: false,
};

const attributeNoteAddSlice = createSlice({
  name: "attributeNote",
  initialState,
  reducers: {
    attributeNote: (state, action) => {
      return action.payload;
    },
  },
});

export const { attributeNote } = attributeNoteAddSlice.actions;
export default attributeNoteAddSlice.reducer;
