import { configureStore } from "@reduxjs/toolkit";
import filterStatusNoteHomeSlice from "@/features/filterStatusNoteHomeSlice";
import loadingSlice from "@/features/loadingSlice";
import gridSlice from "@/features/gridSlice";
import titleQuillNoteSlice from "@/features/titleQuillNoteSlice";
import contentQuillNoteSlice from "@/features/contentQuillNoteSlice";
import attributeNoteAddSlice from "@/features/attributeNoteAddSlice";
import titlePlainTextNoteSlice from "@/features/titlePlainTextNoteSlice";
import contentPlainTextNoteSlice from "@/features/contentPlainTextNoteSlice";
import statusActionFormSlice from "@/features/statusActionFormSlice";
import backPageSlice from "@/features/backPageSlice";
import deleteStatusSlice from "@/features/deleteStatusSlice";

export const store = configureStore({
  reducer: {
    filterStatusHome: filterStatusNoteHomeSlice,
    setLayoutRow: gridSlice,
    loadingSearch: loadingSlice,
    titleQuillNote: titleQuillNoteSlice,
    titlePlainTextNote: titlePlainTextNoteSlice,
    contentQuillNote: contentQuillNoteSlice,
    contentPlainTextNote: contentPlainTextNoteSlice,
    attributeNote: attributeNoteAddSlice,
    statusActionForm: statusActionFormSlice,
    backPage: backPageSlice,
    deleteStatus: deleteStatusSlice,
  },
});
