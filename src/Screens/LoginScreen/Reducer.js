import {actionType} from './Action/ActionType';
import AsyncStorage from '@react-native-community/async-storage';

const {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_USER,
  RECOVER,
  RECOVER_ERROR,
  RECOVER_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  LOGOUT_USER,
  GET_TAILOR_CAT_ID,
  PLAYER_CALLED,
  ONE_SIGNAL,
} = actionType;

const initialState = {
  isLogged: false,
  userData: {},
  userDataInput: {},
  isError: false,
  recovered: false,
  loading: false,
  tailor_category_id: 0,
  playerCalled: false,
  signal: false,
  Notification: null,
};

export const LoginReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        userDataInput: payload,
        loading: true,
        isLogged: false,
      };

    case LOGIN_SUCCESS:
      AsyncStorage.setItem('@UserData', JSON.stringify(payload));
      return {
        ...state,
        userData: payload,
        isLogged: true,
        loading: false,
      };

    case LOGIN_ERROR:
      return {...state, isLogged: false, loading: false};

    case RECOVER:
      return {...state, loading: true, recoverd: false};

    case RECOVER_SUCCESS:
      return {...state, loading: false, recovered: true};

    case RECOVER_ERROR:
      return {...state, loading: false, recoverd: false};

    case CHANGE_PASSWORD:
      return {...state, loading: true, changed: false};

    case CHANGE_PASSWORD_ERROR:
      return {...state, loading: false, changed: false};

    case CHANGE_PASSWORD_SUCCESS:
      return {...state, loading: false, changed: true};

    case GET_TAILOR_CAT_ID:
      return {...state, loading: false, tailor_category_id: payload};

    case PLAYER_CALLED:
      return {...state, playerCalled: true};

    case ONE_SIGNAL:
      return {...state, signal: true, Notification: payload};

    case LOGOUT_USER:
      return {
        ...state,
        isLogged: false,
        userData: {},
        userDataInput: {},
        isError: false,
        recovered: false,
        loading: false,
        playerCalled: false,
      };

    default:
      return state;
  }
};
