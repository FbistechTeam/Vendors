import {actionType} from './Action/ActionType';

const {
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  REGISTER_USER,
  VALIDATION_SUCCESS,
  SUBMIT_TOKEN,
  VALIDATION_ERROR,
} = actionType;

const initialState = {
  email: '',
  isLogged: false,
  userData: {},
  userDataInput: {},
  registration: false,
  registrationMessage: '',
  regError: '',
  isError: false,
  logError: '',
  tripDetsOne: {},
  tripDetsTwo: {},
  loading: false,
  token_verified: false,
};

export const SignUpReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case REGISTER_USER:
      return {
        ...state,
        userDataInput: payload,
        registration: false,
        loading: true,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationMessage: payload,
        registration: true,
        loading: false,
      };

    case REGISTRATION_ERROR:
      return {...state, regError: payload, isError: true, loading: false};

    case SUBMIT_TOKEN:
      return {...state, regError: payload, isError: true, loading: true};

    case VALIDATION_SUCCESS:
      return {
        ...state,
        regError: payload,
        isError: true,
        loading: false,
        token_verified: true,
      };
    case VALIDATION_ERROR:
      return {
        ...state,
        regError: payload,
        isError: true,
        loading: false,
        token_verified: true,
      };

    default:
      return state;
  }
};
