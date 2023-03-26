import { createSlice } from "@reduxjs/toolkit";
import learnersService from "../services/learners.service";

const chLearnersSlice = createSlice({
  name: "chLearner",
  initialState: {
    entities: null,
    chLearnerLoaded: false,
    isLoading: true,
    error: null,
  },
  reducers: {
    chLearnerRequested: (state) => {
      state.isLoading = true;
      state.chLearnerLoaded = false;
      state.entities = null;
    },
    chLearnerReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.chLearnerLoaded = true;
    },
    chLearnerRequestFaild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: chLearnerReducer, name, actions } = chLearnersSlice;
const { chLearnerRequested, chLearnerReceved, chLearnerRequestFaild } = actions;

export const loadChoosenLearner = (learner_uuid) => async (dispatch) => {
  dispatch(chLearnerRequested());
  try {
    const content = await learnersService.getById(learner_uuid);
    dispatch(chLearnerReceved(content));
  } catch (error) {
    dispatch(chLearnerRequestFaild(error.message));
  }
};

export const clearChoosenLearner = () => (dispatch) =>
  dispatch(chLearnerRequested());

// Данный выбранного ученика
export const getChoosenLearner = () => (state) => state[name].entities;
export const getLoadingStatusChLearner = () => (state) => state[name].isLoading;
export const getChLearnerLoaded = () => (state) => state[name].chLearnerLoaded;

export default chLearnerReducer;
