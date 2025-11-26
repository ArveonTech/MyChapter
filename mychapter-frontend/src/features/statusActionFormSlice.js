import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const statusActionFormSlice = createSlice({
  name: "statusAction",
  initialState,
  reducers: {
    statusAction: (state, action) => {
      return action.payload;
    },
  },
});

export const { statusAction } = statusActionFormSlice.actions;
export default statusActionFormSlice.reducer;
