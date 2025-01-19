import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { addUserDb } from "../../db/userDb";
import { lessonsInit } from "../../db/lessonsDb";
import { settingsInit } from "../../db/settingsDb";

// THUNK для создания пользователя при регистрации
export const createUserThunk = createAsyncThunk(
  "user/addUserThunk",
  async ({ email, pass }, { rejectWithValue }) => {
    try {
      const userCredit = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );
      console.log(userCredit.user);
      // ответ от firebase при успешно выполненном запросе
      const userData = {
        email: userCredit.user.email,
        id: userCredit.user.uid,
      };
      addUserDb(userData);
      lessonsInit(userCredit.user.uid);
      settingsInit(userCredit.user.uid);
      return userData;
    } catch (er) {
      console.log(er.code, er.message);
      //   ошибку можно прокинуть в стейт и через dispatch и через rejectWithValue, обработав в [loginThunk.fulfilled]
      //   rejectWithValue(er.message)
    }
  }
);

// THUNK для входа если пользователь зарегистрирован
export const loginThunk = createAsyncThunk(
  "user/loginThunk",
  async ({ email, pass }) => {
    try {
      const userCredit = await signInWithEmailAndPassword(auth, email, pass);
      const userData = {
        email: userCredit.user.email,
        id: userCredit.user.uid,
      };
      console.log(userCredit.user);
      return userData;
    } catch (er) {
      console.log(er.code, er.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    id: null,
    // error: null
  },
  reducers: {
    addUser: (state, action) => {
      return (state = action.payload);
    },
    removeUser: (state) => {
      state.email = null;
      state.id = null;
      state.token = null;
    },
  },
  //   редьюсеры для thunk функций
  extraReducers: (builder) => {
    builder.addCase(createUserThunk.fulfilled, (state, action) => {
      return (state = action.payload);
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
  //   // можно еще обработать ошибки с pending и reject
  //   [createUserThunk.fulfilled]: (state, action) => {
  //     return (state = action.payload);
  //   },
  //   // [createUserThunk.rejected]: (state, action) => {
  //   //   state.error = action.payload;
  //   // },
  //   [loginThunk.fulfilled]: (state, action) => {
  //     return (state = action.payload);
  //   },

  // },
});

export const { addUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
