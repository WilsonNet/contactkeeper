import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      console.log('Payload', action.payload);
      localStorage.setItem('token', action.payload.token);
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticate: false,
        loading: false,
        user: null,
        error: action.payload
      };
      return {
        ...state,
        ...action.payload,
        isAuthenticate: true,
        loading: false
      };
    default:
      return state;
  }
};
