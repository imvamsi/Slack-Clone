import { SET_USER } from "./types";

export const setUser = user => async dispatch => {
  dispatch({
    type: SET_USER,
    payload: {
      currentUser: user
    }
  });
};
