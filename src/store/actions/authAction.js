import * as actionType from './actionTypes';

export const authStart = () => {
  return {
    type: actionType.AUTH_START
  }
}

export const authSuccess = (idToken, userId) => {
   return {
     type: actionType.AUTH_SUCCESS,
     idToken: idToken,
     userId: userId
   }
}

export const authFailed = (error) => {
  return {
    type: actionType.AUTH_FAILED,
    error: error
  }
}

export const logout = () => {
  return {
    type: actionType.AUTH_INITIATE_LOGOUT
  }
}

export const logoutSuccess = () => {
  return {
    type: actionType.AUTH_LOGOUT
  }
}

export const checkAuthTimeOut = (expirationTime) => {
  return {
    type: actionType.AUTH_CHECK_TIME_OUT,
    expirationTime: expirationTime
  }
}


export const auth = (email, password, isSignUp) => {
  return {
    type: actionType.AUTH_USER,
    email: email,
    password: password,
    isSignUp: isSignUp
  }
}

export const authCheckState = () => {
  return {
    type: actionType.AUTH_CHECK_INITIATE_STATE
  }
}