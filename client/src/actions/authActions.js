import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register user
export const registerUser = (userData, history) => {
  return function(dispatch) {
    axios
      .post("api/users/register", userData)
      .then(res => history.push("/login"))
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};

// Login - get user token
export const loginUser = userData => {
  return function(dispatch) {
    axios
      .post("/api/users/login", userData)
      .then(res => {
        // Save to local storage
        const { token } = res.data;

        // Set token to local storage
        localStorage.setItem("jwtToken", token);

        // Set token to Auth header
        setAuthToken(token);

        // Decode token to get user data
        const decoded = jwt_decode(token);

        // Set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log User out
export const logoutUser = () => {
  return function(dispatch) {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");

    // Remove auth header for future requests
    setAuthToken(null);

    // Set the current user to {} which will also set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };
};
