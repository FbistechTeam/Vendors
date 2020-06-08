import {put, takeEvery} from 'redux-saga/effects';
import Instance from '../../Api/Instance';
import {Toast} from 'native-base';

import {actionType} from './Action/ActionType';
import {
  loginUsers,
  loginError,
  loginSuccess,
  recoverPasswordError,
  recoverPasswordSuccess,
  changePasswordSuccess,
  changePasswordError,
} from './Action/Action.js';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const {LOGIN_USER, RECOVER, CHANGE_PASSWORD} = actionType;

const Style = {
  width: widthPercentageToDP('88%'),
  alignSelf: 'center',
  borderRadius: 6,
};
function* LoginUsers({payload}) {
  try {
    const request = yield Instance.post('vendor/login', payload);

    if (request.status === 200) {
      let data = request.data;
      let s = data.status;
      if (!s) {
        let err = data.message;
        Toast.show({
          text: err,
          buttonText: 'Okay',
          position: 'top',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
        yield put(loginError(err));
      } else {
        let m = data.data;
        let me = data.message;
        // console.log(m);
        Toast.show({
          text: me,
          buttonText: 'Okay',
          position: 'top',
          type: 'success',
          duration: 5000,
          style: Style,
        });
        yield put(loginSuccess(m));
      }
    }
  } catch (err) {
    yield put(loginError(err));
    alert('something went wrong, Please check that you are connected');
  }
}
function* PasswordRecovery({payload}) {
  try {
    const request = yield Instance.post(
      'vendor/password/recovery/request',
      payload,
    );

    if (request.status === 200) {
      let data = request.data;
      console.log(data);
      let s = data.status;
      if (!s) {
        let err = data.message;
        Toast.show({
          text: err,
          buttonText: 'Okay',
          position: 'top',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
        yield put(recoverPasswordError(err));
      } else {
        let m = data.message;
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'success',
          duration: 10000,
          style: Style,
        });
        yield put(recoverPasswordSuccess(m));
      }
    }
  } catch (err) {
    console.log(err);
    yield put(recoverPasswordError(err));
    alert('something went wrong, Please check that you are connected');
  }
}

function* ChangePassword({payload}) {
  try {
    const request = yield Instance.put('vendor/password/recovery/set', payload);

    if (request.status === 200) {
      let data = request.data;
      console.log(data);
      let s = data.status;
      if (!s) {
        let err = data.message;
        Toast.show({
          text: err,
          buttonText: 'Okay',
          position: 'top',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
        yield put(changePasswordError(err));
      } else {
        let m = data.message;
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'success',
          duration: 10000,
          style: Style,
        });
        yield put(changePasswordSuccess(m));
      }
    }
  } catch (err) {
    console.log(err);
    yield put(changePasswordError(err));
    alert('something went wrong, Please check that you are connected');
  }
}

export default function* LoginSaga() {
  yield takeEvery(LOGIN_USER, LoginUsers);
  yield takeEvery(RECOVER, PasswordRecovery);
  yield takeEvery(CHANGE_PASSWORD, ChangePassword);
}
