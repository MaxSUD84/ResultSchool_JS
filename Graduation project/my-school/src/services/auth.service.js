import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const API_URL = "/api/auth/";
const signUp = (username, email, password) => {
  localStorageService.removeAuthData();
  return httpService
    .post(API_URL + "signup", {
      username,
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        localStorageService.setTokens(response.data);
      }
      return response;
    });
};
const login = (email, password) => {
  localStorageService.removeAuthData();
  return httpService
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        localStorageService.setTokens(response.data);
      }
      return response;
    });
};
const logout = () => {
  // localStorage.removeItem("user");
  localStorageService.removeAuthData();
};

const refresh = async () => {
  const { data } = await httpService.post("token", {
    // grant_type: "refresh_token",
    refresh_token: localStorageService.getRefreshToken(),
  });
  return data;
};

const authService = {
  signUp,
  login,
  logout,
  refresh,
};
export default authService;
