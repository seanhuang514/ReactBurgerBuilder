import { put, delay } from "redux-saga/effects";
import * as actions from '../actions/index'
import axios from 'axios';
import config from '../../config/config.js'

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSuccess());
}

export function* checkAuthTimeOut(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());

  let authURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${config.firebase.apiKey}`
  if(!action.isSignUp) {
    authURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${config.firebase.apiKey}`
  }

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }

  try {
    const response = yield axios.post(authURL, authData)
    const data = response.data
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', data.localId);
    put(actions.authSuccess(data.idToken, data.localId))
    put(actions.checkAuthTimeOut(data.expiresIn))
  }catch(error) {
    put(action.authFailed(error.response.data.error))
  }
}