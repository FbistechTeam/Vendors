import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Logo from '../../../assets/Logo.svg';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {VerificationInput} from './SignUpInputs';
import Inputs from '../../components/Inputs';
import {Button} from 'react-native-elements';
import {resendCode, submitToken} from './Action/Action';

const VerificationScreen = ({route, navigation}) => {
  const [values, setValues] = useState({});
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const {loading, userDataInput, token_verified} = useSelector(
    state => state.SignUpReducer,
  );

  useEffect(() => {
    if (token_verified) {
      navigation.navigate('LoginScreen');
    }
  }, [navigation, token_verified]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.Os == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
        enabled>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.big} />
          <View style={styles.group}>
            <View style={styles.logo}>
              <Logo />
            </View>
            <View style={styles.inputContainer}>
              {VerificationInput.map(data => {
                return (
                  <Inputs
                    key={data.placeholder}
                    placeholder={data.placeholder}
                    status={show}
                    textChange={value => {
                      let input = data.name;

                      setValues({
                        ...values,
                        email: userDataInput.email,
                        [input]: value,
                      });
                    }}
                  />
                );
              })}
              <TouchableOpacity
                onPress={() => {
                  const data = {email: userDataInput.email};
                  dispatch(resendCode(data));
                }}>
                <Text style={styles.Resend}>Click here to resend Code</Text>
              </TouchableOpacity>
            </View>

            <Button
              title="Sign Up"
              buttonStyle={styles.button}
              titleStyle={styles.btnTxt}
              onPress={() => {
                console.log(values);
                dispatch(submitToken(values));
              }}
              loading={loading ? true : false}
            />
          </View>
          <View style={styles.small} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    // flex: 1,
    height: heightPercentageToDP('100%'),
    // justifyContent: 'center',
  },
  big: {
    height: 133,
    width: 133,
    backgroundColor: '#5CE3D9',
    borderBottomRightRadius: 133,
    position: 'absolute',
    top: 0,
  },
  logo: {
    width: 126,
    height: 71,
  },
  group: {
    alignItems: 'center',
    height: heightPercentageToDP('75%'),
    marginTop: heightPercentageToDP('10%'),
    justifyContent: 'space-between',
  },
  inputContainer: {
    height: heightPercentageToDP('10.5%'),
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#5CE3D9',
    width: 160,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnTxt: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  small: {
    height: 54,
    width: 54,
    backgroundColor: '#5CE3D9',
    borderRadius: 50,
    position: 'absolute',
    top: heightPercentageToDP('83%'),
    left: widthPercentageToDP('78%'),
  },
  p: {
    position: 'absolute',
    top: heightPercentageToDP('49%'),
    right: widthPercentageToDP('17%'),
  },
  Resend: {
    color: '#5ce3d9',
    fontSize: heightPercentageToDP('2.015%'),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#5ce3d9',
    padding: 5,
  },
});
