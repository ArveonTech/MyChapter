import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const updateProfileStatusSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    statusUpdateProfile: (state, action) => {
      return action.payload;
    },
  },
});

export const { statusUpdateProfile } = updateProfileStatusSlice.actions;
export default updateProfileStatusSlice.reducer;
