import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

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
