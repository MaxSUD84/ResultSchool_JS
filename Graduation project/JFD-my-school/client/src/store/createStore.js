import { combineReducers, configureStore } from "@reduxjs/toolkit";
import classesReducer from "./classes";
// import learnersReducer from "./learners";
// import teachersReducer from "./teachers";
import chLearnerReducer from "./chLearner";
import chTeacherReducer from "./chTeacher";
import subjectJournalReducer from "./chJournalSubject";
import classJournalsReducer from "./classJournals";
import authReducer from "./authSlice";
import authUserReducer from "./authUser";
import messageReducer from "./messageSlice";

const rootReducer = combineReducers({
  // learners: learnersReducer,
  // teachers: teachersReducer,
  auth: authReducer,
  authUser: authUserReducer,
  classes: classesReducer,
  chLearner: chLearnerReducer,
  chTeacher: chTeacherReducer,
  subjectJournal: subjectJournalReducer,
  journalsClass: classJournalsReducer,
  message: messageReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
