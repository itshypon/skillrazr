import React from "react";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import analytics from "./init-firebase";
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducer'
import { Provider } from "react-redux";
import { setUser } from "./actions/actions";

const store = createStore(rootReducer , compose(applyMiddleware(thunk)) )

// Check for user's login state on page refresh
// const user = localStorage.getItem('user');
// if (user) {
//   const parsedUser = JSON.parse(user);
//   store.dispatch(setUser(parsedUser));
// }

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
console.log(analytics);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
