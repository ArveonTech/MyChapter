import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const statusAddSlice = createSlice({
  name: "statusAdd",
  initialState,
  reducers: {
    statusAdd: (state, action) => {
      return action.payload;
    },
  },
});

export const { statusAdd } = statusAddSlice.actions;
export default statusAddSlice.reducer;
