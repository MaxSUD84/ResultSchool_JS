import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

const LogOutButton = ({ onLogOut }) => {
    useEffect(() => {
        console.log("Render button");
    });

    return (
        <button className="btn btn-primary mx-2" onClick={onLogOut}>
            LogOut
        </button>
    );
};

LogOutButton.propTypes = {
    onLogOut: PropTypes.func
};

function areEqual(prProps, nxProps) {
    if (prProps.onLogOut !== nxProps.onLogOut) return false;
    else return true;
}
const MemoizedLogOutButton = React.memo(LogOutButton, areEqual);

const MemoWithUseCallbackExample = (props) => {
    const [state, setState] = useState(false);
    const handleLogOut = useCallback(() => {
        localStorage.removeItem("auth");
    }, [props]);

    return (
        <>
            <button
                className="btn btn-primary mx-2"
                onClick={() => setState(!state)}
            >
                initiate rerender
            </button>
            <MemoizedLogOutButton onLogOut={handleLogOut} />
        </>
    );
};

export default MemoWithUseCallbackExample;
