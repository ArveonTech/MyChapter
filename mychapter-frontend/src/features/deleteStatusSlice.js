import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const deleteStatusSlice = createSlice({
  name: "deleteStatus",
  initialState,
  reducers: {
    status: (state, action) => {
      return action.payload;
    },
  },
});

export const { status } = deleteStatusSlice.actions;
export default deleteStatusSlice.reducer;
