import { put, delay, call } from "redux-saga/effects";
import * as actions from '../actions/index'
import axios from 'axios';
import config from '../../config/config.js'

export function* logoutSaga(action) {
  yield call([localStorage,'removeItem'], 'token');
  yield call([localStorage,'removeItem'], 'expirationDate');
  yield call([localStorage,'removeItem'], 'userId');
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
    const response = yield call(axios.post, authURL, authData)
    const data = response.data
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
    yield call([localStorage,'setItem'], 'token', data.idToken);
    yield call([localStorage,'setItem'], 'expirationDate', expirationDate);
    yield call([localStorage,'setItem'], 'userId', data.localId);
    yield put(actions.authSuccess(data.idToken, data.localId))
    yield put(actions.checkAuthTimeOut(data.expiresIn))
  }catch(error) {
    yield put(action.authFailed(error.response.data.error))
  }
}

export function* authCheckState(action) {
  const token = yield call([localStorage, 'getItem'], 'token');
  if (!token) {
    yield put(actions.logout());
  }else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (new Date() >= expirationDate){
      yield put(actions.logout());
    }else{
      const userId = yield call([localStorage, 'getItem'], 'userId');
      const expirationTime = (expirationDate.getTime() - new Date().getTime()) / 1000
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeOut(expirationTime))
    }
  }
}