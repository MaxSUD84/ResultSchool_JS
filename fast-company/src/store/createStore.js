import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";

const rootRuducer = combineReducers({ qualities: qualitiesReducer });

export function createStore() {
    return configureStore({
        reducer: rootRuducer
    });
}
