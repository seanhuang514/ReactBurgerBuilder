import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {
  logoutSaga,
  checkAuthTimeOut,
  authUserSaga,
  authCheckState
} from './authSaga';

import {
  initIngredients
} from './burgerBuilderSaga'

import {
  purchaseBurger,
  fetchOrders
} from './ordersSaga'


export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIME_OUT, checkAuthTimeOut);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_INITIATE_STATE, authCheckState);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredients);
}

export function* watchOrders() {
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurger);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrders);
}
