import * as actionTypes from './actionTypes';

export const storeResult = (result) => {
  const message = { type: actionTypes.STORE_RESULT, result: result};
  return dispatch => {
    setTimeout(() => dispatch(message), 2000);
  }
}

export const deleteResult = (resultId) => {
  return {
    type: actionTypes.DELETE_RESULT,
    resultId: resultId
  }
}