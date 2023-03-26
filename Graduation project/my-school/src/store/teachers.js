import { createSlice } from "@reduxjs/toolkit";
import teachersService from "../services/teachers.service";

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    entities: null,
    entitiesLoaded: false,
    currentList: null,
    curListLoaded: false,
    isCurLoading: true,
    isLoading: true,
    error: null,
  },
  reducers: {
    allTeachersRequested: (state) => {
      state.isLoading = true;
      state.isCurLoading = true;
      state.entitiesLoaded = false;
    },
    allTeachersReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.entitiesLoaded = true;
    },
    teachersListRequested: (state) => {
      state.isCurLoading = true;
    },
    teachersListReceved: (state, action) => {
      state.currentList = action.payload;
      state.curListLoaded = true;
      state.isCurLoading = false;
    },
    teachersRequestFaild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isCurLoading = false;
    },
  },
});

const { reducer: teachersReducer, actions } = teachersSlice;
const {
  allTeachersRequested,
  allTeachersReceved,
  teachersListRequested,
  teachersListReceved,
  teachersRequestFaild,
} = actions;

export const loadFullTeachersList = () => async (dispatch) => {
  dispatch(allTeachersRequested());
  try {
    const content = await teachersService.get();
    dispatch(allTeachersReceved(content));
  } catch (error) {
    dispatch(teachersRequestFaild(error.message));
  }
};

// Учащиеся всех классов
export const getAllTeachers = () => (state) => state.teachers.entities;
export const getAllTeachersLoadingStatus = () => (state) =>
  state.teachers.isLoading;
export const getAllDataStatus = () => (state) => state.teachers.entitiesLoaded;

// Учащиеся текущего класса
export const getTeachers = () => (state) => state.teachers.currentList;
export const getTeachersLoadingStatus = () => (state) =>
  state.teachers.isCurLoading;
export const getClassDataStatus = () => (state) => state.teachers.curListLoaded;

export const loadClassTeachersList = (array_id) => (dispatch) => {
  dispatch(teachersListRequested());
  var _teachersClass = new Array();
  try {
    array_id.forEach(async (t_uuid, i, arr) => {
      const teacher = await teachersService.getById(t_uuid);
      if (teacher) {
        // _teachersClass.splice(_teachersClass.length > 0 ? -1 : 0, 0, ...teachers);
        _teachersClass.push(...teacher);
        if (i === arr.length - 1) {
          // console.log(_teachersClass, _teachersClass.length);
          dispatch(teachersListReceved(_teachersClass));
        }
      }
    });
  } catch (error) {
    dispatch(
      teachersRequestFaild(error.message, "Error: All Learners Loading ... ")
    );
  }
};

export const getTeachersById = (teacher_uuid) => (state) => {
  if (state.teachers.entities) {
    return state.teachers.entities.find((lern) => lern.uuid === teacher_uuid);
  }
};

export default teachersReducer;
