import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const setRenderProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    setrender: (state, action) => {
      return action.payload;
    },
  },
});

export const { setrender } = setRenderProfileSlice.actions;
export default setRenderProfileSlice.reducer;
