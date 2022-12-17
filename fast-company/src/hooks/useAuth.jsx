import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens, getAccessToken } from "../services/localStorage.service";
import axios from "axios";

export const httpAuth = axios.create({
    // baseUrl: `https://identitytoolkit.googleapis.com/v1/`,
    // params: {
    //     key: process.env.REACT_APP_FIREBASE_KEY
    // }
});

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            // const { data } = await httpAuth.post("accounts:signUp", {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                ...rest
            });
            // console.log(data);
        } catch (error) {
            console.log(error);
            errorCather(error);
            const { code, message } = error.response.data.error;
            // console.log(code, message);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(
                // "accounts:signInWithPassword",
                url,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            // console.log(data);
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCather(error);
            const { code, message } = error.response.data.error;
            // console.log(code, message);
            if (code === 400) {
                switch (message) {
                    case "INVALID_PASSWORD":
                        throw {
                            password: "Пароль некорректен"
                        };
                    case "USER_DISABLED":
                        throw {
                            email: "Учетная запись пользователя отключена администратором"
                        };
                    case "EMAIL_NOT_FOUND":
                        throw {
                            email: "Нет пользователя, соответствующего этому идентификатору. Возможно, пользователь был удален."
                        };
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) {
            errorCather(error);
        }
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCather(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
