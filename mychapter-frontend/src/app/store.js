import tagHomeSlice from "@/features/tagHomeSlice";
import { configureStore } from "@reduxjs/toolkit";
import filterHomeSlice from "@/features/filterNoteHomeSlice"


export const store = configureStore({
  reducer: {
    tagHome: tagHomeSlice,
    filterHome: filterHomeSlice,
  },
});
