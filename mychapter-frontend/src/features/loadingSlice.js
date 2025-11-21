import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const loadingSlice = createSlice({
  name: "createStatus",
  initialState,
  reducers: {
    loading: (state, action) => {
      return action.payload;
    },
  },
});

export const { loading } = loadingSlice.actions;
export default loadingSlice.reducer;
