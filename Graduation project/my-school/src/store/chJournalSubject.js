import { createSlice } from "@reduxjs/toolkit";
import journalsService from "../services/journals.service";

const subjectJournalSlice = createSlice({
  name: "subjectJournal",
  initialState: {
    entities: null,
    entitiesLoaded: false,
    isLoading: true,
    error: null,
  },
  reducers: {
    subjectJournalRequested: (state) => {
      state.isLoading = true;
      state.entitiesLoaded = false;
      state.entities = null;
    },
    subjectJournalReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.entitiesLoaded = true;
    },
    subjectJournalRequestFaild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.entitiesLoaded = false;
    },
  },
});

const { reducer: subjectJournalReducer, name, actions } = subjectJournalSlice;
const {
  subjectJournalRequested,
  subjectJournalReceved,
  subjectJournalRequestFaild,
} = actions;

export const loadSubjectJournal = (uuid_subject) => async (dispatch) => {
  dispatch(subjectJournalRequested());
  try {
    const content = await journalsService.getSubjectJournalById(uuid_subject);
    dispatch(subjectJournalReceved(content));
  } catch (error) {
    dispatch(subjectJournalRequestFaild(error.message));
  }
};

export const clearChoosenJournal = () => (dispatch) =>
  dispatch(subjectJournalRequested());

// Выгрузим список классных школьных журналов
export const getSubjectJournal = () => (state) => state[name].entities;
export const isSubjectJournalLoading = () => (state) => state[name].isLoading;
export const isSubjectJournalLoaded = () => (state) =>
  state[name].entitiesLoaded;

export default subjectJournalReducer;
