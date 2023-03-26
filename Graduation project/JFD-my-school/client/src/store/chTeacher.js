import { createSlice } from "@reduxjs/toolkit";
import teachersService from "../services/teachers.service";

const chTeachersSlice = createSlice({
  name: "chTeacher",
  initialState: {
    entities: null,
    chTeacherLoaded: false,
    isLoading: true,
    error: null,
  },
  reducers: {
    chTeacherRequested: (state) => {
      state.isLoading = true;
      state.chTeacherLoaded = false;
      state.entities = null;
    },
    chTeacherReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.chTeacherLoaded = true;
    },
    chTeacherRequestFaild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: chTeacherReducer, name, actions } = chTeachersSlice;
const { chTeacherRequested, chTeacherReceved, chTeacherRequestFaild } = actions;

export const loadChoosenTeacher = (teacher_uuid) => async (dispatch) => {
  dispatch(chTeacherRequested());
  try {
    const content = await teachersService.getById(teacher_uuid);
    dispatch(chTeacherReceved(content));
  } catch (error) {
    dispatch(chTeacherRequestFaild(error.message));
  }
};

export const clearChoosenTeacher = () => (dispatch) =>
  dispatch(chTeacherRequested());

// Данный выбранного ученика
export const getChoosenTeacher = () => (state) => state[name].entities;
export const getLoadingStatusChTeacher = () => (state) => state[name].isLoading;
export const getChTeacherLoaded = () => (state) => state[name].chTeacherLoaded;

export default chTeacherReducer;
