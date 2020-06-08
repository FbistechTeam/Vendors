import {all} from 'redux-saga/effects';
import SignUpSaga from '../Screens/SignupScreen/SignUpSaga';
import LoginSaga from '../Screens/LoginScreen/LoginSaga';

export default function* rootSaga() {
  yield all([SignUpSaga(), LoginSaga()]);
}
