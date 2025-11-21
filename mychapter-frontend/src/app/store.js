import { configureStore } from "@reduxjs/toolkit";
import filterStatusNoteHomeSlice from "@/features/filterStatusNoteHomeSlice";
import filterNotesSlice from "@/features/filterNotesSlice";
import loadingSlice from "@/features/loadingSlice";

export const store = configureStore({
  reducer: {
    filterStatusHome: filterStatusNoteHomeSlice,
    filterNotes: filterNotesSlice,
    loadingSearch: loadingSlice,
  },
});
