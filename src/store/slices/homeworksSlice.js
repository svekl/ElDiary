import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addHomeworkDB,
  getHomeworksDB,
  updateHomeworkDB,
} from "../../db/homeworkDb";
import { updateDailyScheduleLessonThunk } from "./dailySchedulesSlice";

export const getHomeworksThunk = createAsyncThunk(
  "homeworks/getHomeworksThunk",
  async ({ userId, currentYear }) => {
    try {
      const homeworksList = await getHomeworksDB(userId, currentYear);
      return { loading: false, error: null, homeworksList };
    } catch (er) {
      console.log(er.code, er.message);
      return { loading: false, error: er.message };
    }
  }
);

export const addHomeworkThunk = createAsyncThunk(
  "homeworks/addHomeworkThunk",
  async (
    { userId, homework, currentStudyYear, data, dispatch },
    { rejectWithValue }
  ) => {
    try {
      await addHomeworkDB(userId, homework, currentStudyYear).then(
        dispatch(
          updateDailyScheduleLessonThunk({ userId, data, currentStudyYear })
        )
      );
      return homework;
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
export const updateHomeworkThunk = createAsyncThunk(
  "homeworks/updateHomeworkThunk",
  async ({ userId, currentStudyYear, homework }, { rejectWithValue }) => {
    try {
      await updateHomeworkDB(userId, currentStudyYear, homework);
      return homework;
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

const homeworksSlice = createSlice({
  name: "homeworks",
  initialState: {
    loading: true,
    error: null,
    homeworksList: {
      // 1: {
      //   id: 1,
      //   homework: [
      //     {
      //       task: null,
      //       page: null,
      //       notes: "стих наизусть",
      //     },
      //     {
      //       task: "23",
      //       page: "23-34",
      //       notes: "qwerty",
      //     },
      //   ],
      //   isDone: false,
      // },
    },
  },
  reducers: {
    removeHomeworks: (state) => {
      state.loading = true;
      state.error = null;
      state.homeworksList = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomeworksThunk.fulfilled, (state, action) => {
      return (state = action.payload);
    });
    builder.addCase(addHomeworkThunk.fulfilled, (state, action) => {
      return {
        ...state,
        homeworksList: {
          ...state.homeworksList,
          [action.payload.id]: action.payload,
        },
      };
    });
    builder.addCase(addHomeworkThunk.rejected, (state, action) => {
      return state;
    });
    builder.addCase(updateHomeworkThunk.fulfilled, (state, action) => {
      return {
        ...state,
        homeworksList: {
          ...state.homeworksList,
          [action.payload.id]: action.payload,
        },
      };
    });
    builder.addCase(updateHomeworkThunk.rejected, (state, action) => {
      return state;
    });
  },
});
export const { removeHomeworks } = homeworksSlice.actions;
export const homeworksReducer = homeworksSlice.reducer;
