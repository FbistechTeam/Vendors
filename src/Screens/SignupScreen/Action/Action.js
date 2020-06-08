import {actionType} from './ActionType';

const {
  REGISTER_USER,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  RESEND_CODE,
  SUBMIT_TOKEN,
  VALIDATION_SUCCESS,
  VALIDATION_ERROR,
} = actionType;

export const registerUser = payload => ({
  payload,
  type: REGISTER_USER,
});

export const registrationSuccess = payload => ({
  type: REGISTRATION_SUCCESS,
  payload,
});
export const registrationError = payload => ({
  type: REGISTRATION_ERROR,
  payload,
});
export const resendCode = payload => ({
  type: RESEND_CODE,
  payload,
});
export const submitToken = payload => ({
  type: SUBMIT_TOKEN,
  payload,
});
export const ValidationSuccess = payload => ({
  type: VALIDATION_SUCCESS,
  payload,
});
export const ValidationError = payload => ({
  type: VALIDATION_ERROR,
  payload,
});
