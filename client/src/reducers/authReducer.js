import { FETCH_USER } from "../actions/actions.types";

const initialAuthState = null;

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case FETCH_USER:
      // console.log("auth reducer triggered. Payload: ", action.payload);
      // return action.payload || false    // will return entire payload which may contain sensitive data

      //to pull of only properties we are happy to be inspectable in browser...
      const newState = {
        ...state,
        isLoggedIn: !!action.payload, //if !loggedin, payload is empty string => falsey
        userID: action.payload._id || null,
        credits: action.payload.credits || null
      };
      return newState;
    default:
      // console.log("Default reducer- no matching action: ", action);
      return state;
  }
};

export default authReducer;
