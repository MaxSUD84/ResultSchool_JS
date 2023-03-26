import { createSlice } from "@reduxjs/toolkit";
import classesService from "../services/classes.service";

const classesSlice = createSlice({
  name: "classes",
  initialState: {
    entities: null,
    dataLoaded: false,
    isLoading: true,
    error: null,
  },
  reducers: {
    classesRequested: (state) => {
      state.isLoading = true;
    },
    classesReceved: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    classesRequestFaild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: classesReducer, actions } = classesSlice;
const { classesRequested, classesReceved, classesRequestFaild } = actions;

// const createClassesRequested = createAction("users/createClassesRequested");

export const loadClassesList = (class_uuid) => async (dispatch) => {
  dispatch(classesRequested());
  try {
    const classArr = {};
    if (Array.isArray(class_uuid)) {
      await Promise.all(
        class_uuid.map(
          async (id) =>
            await classesService
              .getFullClassById(id)
              .then((data) => (classArr[id] = data))
        )
      );
    } else {
      await classesService
        .getFullClassById(class_uuid)
        .then((data) => (classArr[class_uuid] = data));
    }
    dispatch(classesReceved(classArr));
  } catch (error) {
    dispatch(classesRequestFaild(error.message));
  }
};

export const getClasses = () => (state) => state.classes.entities;
export const getClassesLoadingStatus = () => (state) => state.classes.isLoading;
export const getDataStatus = () => (state) => state.classes.dataLoaded;

export const getClassById = (class_uuid) => (state) => {
  if (state.classes.entities) {
    return state.classes.entities[class_uuid] || {};
  }
};

export default classesReducer;
