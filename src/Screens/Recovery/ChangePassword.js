import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';

import Icon from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Inputs from '../../components/Inputs';
import {RecoverInput, RecoverTokenInput} from './RecoverInput';
import {
  recoverPassword,
  changePasswordWithToken,
} from '../LoginScreen/Action/Action';

const ChangePassword = ({navigation}) => {
  const [values, setValues] = useState({});
  const [show, setShow] = useState(true);
  const {loading, changed} = useSelector(state => state.LoginReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (changed) {
      navigation.navigate('LoginScreen');
    }
  }, [navigation, changed]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.big} />
        <View onTouchStart={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.cancel}>X</Text>
        </View>
        <View style={styles.recover}>
          <View style={styles.middle}>
            <Text style={styles.header}>Change Password</Text>
            {RecoverTokenInput.map(data => {
              return (
                <Inputs
                  placeholder={data.placeholder}
                  color={'green'}
                  status={show}
                  textChange={value => {
                    let input = data.name;
                    setValues({
                      ...values,
                      [input]: value,
                    });
                  }}
                />
              );
            })}
            <TouchableOpacity
              style={styles.p}
              onPress={() => {
                setShow(!show);
              }}>
              <Icon
                name={!show ? 'eye-off' : 'eye'}
                size={20}
                color="#5CE3D9"
              />
            </TouchableOpacity>
            <Button
              title="Change Password"
              buttonStyle={loading ? styles.buttonGray : styles.button}
              titleStyle={styles.btnTxt}
              onPress={() => {
                dispatch(changePasswordWithToken(values));
              }}
              loading={loading}
            />
          </View>
          <View style={styles.small} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  big: {
    height: 133,
    width: 133,
    // borderBottomEndRadius: 133,
    borderBottomLeftRadius: 133,
    backgroundColor: 'rgba(92, 227, 217, 1)',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    position: 'absolute',
    right: 0,
  },
  cancel: {
    fontSize: 30,
    color: '#fff',
    marginLeft: 'auto',
    padding: 30,
    zIndex: 10000,
  },
  recover: {
    alignItems: 'center',
    // marginTop: '14%',
    // marginHorizontal: '17%',
  },
  logoTxt: {
    color: '#3D7782',

    textAlign: 'center',
  },
  BtnContainer: {
    // marginTop: '28%',
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    width: 160,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  buttonGray: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#707070',
    width: 160,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  btnTxt: {
    color: 'rgba(61, 119, 130, 1)',
    fontSize: 14,
  },
  middle: {
    height: hp('100%'),
    justifyContent: 'center',
  },
  bottomText: {
    color: '#3D7782',
    marginTop: '5%',
    textAlign: 'center',
    borderBottomColor: '#5CE3D9',
    borderBottomWidth: 1,
    width: 158,
    alignSelf: 'center',
    paddingBottom: 6.5,
  },
  small: {
    height: 54,
    width: 54,
    backgroundColor: '#5CE3D9',
    borderRadius: 50,
    position: 'absolute',
    top: hp('78%'),
    left: 40,
  },
  header: {
    color: '#5CE3D9',
    fontSize: hp('3%'),
    paddingBottom: hp('8%'),
    textAlign: 'center',
    // width: wp('40%'),
  },
  p: {
    position: 'absolute',
    top: hp('54%'),
    right: wp('0%'),
  },
});
