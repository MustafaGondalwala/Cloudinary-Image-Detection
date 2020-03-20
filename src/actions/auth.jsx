import { USER_LOGGED_IN, USER_LOGGED_OUT,FILE_CREATED } from "../types";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const newFileCreate = files => ({
  type: FILE_CREATED,
  files
})

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.CloudinaryImageApp = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem("CloudinaryImageApp");
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};

export const fileCreated = files => dispatch => {
  dispatch(newFileCreate(files))
}

export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.CloudinaryImageApp = user.token;
    dispatch(userLoggedIn(user));
  });