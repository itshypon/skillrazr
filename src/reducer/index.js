import { combineReducers } from "redux";

// Define auth reducer
const authReducer = (state = null, action) => {
    switch (action.type) {
      case 'AUTH_USER':
        localStorage.setItem("user", JSON.stringify({ ...action?.payload }))
        return { ...state, currentUser: action?.payload}
      case 'LOGOUT':
        localStorage.removeItem("user")
        return { ...state, currentUser: null }
      default:
        return state;
    }
  };

const currentUserReducer = (state = null, action) => {
  switch(action.type){
      case 'FETCH_CURRENT_USER':
          return action.payload;
      default:
          return state;
  }
}

const allInternsReducer = (state=null, action) => {
  switch(action.type){
    case 'ALL_INTERNS':
      return action.payload;
    default:
      return state;
  }
}

const performanceDataReducer = (state=null, action) => {
  switch(action.type){
    case 'INTERN_PERFORMANCE_DATA':
      return action.payload;
    default:
      return state;
  }
}


// Combine reducers
const rootReducer = combineReducers({
    authReducer, currentUserReducer, allInternsReducer, performanceDataReducer,
  });

export default rootReducer;