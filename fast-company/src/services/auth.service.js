import axios from "axios";
import localStorageService from "./localStorage.service";
// import configFile from "../config.json";
// import httpService from "./http.service";

const urlSingUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
const urlLogIn = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
const urlToken = `https://identitytoolkit.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_KEY}`;
// const userEndpoint = `${configFile.apiEndpoint}` + "user/";
// const userEndpoint = "user/";

const httpAuth = axios.create({
    // baseUrl: `https://identitytoolkit.googleapis.com/v1/`,
    // params: {
    //     key: process.env.REACT_APP_FIREBASE_KEY
    // }
});

const authService = {
    register: async ({ email, password }) => {
        const { data } = await httpAuth.post(urlSingUp, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post(urlLogIn, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post(urlToken, {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
    // update: async (userData) => {
    //     const { data } = await httpService.patch(
    //         userEndpoint + userData._id,
    //         userData
    //     );
    //     return data;
    // }
};

export default authService;
