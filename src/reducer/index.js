import { combineReducers } from "redux";

// Define auth reducer
const authReducer = (state = null, action) => {
    switch (action.type) {
      case 'AUTH_USER':
        // localStorage.setItem("user", JSON.stringify({ ...action?.payload }))
        return { ...state, currentUser: action?.payload}
      default:
        return state;
    }
  };





// Combine reducers
const rootReducer = combineReducers({
    authReducer,
  });

export default rootReducer;