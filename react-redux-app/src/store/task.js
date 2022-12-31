import { createAction, createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };
// [
//     // { id: 1, title: "Task 1", completed: false },
//     // { id: 2, title: "Task 2", completed: false },
//     // { id: 3, title: "Task 3", completed: false },
// ];

// import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
// const update = createAction("task/updated");
// const remove = createAction("task/removed");

// const taskRequested = createAction("task/requested");
// const taskRequestFailed = createAction("task/requestFailed");

// export function taskCompleted(id) {
//     return update({ id, completed: true });
// }

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

// const taskReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(update, (state, action) => {
//             const elementIndex = state.findIndex((el) => el.id === action.payload.id);
//             state[elementIndex] = { ...state[elementIndex], ...action.payload };
//             // return newArray;
//         })
//         .addCase(remove, (state, action) => {
//             return [...state].filter((el) => el.id !== action.payload.id);
//         });
// });

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
      // return newArray;
    },
    add(state, action) {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
  },
});

export const createTask = (lastID) => async (dispatch) => {
  dispatch(taskRequested());
  console.log(lastID);
  try {
    const data = await todosService.create(lastID + 1);
    dispatch(add(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived, add, taskRequested, taskRequestFailed } =
  actions;

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
