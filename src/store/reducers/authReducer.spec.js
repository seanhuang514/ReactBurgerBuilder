import reducer from './authReducer';
import * as actionTypes from '../actions/actionTypes';

describe('auth Reducer', () => {
  
  it('should return the initialize state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false
    });
  });

  it('should store the token upon login', () => {
    const action = {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'idToken',
      userId: 'userId'
    }
    
    expect(reducer(undefined, action)).toEqual({
      token: 'idToken',
      userId: 'userId',
      error: null,
      loading: false
    })
  });
});