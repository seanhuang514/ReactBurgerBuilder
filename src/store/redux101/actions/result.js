import * as actionTypes from './actionTypes';

/* thunk middleware */
export const storeResult = (result) => {
  const message = { type: actionTypes.STORE_RESULT, result: result};
  return (dispatch, getState) => {
    setTimeout(() => {
      const oldState = getState();
      console.log('[storeResult][getState]', oldState); // { counter: { counter: 1 } }
      dispatch(message)
    }, 2000);
  }
}

/* normal action */
export const deleteResult = (resultId) => {
  return {
    type: actionTypes.DELETE_RESULT,
    resultId: resultId
  }
}