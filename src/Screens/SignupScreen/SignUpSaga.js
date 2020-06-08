import {put, takeEvery} from 'redux-saga/effects';
import Instance from '../../Api/Instance';
import {Toast} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {actionType} from './Action/ActionType';
import {
  registrationSuccess,
  registrationError,
  ValidationSuccess,
} from './Action/Action.js';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const {REGISTER_USER, RESEND_CODE, SUBMIT_TOKEN} = actionType;

const Style = {
  width: widthPercentageToDP('88%'),
  alignSelf: 'center',
  borderRadius: 6,
};
function* registerUsers({payload}) {
  try {
    const request = yield Instance.post('vendor/register', payload);

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
        yield put(registrationError(err));
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
        yield put(registrationSuccess(m));
      }
    }
  } catch (err) {
    console.log(err);
    yield put(registrationError(err));
    alert('something went wrong, Please check that you are connected');
  }
}
function* resendVerification({payload}) {
  try {
    const request = yield Instance.put(
      'vendor/registration/token/resend',
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
        yield put(registrationError(err));
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
        // yield put(registrationError(err));
      }
    }
  } catch (err) {
    console.log(err);
    yield put(registrationError(err));
    alert('something went wrong, Please check that you are connected');
  }
}
function* verifyToken({payload}) {
  try {
    const request = yield Instance.put('vendor/registration/confirm', payload);

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
        yield put(registrationError(err));
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
        yield put(ValidationSuccess(m));
      }
    }
  } catch (err) {
    console.log(err);
    yield put(registrationError(err));
    alert('something went wrong, Please check that you are connected');
  }
}

export default function* SignUpSaga() {
  yield takeEvery(REGISTER_USER, registerUsers);
  yield takeEvery(RESEND_CODE, resendVerification);
  yield takeEvery(SUBMIT_TOKEN, verifyToken);
}
