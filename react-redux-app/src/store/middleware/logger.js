// export function logger({ getState, dispatch }) {
export function logger(state) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            /*          перехватчик actions
            console.log(next);
            console.log(action);
            if (action.type === "task/update") {
                return dispatch({ type: "task/remove", payload: { ...action.payload } });
            }
*/
            return next(action);
        };
    };
}