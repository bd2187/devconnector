import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

// Get Current Profile
export const getCurrentProfile = data => {
  return function(dispatch) {
    dispatch(setProfileLoading());

    return axios
      .get("/api/profile")
      .then(res => {
        dispatch({ type: GET_PROFILE, payload: res });
      })
      .catch(err => {
        dispatch({ type: GET_PROFILE, payload: {} });
      });
  };
};

// Create profile
export const createProfile = (profileData, history) => {
  return function(dispatch) {
    axios
      .post("/api/profile", profileData)
      .then(res => {
        history.push("/dashboard");
      })
      .catch(err => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
