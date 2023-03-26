import { createSlice } from "@reduxjs/toolkit";
import learnersService from "../services/learners.service";

const learnersSlice = createSlice({
  name: "learners",
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
    allLearnersRequested: (state) => {
      state.isLoading = true;
      state.isCurLoading = true;
      state.entitiesLoaded = false;
    },
    allLearnersReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.entitiesLoaded = true;
    },
    learnerListRequested: (state) => {
      state.isCurLoading = true;
    },
    learnerListReceved: (state, action) => {
      state.currentList = action.payload;
      state.curListLoaded = true;
      state.isCurLoading = false;
    },
    learnerRequestFaild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isCurLoading = false;
    },
  },
});

const { reducer: learnersReducer, actions } = learnersSlice;
const {
  allLearnersRequested,
  allLearnersReceved,
  learnerListRequested,
  learnerListReceved,
  learnerRequestFaild,
} = actions;

export const loadFullLearnersList = () => async (dispatch) => {
  dispatch(allLearnersRequested());
  try {
    const content = await learnersService.get();
    dispatch(allLearnersReceved(content));
  } catch (error) {
    dispatch(learnerRequestFaild(error.message));
  }
};

// Учащиеся всех классов
export const getAllLearners = () => (state) => state.learners.entities;
export const getAllLearnersLoadingStatus = () => (state) =>
  state.learners.isLoading;
export const getAllDataStatus = () => (state) => state.learners.entitiesLoaded;

// Учащиеся текущего класса
export const getLearners = () => (state) => state.learners.currentList;
export const getLearnersLoadingStatus = () => (state) =>
  state.learners.isCurLoading;
export const getClassDataStatus = () => (state) => state.learners.curListLoaded;

export const loadClassLearnersList = (array_id) => (dispatch) => {
  dispatch(learnerListRequested());
  var _learnerClass = new Array();
  try {
    array_id.forEach(async (l_uuid, i, arr) => {
      const learner = await learnersService.getById(l_uuid);
      if (learner) {
        _learnerClass.push(...learner);
        if (i === arr.length - 1) {
          dispatch(learnerListReceved(_learnerClass));
        }
      }
    });
  } catch (error) {
    dispatch(
      learnerRequestFaild(error.message, "Error: All Learners Loading ... ")
    );
  }
};

export const getLearnersById = (learner_uuid) => (state) => {
  if (state.learners.entities) {
    return state.learners.entities.find((lern) => lern._id === learner_uuid);
  }
};

export default learnersReducer;
