import * as actionType from './actionTypes';
import axios from 'axios';
import config from '../../config/config';

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

export const checkAuthTimeOut = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: actionType.AUTH_LOGOUT })
    }, 2000)
  }
}


export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    
    let authURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${config.firebase.apiKey}`
    if(!isSignUp) {
      authURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${config.firebase.apiKey}`
    }

    // console.log('authURL', authURL)
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    // console.log('authData', authData)
    axios
      .post(authURL, authData)
      .then(response => {
        const data = response.data
        // console.log('[auth-data]', data);
        dispatch(authSuccess(data.idToken, data.localId))
        dispatch(checkAuthTimeOut(response.data.expiresIn))
      })
      .catch(error => {
        dispatch(authFailed(error.response.data.error))
      })
  }
}