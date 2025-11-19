import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const filterNotesSlice = createSlice({
  name: "createStatus",
  initialState,
  reducers: {
    filterNote: (state, action) => {
      return action.payload;
    },
  },
});

export const { filterNote } = filterNotesSlice.actions;
export default filterNotesSlice.reducer;
