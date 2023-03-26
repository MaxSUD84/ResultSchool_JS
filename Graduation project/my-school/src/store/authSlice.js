import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";
import { clearCurrentUserData, getCurUser } from "./authUser"; //
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";

const userData = localStorageService.getUserId();

export const signUp = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await authService.signUp(username, email, password);
      // if (response.data && response.data.userId) {
      //   thunkAPI.dispatch(loadCurrentUserData(response.data));
      // }
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const login = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await authService.login(email, password);
      // console.log(response);
      if (response.data && response.data.userId) {
        thunkAPI.dispatch(
          getCurUser({
            userId: response.data.userId,
            isTeacher: response.data.isTeacher,
          })
        );
      }
      return response.data;
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          (error.response.data.message || error.response.data.error.message)) ||
        error.message ||
        error.toString();

      // переопределение ошибок авторизации
      switch (message) {
        case "EMAIL_NOT_FOUND":
          message = "Пользователя с таким логином не существует!";
          break;
        case "INVALID_PASSWORD":
          message = "Не правильный пароль!";
          break;
        case "INVALID_DATA":
          message = "Введенные данные не соответствуют email, password!";
          break;
        default:
      }

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const logOut = createAsyncThunk("auth/logout", (thunkAPI) => {
  // thunkAPI;
  authService.logout();
  console.log("auth/logout - authSlice");
  return thunkAPI.dispatch(clearCurrentUserData()).fulfilled();
});

const initialState = userData
  ? { isLoggedIn: true, userId: userData.userId, isTeacher: userData.isTeacher }
  : { isLoggedIn: false, userId: null, isTeacher: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [signUp.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.isTeacher = action.payload.isTeacher;
    },
    [signUp.rejected]: (state) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.isTeacher = action.payload.isTeacher;
    },
    [login.rejected]: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.isTeacher = null;
    },
    [logOut.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.isTeacher = null;
    },
  },
});
const { reducer: authReducer, name } = authSlice;

// Selectors
export const isLoggedInSelector = () => (state) => state[name].isLoggedIn;
export const getCurrentUserId = () => (state) => state[name].userId;
export const isTeacherLogged = () => (state) => state[name].isTeacher;
export default authReducer;
