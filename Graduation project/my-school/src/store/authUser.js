/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";
import learnersService from "../services/learners.service";
import teachersService from "../services/teachers.service";

const initialState = { isLoaded: false, user: {} };

export const getCurUser = createAsyncThunk(
  "auth/userdata",
  async ({ userId, isTeacher }, thunkAPI) => {
    try {
      const response = isTeacher
        ? await teachersService.getById(userId)
        : await learnersService.getById(userId);

      return response;
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

export const clearCurrentUserData = () =>
  createAsyncThunk("auth/clear", (thunkAPI) => {
    return thunkAPI.fulfilled();
  });

const authUser = createSlice({
  name: "authUser",
  initialState,
  extraReducers: {
    [getCurUser.rejected]: (state) => {
      state.isLoaded = false;
      state.user = null;
    },
    [getCurUser.fulfilled]: (state, action) => {
      state.isLoaded = true;
      state.user = action.payload;
      // console.log(action);
    },
    [clearCurrentUserData.fulfilled]: (state, action) => {
      state.isLoaded = false;
      state.user = null;
      // console.log(action);
    },
  },
});
const { reducer: authUserReducer, name, actions } = authUser;
const { userAuthCleared, userAuthReceived, userAuthFailed } = actions;

// export const ReloadData = (userId) => async (dispatch) => {
//   dispatch(userAuthCleared());
//   try {
//     const content = await learnersService.getById(userId);
//     dispatch(userAuthReceived(content));
//   } catch (error) {
//     dispatch(userAuthFailed(error.message));
//   }
// };

// Selectors
export const isLoadedCurrentUser = () => (state) => state[name].isLoaded;
export const getCurrentUserData = () => (state) => state[name].user;
export const crossClassArr = () => (state) => {
  if (state[name].isLoaded) {
    let resArr = state[name].user.uuid_class;
    if (state[name].user.uuid_mentor) {
      if (!state[name].user.uuid_class.includes(state[name].user.uuid_mentor)) {
        resArr = [...resArr, state[name].user.uuid_mentor];
        // resArr.push(state[name].user.uuid_mentor);
      }
    }
    return resArr;
  } else {
    return [];
  }
};
export default authUserReducer;
