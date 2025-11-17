import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterHomeSlice = createSlice({
  name: "createStatus",
  initialState,
  reducers: {
    filterHome: (state, action) => {
      return action.payload;
    },
  },
});

export const { filterHome } = filterHomeSlice.actions;
export default filterHomeSlice.reducer;
