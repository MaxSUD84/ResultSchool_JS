import { createSlice } from "@reduxjs/toolkit";
import journalsService from "../services/journals.service";

const classJournalsSlice = createSlice({
  name: "journalsClass",
  initialState: {
    entities: null,
    entitiesLoaded: false,
    isLoading: true,
    error: null,
  },
  reducers: {
    allClassJournalsRequested: (state) => {
      state.isLoading = true;
      state.entitiesLoaded = false;
      state.entities = null;
    },
    allClassJournalsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.entitiesLoaded = true;
    },
    allClassJournalsRequestFaild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.entitiesLoaded = false;
    },
  },
});

const { reducer: classJournalsReducer, name, actions } = classJournalsSlice;
const {
  allClassJournalsRequested,
  allClassJournalsReceved,
  allClassJournalsRequestFaild,
} = actions;

export const loadClassJournals = () => async (dispatch) => {
  dispatch(allClassJournalsRequested());
  try {
    const content = await journalsService.getAllClassJournals();
    dispatch(allClassJournalsReceved(content));
  } catch (error) {
    dispatch(allClassJournalsRequestFaild(error.message));
  }
};

// Выгрузим список классных школьных журналов
export const getAllClassJournals = () => (state) => state[name].entities;
export const isAllClassJournalsLoading = () => (state) => state[name].isLoading;
export const isAllClassJournalsLoaded = () => (state) => {
  return state[name].entitiesLoaded;
};

export const getClassJournalsByClassId = (uuid_class) => (state) => {
  if (state[name].entities) {
    return state[name].entities.find((cls) => cls.uuid_class === uuid_class);
  } else return "";
};

export default classJournalsReducer;
