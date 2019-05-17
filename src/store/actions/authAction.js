import * as actionType from './actionTypes'

export const authStart = () => {
  return {
    type: actionType.AUTH_START
  }
}

export const authSuccess = (authData) => {
   return {
     type: actionType.AUTH_SUCCESS,
     authData: authData
   }
}

export const authFailed = (error) => {
  return {
    type: actionType.AUTH_FAILED,
    error: error
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
  }
}