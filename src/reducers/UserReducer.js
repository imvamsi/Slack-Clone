import { SET_USER, CLEAR_USER } from "../actions/types";

const initialState = {
  currentUser: null,
  loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        loading: false
      };

    case CLEAR_USER:
      return {
        ...state,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
};
