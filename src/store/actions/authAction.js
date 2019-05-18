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

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionType.AUTH_LOGOUT
  }
}

export const checkAuthTimeOut = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
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
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
        // console.log('[auth-data]', data);
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', data.localId);
        dispatch(authSuccess(data.idToken, data.localId))
        dispatch(checkAuthTimeOut(data.expiresIn))
      })
      .catch(error => {
        dispatch(authFailed(error.response.data.error))
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    }else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (new Date() > expirationDate){
        dispatch(logout());
      }else{
        const userId = localStorage.getItem('userId')
        const expirationTime = expirationDate.getSeconds() - new Date().getSeconds()
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeOut(expirationTime))
      }
    }
  }
}