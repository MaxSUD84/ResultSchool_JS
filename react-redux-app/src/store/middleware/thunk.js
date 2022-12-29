export function thunk({ getState, dispatch }) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            /*          перехватчик actions
            console.log(next);
            console.log(action);
            if (action.type === "task/update") {
                return dispatch({ type: "task/remove", payload: { ...action.payload } });
            }
*/
            if (typeof action === "function") {
                action(dispatch, getState);
            } else {
                return next(action);
            }
        };
    };
}
