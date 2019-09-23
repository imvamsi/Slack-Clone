import { SET_USER, CLEAR_USER } from "./types";

export const setUser = user => async dispatch => {
  dispatch({
    type: SET_USER,
    payload: {
      currentUser: user
    }
  });
};

export const clearUser = () => async dispatch => {
  dispatch({
    type: CLEAR_USER
  });
};
