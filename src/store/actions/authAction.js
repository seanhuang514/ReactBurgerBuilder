import * as actionType from './actionTypes';
import axios from 'axios';
import config from '../../config/config';

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
    
    const authURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=[${config.firebase.apiKey}]`
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    axios
      .post(authURL, authData)
      .then(response => {
        console.log('[auth]', response);
        dispatch(authSuccess(response.data))
      })
      .catch(error => {
        dispatch(authFailed(error))
      })
    
  }
}