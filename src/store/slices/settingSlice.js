import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSettingsDB, updateSettingsDB } from "../../db/settingsDb";

export const getSettingsThunk = createAsyncThunk(
  "settings/getSettingsThunk",
  async (userId) => {
    try {
      const settings = await getSettingsDB(userId);
      return { loading: false, error: null, settings };
    } catch (er) {
      console.log(er.code, er.message);
      return { loading: false, error: er.message, settings: {} };
    }
  }
);
export const updateSettingsThunk = createAsyncThunk(
  "settings/updateSettingsThunk",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      await updateSettingsDB(userId, data);
      return data;
    } catch (er) {
      rejectWithValue({ error: er.message });
    }
  }
);

const settingSlice = createSlice({
  name: "settings",
  initialState: {
    loading: true,
    error: null,

    // отображение домашний работы: 0-текущий день, 1 - завтрашний день
    settings: {
      // displayHomeWork: 1,
    },

    // rings: [
    //   null,
    //   "8.00 - 8.40",
    //   "8.45 - 9.25",
    //   "9.30 - 10.10",
    //   "10.25 - 11.05",
    //   "11.15 - 11.55",
    //   "12.00 - 12.35",
    //   "12.40 - 13.15",
    // ],
  },
  reducers: {
    removeSettings: (state) => {
      state.loading = true;
      state.error = null;
      state.settings = {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getSettingsThunk.fulfilled, (state, action) => {
      return (state = action.payload);
    });
    builder.addCase(updateSettingsThunk.fulfilled, (state, action) => {
      return (state = {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      });
    });
    builder.addCase(updateSettingsThunk.rejected, (state, action) => {
      return state;
    });
  },
});
export const { removeSettings } = settingSlice.actions;
export const settingsReducer = settingSlice.reducer;
