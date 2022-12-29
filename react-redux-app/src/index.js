import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { taskCompleted, titleChanged, taskDeleted, getTasks } from "./store/task";
import configureStore from "./store/store";
import { completeTask } from "./store/task";

const store = configureStore();

const App = (params) => {
    const state = useSelector((state) => state);
    //const [state, setState] = useState(store.getState());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks());
        // store.dispatch(getTasks());
        // store.subscribe(() => {
        //     setState(store.getState());
        // });
    }, []);

    // const completeTask = (taskId) => {
    //     store.dispatch((dispatch, getState) => {
    //         console.log(dispatch);
    //         console.log(getState);
    //         store.dispatch(taskCompleted(taskId));
    //     });
    // };

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
        // store.dispatch(titleChanged(taskId));
    };

    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId));
        // store.dispatch(taskDeleted(taskId));
    };

    return (
        <>
            <h1>App</h1>

            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Completed: ${el.completed}`}</p>
                        {/* <button onClick={() => store.dispatch(completeTask(el.id))}>Completed</button> */}
                        <button onClick={() => dispatch(completeTask(el.id))}>Completed</button>
                        <button onClick={() => changeTitle(el.id)}>ChangeTitle</button>
                        <button onClick={() => deleteTask(el.id)}>DeleteTask</button>
                        <hr />
                    </li>
                ))}
            </ul>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
