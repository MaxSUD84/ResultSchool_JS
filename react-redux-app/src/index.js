import React from "react";
import ReactDOM from "react-dom/client";
import { compose, pipe } from "lodash/fp";

function taskReducer(state, action) {
    switch (action.type) {
        case "task/completed":
            const newArray = [...state];
            const elementIndex = newArray.findIndex((el) => el.id === action.payload.id);
            newArray[elementIndex].completed = true;
            return newArray;

        default:
            break;
    }
}

function createStore(reducer, initialState) {
    let state = initialState;

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action);
    }
    return { getState, dispatch };
}

const store = createStore(taskReducer, [{ id: 1, description: "Task 1", completed: false }]);

const App = (params) => {
    // const x = 2;
    // const double = (number) => number * 2;
    // const square = (number) => number * number;
    // const half = (number) => number / 2;

    // // const divide = (num1, num2) => num1 / num2;
    // // каррирование - раскладывание сложной фунции от множества аргументов к функции от одного аргумента f(a,b,c) = f(a)(b)(c)
    // const divide = (num2) =>
    //     function (num1) {
    //         return num1 / num2;
    //     };
    // const mathCalculate = pipe(double, square, half, divide(3));
    // return <h1>{mathCalculate(x)}</h1>;
    console.log(store.getState());
    const completeTask = () => {
        store.dispatch({ type: "task/completed", payload: { id: 1 } });
        console.log(store.getState());
    };

    return (
        <>
            <h1>App</h1>
            <button onClick={completeTask}>Completed</button>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
