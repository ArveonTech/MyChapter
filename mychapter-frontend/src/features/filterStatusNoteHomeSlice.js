import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterStatusNoteHomeSlice = createSlice({
  name: "createStatus",
  initialState,
  reducers: {
    filterStatusNoteHome: (state, action) => {
      return action.payload;
    },
  },
});

export const { filterStatusNoteHome } = filterStatusNoteHomeSlice.actions;
export default filterStatusNoteHomeSlice.reducer;
