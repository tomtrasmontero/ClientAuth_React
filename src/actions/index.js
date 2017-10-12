import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './type';

const ROOT_URL = 'http://localhost:3090';

export function singinUser({ email, password}) {
  return function(dispatch) {
    // submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // if request is good, update state to indicate is authenticated
        dispatch({ type: AUTH_USER})
        // save the jwt token
        // localStorage is native scope so no need to export it.  to set data use
        // .setItem, key/name of the data "token", and the value to be saved
        localStorage.setItem('token', response.data.token);
        // redirect to the route /feature
        browserHistory.push('/feature');
      })
      .catch(() => {
        // if request is bad
        // show an error to the user
        dispatch(authError('Username/Password does not match'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(err => {
        dispatch(authError(err.response.data.error));
      });
  }
}

export function authError(errorString) {
  return {
    type: AUTH_ERROR,
    payload: errorString,
  };
}

export function signoutUser() {
  // need to remove token when user signout
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    // second argument is to add header to the request
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message,
        })
      })
      .catch(err => console.log(err));
  }
}
