import * as serviceWorker from './serviceWorker';


import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from './App';
import rootReducer from "./rootReducer";
import decode from "jwt-decode";
import { userLoggedIn } from "./actions/auth";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);


if (localStorage.CloudinaryImageApp) {
  const payload = decode(localStorage.CloudinaryImageApp);

  const user = {
    token: localStorage.CloudinaryImageApp,
    email: payload.email,
    username: payload.username,
    id:payload.id,
    confirmed: payload.confirmed
  };
  setAuthorizationHeader(localStorage.CloudinaryImageApp);
  store.dispatch(userLoggedIn(user));
}



ReactDOM.render(
	<BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
