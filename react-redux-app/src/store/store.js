// import { applyMiddleware, compose, createStore } from "redux";
import taskReducer from "./task";
import { logger } from "./middleware/logger";
// import { thunk } from "./middleware/thunk";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

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

function createStore() {
    return configureStore({
        reducer: taskReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== "production",
    });
}

// export default configureStore;
export default createStore;
