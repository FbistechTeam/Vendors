import {combineReducers} from 'redux';
import {SignUpReducer} from '../Screens/SignupScreen/Reducer';
import {LoginReducer} from '../Screens/LoginScreen/Reducer';

export const rootReducer = combineReducers({
  SignUpReducer,
  LoginReducer,
});
