import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: false },
    { id: 3, title: "Task 3", completed: false },
];

// import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
// const update = createAction("task/updated");
// const remove = createAction("task/removed");

export function taskCompleted(id) {
    return update({ id, completed: true });
}

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
        update(state, action) {
            const elementIndex = state.findIndex((el) => el.id === action.payload.id);
            state[elementIndex] = { ...state[elementIndex], ...action.payload };
            // return newArray;
        },
        remove(state, action) {
            return [...state].filter((el) => el.id !== action.payload.id);
        },
    },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove } = actions;

export default taskReducer;
