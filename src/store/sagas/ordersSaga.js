import { call, put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* purchaseBurger(action) {
  yield put(actions.purchaseBurgerStart());

  try {
    const response = yield call(
      axios.post,
      '/orders.json?auth=' + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    put(actions.purchaseBurgerFailed(error));
  }
}

export function* fetchOrders(action) {
  yield put(actions.fetchOrdersStart());

  try {
    const path = `/orders.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`

    const response = yield call(axios.get, path);
    const orders = []
    for(let key in response.data) {
      orders.push({
        id: key,
        ...response.data[key]
      });
    }
    yield put(actions.fetchOrdersSuccess(orders))
  } catch (error) {
    yield put(actions.fetchOrdersSuccess(error.data))
  }
}
