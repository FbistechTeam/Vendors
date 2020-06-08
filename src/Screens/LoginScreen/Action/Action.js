import {actionType} from './ActionType';

const {
  LOGIN_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  RECOVER_ERROR,
  RECOVER_SUCCESS,
  RECOVER,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD,
  LOGOUT_USER,
  GET_TAILOR_CAT_ID,
  PLAYER_CALLED,
  ONE_SIGNAL,
} = actionType;

export const loginUser = payload => ({
  payload,
  type: LOGIN_USER,
});

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload,
});
export const loginError = payload => ({
  type: LOGIN_ERROR,
  payload,
});
export const recoverPassword = payload => ({
  type: RECOVER,
  payload,
});
export const recoverPasswordSuccess = payload => ({
  type: RECOVER_SUCCESS,
  payload,
});
export const recoverPasswordError = payload => ({
  type: RECOVER_ERROR,
  payload,
});
export const changePasswordError = payload => ({
  type: CHANGE_PASSWORD_ERROR,
  payload,
});
export const changePasswordSuccess = payload => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload,
});
export const changePasswordWithToken = payload => ({
  type: CHANGE_PASSWORD,
  payload,
});
export const logoutUser = payload => ({
  type: LOGOUT_USER,
  payload,
});
export const gettailorid = payload => ({
  type: GET_TAILOR_CAT_ID,
  payload,
});
export const callplayer = payload => ({
  type: PLAYER_CALLED,
  payload,
});
export const signalData = payload => ({
  type: ONE_SIGNAL,
  payload,
});
