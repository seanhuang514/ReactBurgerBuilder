import { takeEvery } from 'redux-saga/effects'
import { logoutSaga, checkAuthTimeOut, authUserSaga } from './authSaga';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIME_OUT, checkAuthTimeOut);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}
