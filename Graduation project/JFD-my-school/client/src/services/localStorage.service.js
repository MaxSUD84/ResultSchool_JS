const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const MENTOR_KEY = "is-mentor-id";
const TEACHER_KEY = "is-teacher-id";

export function setTokens({
  refreshToken,
  accessToken,
  userId,
  expiresIn = 3600,
  isMentor,
  isTeacher,
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  sessionStorage.setItem(USERID_KEY, userId);
  sessionStorage.setItem(TOKEN_KEY, accessToken);
  sessionStorage.setItem(REFRESH_KEY, refreshToken);
  sessionStorage.setItem(EXPIRES_KEY, expiresDate);
  sessionStorage.setItem(MENTOR_KEY, isMentor);
  sessionStorage.setItem(TEACHER_KEY, isTeacher);
}
export function getAccessToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
  return sessionStorage.getItem(REFRESH_KEY);
}
export function removeAuthData() {
  sessionStorage.removeItem(USERID_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
  sessionStorage.removeItem(EXPIRES_KEY);
  sessionStorage.removeItem(MENTOR_KEY);
  sessionStorage.removeItem(TEACHER_KEY);
}

export function getTokenExpiresDate() {
  return sessionStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
  if (!sessionStorage.getItem(USERID_KEY)) return "";
  return {
    isMentor: sessionStorage.getItem(MENTOR_KEY) === "true" ? true : false,
    isTeacher: sessionStorage.getItem(TEACHER_KEY) === "true" ? true : false,
    userId: sessionStorage.getItem(USERID_KEY),
  };
}
const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
};
export default localStorageService;
