import { SET_CURRENT_CHANNEL } from "../actions/types";

const initialState = {
  currentChannel: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      };

    default:
      return {
        ...state
      };
  }
};
