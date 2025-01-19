import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDailySchedulesDB,
  getDailyShedulesDB,
  updateDailyScheduleDayDB,
  updateDailyScheduleLessonDB,
} from "../../db/dailyShedulesDb";

export const getDailySchedules = createAsyncThunk(
  "dailySchedules/getDailySchedThunk",
  async ({ userId, currentYear }) => {
    try {
      const schedulesList = await getDailyShedulesDB(userId, currentYear);
      return { loading: false, error: null, schedulesList };
    } catch (er) {
      console.log(er.code, er.message);
      return { loading: false, error: er.message, schedulesList: {} };
    }
  }
);

export const addDailySchedulesThunk = createAsyncThunk(
  "dailySchedules/addDailySchedulesThunk",
  async ({ userId, schedulesList, currentStudyYear }, { rejectWithValue }) => {
    try {
      await addDailySchedulesDB(userId, schedulesList, currentStudyYear);
      return { schedulesList };
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

export const updateDailyScheduleLessonThunk = createAsyncThunk(
  "dailySchedules/updateDailyScheduleLessonThunk",
  async ({ userId, data, currentStudyYear }, { rejectWithValue }) => {
    try {
      await updateDailyScheduleLessonDB(userId, data, currentStudyYear);
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
export const updateDailyScheduleDayThunk = createAsyncThunk(
  "dailySchedules/updateDailyScheduleDayThunk",
  async ({ userId, currentStudyYear, data }, { rejectWithValue }) => {
    try {
      await updateDailyScheduleDayDB(userId, data, currentStudyYear);
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

const dailySchedulesSlice = createSlice({
  name: "dailySchedules",
  initialState: {
    loading: true,
    error: null,
    schedulesList: {
      // "2024-09-02": {
      //   id: 123123231,
      //   date: "2024-09-02",
      //   lessonsList: {
      //     0: {
      //       lessonId: 2,
      //       homework: 1,
      //       grade: 5,
      //       teacherId: 2,
      //       cabinet: null,
      //     },
      //     1: {
      //       lessonId: 1,
      //       homework: 2,
      //       grade: null,
      //       teacherId: 1,
      //       cabinet: null,
      //     },
      //     2: {
      //       lessonId: 1,
      //       homework: null,
      //       grade: null,
      //       teacherId: 1,
      //       cabinet: null,
      //     },
      //   },
      //   notes: "qwerty",
      //   vacation: false,
      //   holiday: false,
      // },
    },
  },
  reducers: {
    removeDailySchedules: (state) => {
      state.loading = true;
      state.error = null;
      state.schedulesList = {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getDailySchedules.fulfilled, (state, action) => {
      return (state = action.payload);
    });
    builder.addCase(addDailySchedulesThunk.fulfilled, (state, action) => {
      return {
        ...state,
        schedulesList: {
          ...state.schedulesList,
          ...action.payload.schedulesList,
        },
      };
    });
    builder.addCase(addDailySchedulesThunk.rejected, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(
      updateDailyScheduleLessonThunk.fulfilled,
      (state, action) => {
        const { updateKey, date, number, updateValue } = action.payload;
        if (updateKey === "lesson") {
          return {
            ...state,
            schedulesList: {
              ...state.schedulesList,
              [date]: {
                ...state.schedulesList[date],
                lessonsList: {
                  ...state.schedulesList[date].lessonsList,
                  [number]: updateValue,
                },
              },
            },
          };
        } else {
          return {
            ...state,
            schedulesList: {
              ...state.schedulesList,
              [date]: {
                ...state.schedulesList[date],
                lessonsList: {
                  ...state.schedulesList[date].lessonsList,
                  [number]: {
                    ...state.schedulesList[date].lessonsList[number],
                    [updateKey]: updateValue,
                  },
                },
              },
            },
          };
        }
      }
    );
    builder.addCase(
      updateDailyScheduleLessonThunk.rejected,
      (state, action) => {
        return state;
      }
    );
    builder.addCase(updateDailyScheduleDayThunk.fulfilled, (state, action) => {
      const { updateKey, date, updateValue } = action.payload;
      return {
        ...state,
        schedulesList: {
          ...state.schedulesList,
          [date]: {
            ...state.schedulesList[date],
            [updateKey]: updateValue,
          },
        },
      };
    });
    builder.addCase(updateDailyScheduleDayThunk.rejected, (state, action) => {
      return state;
    });
  },
});
export const { removeDailySchedules } = dailySchedulesSlice.actions;
export const dailySchedulesReducer = dailySchedulesSlice.reducer;
