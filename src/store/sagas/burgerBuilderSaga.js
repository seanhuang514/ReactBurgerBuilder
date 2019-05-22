import axios from '../../axios-orders'
import { call, put } from 'redux-saga/effects'
import * as actions from '../actions/index'

export function* initIngredients(action) {
  try {
    const response = yield call(axios.get, '/ingredients.json');
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}