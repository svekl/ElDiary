import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: {
      12: {
        id: 12,
        date: "2024-09-02",
        text: "qwer rwrwrw yeyyeye kk",
      },
      23: {
        id: 23,
        date: "2024-09-03",
        text: "rerer rere",
      },
    },
    allIds: [12, 23],
  },
  reducers: {
    addNote: (state, action) => {
      const note = action.payload;
      state.notes[note.id] = note;
      state.allIds.push(note.id);
    },
    removeNote: (state, action) => {
      const { noteId } = action.payload;
      delete state.notes[noteId];
      state.allIds = state.allIds.filter((id) => id !== noteId);
    },
    updateNote(state, action) {
      const { noteId, data } = action.payload;
      console.log(action.payload);
      console.log(state.notes[noteId]);
      Object.assign(state.notes[noteId], data);
    },
  },
  //   редьюсеры для thunk функций
  //   extraReducers: (builder) => {
  //     builder.addCase(createUserThunk.fulfilled, (state, action) => {
  //       return (state = action.payload);
  //     });
  //     builder.addCase(loginThunk.fulfilled, (state, action) => {
  //       return (state = action.payload);
  //     });
  //   },
});
export const { addNote, removeNote, updateNote } = noteSlice.actions;
export const noteReducer = noteSlice.reducer;
