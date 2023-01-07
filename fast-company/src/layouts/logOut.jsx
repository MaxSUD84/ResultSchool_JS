import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// import { useAuth } from "../hooks/useAuth";
import { logOut } from "../store/users";

const LogOut = () => {
    // const { signOut } = useAuth();
    const dispatch = useDispatch();
    useEffect(() => {
        // signOut();
        dispatch(logOut());
    }, []);

    return <h1>Loading</h1>;
};

export default LogOut;
