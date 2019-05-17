import * as actionTypes from '../actions/actionTypes';
import { immutableUpdateState } from '../utilities/utility';

const initState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = (state, action) => {
  const updateState = { error: null, loading: true };
  return immutableUpdateState(state, updateState);
}

const authSuccess = (state, action) => {
  const updateState = { 
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  };

  return immutableUpdateState(state, updateState);
}

const authFailed = (state, action) => {
  const updateState = { 
    error: action.error,
    loading: false
  };

  return immutableUpdateState(state, updateState);
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAILED: return authFailed(state, action);
    default: return state
  }
};

export default authReducer;
