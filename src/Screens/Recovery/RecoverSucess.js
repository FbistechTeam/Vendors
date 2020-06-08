import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../../assets/Logo.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Inputs from '../../components/Inputs';
import {RecoverInput} from './RecoverInput';

const RecoverSuccess = ({navigation}) => {
  return (
    <View style={{backgroundColor: '#000', flex: 1}}>
      <SafeAreaView>
        <View style={styles.container}>
          <Animated.View style={styles.big} />
          <View onTouchStart={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.cancel}>X</Text>
          </View>
          <View style={styles.recover}>
            <View style={styles.middle}>
              <Text style={styles.response}>
                A recovery link has been sent to ******@gmail.com
              </Text>
              <Button
                title="Continue"
                buttonStyle={styles.button}
                titleStyle={styles.btnTxt}
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}
              />
            </View>
            <View style={styles.small} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RecoverSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
  },
  big: {
    height: 133,
    width: 133,
    // borderBottomEndRadius: 133,
    borderRadius: 133,
    backgroundColor: 'rgba(92, 227, 217, 1)',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    position: 'absolute',
    right: -40,
    top: -40,
  },
  cancel: {
    fontSize: 30,
    color: '#fff',
    marginLeft: 'auto',
    padding: 20,
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
    borderRadius: 6,
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
  response: {
    width: wp('53%'),
    textAlign: 'center',
    fontSize: 16,
    color: '#5CE3D9',
  },
});
