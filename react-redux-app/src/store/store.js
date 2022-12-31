// import { applyMiddleware, compose, createStore } from "redux";
import taskReducer from "./task";
import { logger } from "./middleware/logger";
// import { thunk } from "./middleware/thunk";
import errorReducer from "./errors";
import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";

// const initialState = [
//     { id: 1, title: "Task 1", completed: false },
//     { id: 2, title: "Task 2", completed: false },
//     { id: 3, title: "Task 3", completed: false },
// ];

// export function initiateStore() {
//     return createStore(taskReducer, initialState);
// }

// const middwareEnhancer = applyMiddleware(logger, thunk);

// function configureStore() {
//     return createStore(
//         taskReducer,
//         compose(middwareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//     );
// }

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
}

// export default configureStore;
export default createStore;
