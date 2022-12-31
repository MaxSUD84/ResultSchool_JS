import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  completeTask,
  titleChanged,
  taskDeleted,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  createTask,
} from "./store/task";
import configureStore from "./store/store";
import { getError } from "./store/errors";

const store = configureStore();

const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  //const [state, setState] = useState(store.getState());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
    // store.dispatch(getTasks());
    // store.subscribe(() => {
    //     setState(store.getState());
    // });
  }, []);

  const createTask_ = () => {
    // конструкция добавлена для множественного создания Tasks
    dispatch(createTask(state.slice(-1)[0].id));
    // store.dispatch(titleChanged(taskId));
  };

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

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return (
      <h3>
        Error: <p>{error}</p>
      </h3>
    );
  }

  return (
    <>
      <h1>App</h1>
      <button onClick={() => createTask_()}>CreateTask</button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            {/* <button onClick={() => store.dispatch(completeTask(el.id))}>Completed</button> */}
            <button onClick={() => dispatch(completeTask(el.id))}>
              Completed
            </button>
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
