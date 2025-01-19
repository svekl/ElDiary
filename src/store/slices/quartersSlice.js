import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addQuartersDb, getQuartersDB } from "../../db/quartersDb";

export const getQuartersThunk = createAsyncThunk(
  "quarters/getQuartersThunk",
  async ({ userId, currentYear }) => {
    try {
      const quartersList = await getQuartersDB(userId, currentYear);
      return { quartersList, loading: false, error: null };
    } catch (er) {
      console.log(er.code, er.message);
      return { quartersList: {}, loading: false, error: er.message };
    }
  }
);

export const addQuartersThunk = createAsyncThunk(
  "quarters/addQuartersThunk",
  async ({ userId, currentYear, data }, { rejectWithValue }) => {
    try {
      await addQuartersDb(userId, currentYear, data);
      return data;
    } catch (error) {
      if (error.code === "permission-denied") {
        console.error("У вас нет разрешения на добавление документа.");
      } else if (error.code === "not-found") {
        console.error("Коллекция не найдена.");
      } else {
        console.error("Произошла неизвестная ошибка: ", error.message);
      }
      return rejectWithValue({ error: error.message });
    }
  }
);

const quartersSlice = createSlice({
  name: "quarters",
  initialState: {
    loading: true,
    error: null,
    quartersList: {
      // 1: {
      //   start: "2024-09-02",
      //   end: "2024-11-02",
      // },
    },
  },
  reducers: {
    removeQuarters: (state) => {
      state.loading = true;
      state.error = null;
      state.quarters = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuartersThunk.fulfilled, (state, action) => {
      return (state = action.payload);
    });
    builder.addCase(addQuartersThunk.fulfilled, (state, action) => {
      return {
        ...state,
        quartersList: action.payload,
      };
    });
    builder.addCase(addQuartersThunk.rejected, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});
export const { removeQuarters } = quartersSlice.actions;
export const quartersReducer = quartersSlice.reducer;
