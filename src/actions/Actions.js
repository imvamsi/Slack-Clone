import { SET_USER, CLEAR_USER, SET_CURRENT_CHANNEL } from "./types";

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

export const setCurrentChannel = channel => {
  return {
    type: SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel
    }
  };
};

// export const setCurrentChannel = channel => async dispatch => {
//   dispatch({
//     type: SET_CURRENT_CHANNEL,
//     payload: {
//       currentChannel: channel
//     }
//   });
//   };

// export function setCurrency() {
//   return function(dispatch) {
//     return axios
//       .get("some-url")
//       .then(responseData => {
//         dispatch(setCurrencysuccess(responseData));
//       })
//       .catch((error) => {
//         dispatch(setCurrencyErro(responseData));
//       });
//   };
// }

// export function setCurrencysuccess(){
//   return {
//     type: SET_CURRENT_CHANNEL,
//     payload: {
//       currentChannel: channel
//     }
//   };
// }
