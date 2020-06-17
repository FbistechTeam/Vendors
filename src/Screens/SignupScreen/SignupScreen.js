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
import {SignUpInput} from './SignUpInputs';
import Inputs from '../../components/Inputs';
import {Button} from 'react-native-elements';
import {registerUser} from './Action/Action';
import Icon from 'react-native-vector-icons/Feather';

const SignupScreen = ({route, navigation}) => {
  const [values, setValues] = useState({});
  const [show, setShow] = useState(true);
  const {id} = route.params;
  const {loading, registration} = useSelector(state => state.SignUpReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    if (registration) {
      navigation.navigate('Verification');
    }
  }, [navigation, registration]);

  const propOwn = Object.getOwnPropertyNames(values);

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
              {SignUpInput.map(data => {
                return (
                  <Inputs
                    key={data.placeholder}
                    placeholder={data.placeholder}
                    status={show}
                    textChange={value => {
                      let input = data.name;

                      setValues({
                        ...values,
                        vendor_category_id: id,
                        [input]: value,
                      });
                    }}
                  />
                );
              })}
            </View>
            <TouchableOpacity
              style={styles.p}
              onPress={() => {
                setShow(!show);
              }}>
              <Icon name={!show ? 'eye-off' : 'eye'} size={20} color="#fff" />
            </TouchableOpacity>

            <Button
              title="Sign Up"
              buttonStyle={styles.button}
              titleStyle={styles.btnTxt}
              disabled={propOwn.length < 5 ? true : false}
              onPress={() => {
                dispatch(registerUser(values));
              }}
              loading={loading}
            />
          </View>
          <View style={styles.small} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;

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
    height: heightPercentageToDP('25.5%'),
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
});
