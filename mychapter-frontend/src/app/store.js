import { configureStore } from "@reduxjs/toolkit";
import filterStatusNoteHomeSlice from "@/features/filterStatusNoteHomeSlice";
import loadingSlice from "@/features/loadingSlice";
import gridSlice from "@/features/gridSlice";
import titleQuillNoteSlice from "@/features/titleQuillNoteSlice";
import contentQuillNoteSlice from "@/features/ContentQuillNoteSlice";
import attributeNoteAddSlice from "@/features/attributeNoteAddSlice";

export const store = configureStore({
  reducer: {
    filterStatusHome: filterStatusNoteHomeSlice,
    setLayoutRow: gridSlice,
    loadingSearch: loadingSlice,
    titleQuillNote: titleQuillNoteSlice,
    contentQuillNote: contentQuillNoteSlice,
    attributeNote: attributeNoteAddSlice,
  },
});
