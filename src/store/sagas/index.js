import { takeEvery, all, takeLatest } from 'redux-saga/effects';
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
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIME_OUT, checkAuthTimeOut),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_INITIATE_STATE, authCheckState)
  ])
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredients);
}

export function* watchOrders() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurger);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrders);
}
