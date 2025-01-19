import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTeacherDb, getTeachersDB } from "../../db/teachersDb";

export const getTeachersThunk = createAsyncThunk(
  "teachers/getTeachersThunk",
  async (userId) => {
    try {
      const teachersList = await getTeachersDB(userId);
      return { teachersList, loading: false };
    } catch (er) {
      console.log(er.code, er.message);
      return { teachersList: {}, loading: false };
    }
  }
);

export const addTeacherThunk = createAsyncThunk(
  "teachers/addTeacherThunk",
  async ({ userId, teacher }, { rejectWithValue }) => {
    try {
      await addTeacherDb(userId, teacher);
      return { [teacher.id]: teacher };
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

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    loading: true,
    error: null,
    teachersList: {
      // 1: {
      //   id: 1,
      //   name: "Иванова Мария Михайловна",
      //   tel: "(905)123-22-33",
      //   birthdate: null,
      //   teachingLessons: ["4Cn4xJFFJ2"],
      // },
    },
  },
  reducers: {
    removeTeachers: (state) => {
      state.loading = true;
      state.error = null;
      state.teachersList = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTeachersThunk.fulfilled, (state, action) => {
      return (state = action.payload);
    });
    builder.addCase(addTeacherThunk.fulfilled, (state, action) => {
      return {
        ...state,
        teachersList: { ...state.teachersList, ...action.payload },
      };
    });
    builder.addCase(addTeacherThunk.rejected, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});
export const { removeTeachers } = teachersSlice.actions;
export const teacherReducer = teachersSlice.reducer;
