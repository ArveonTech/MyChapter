import { configureStore } from "@reduxjs/toolkit";
import filterStatusNoteHomeSlice from "@/features/filterStatusNoteHomeSlice";
import loadingSlice from "@/features/loadingSlice";
import gridSlice from "@/features/gridSlice";

export const store = configureStore({
  reducer: {
    filterStatusHome: filterStatusNoteHomeSlice,
    setLayoutRow: gridSlice,
    loadingSearch: loadingSlice,
  },
});
