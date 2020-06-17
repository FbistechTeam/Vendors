import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import Logo from '../../../assets/LogoBlack.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SignUp = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.big} />
        <TouchableOpacity>
          <Text style={styles.cancle}>X</Text>
        </TouchableOpacity>
        <View style={styles.logo}>
          <Logo />
          <View style={styles.middle}>
            <Text style={styles.logoTxt}>Sign Up Now!</Text>
            <View style={styles.viewBtn}>
              <Button
                title="Measurer"
                buttonStyle={styles.button}
                titleStyle={styles.btnTxt}
                onPress={() => {
                  navigation.navigate('SignUpScreen', {
                    id: 1,
                  });
                  // navigation.navigate('Measurer');
                }}
              />
              <Button
                title="Fashion Designer"
                buttonStyle={styles.button}
                titleStyle={styles.btnTxt}
                onPress={() => {
                  navigation.navigate('SignUpScreen', {
                    id: 2,
                  });
                  // navigation.navigate('Tailor');
                }}
              />
              <Button
                title="Retailer"
                buttonStyle={styles.button}
                titleStyle={styles.btnTxt}
                onPress={() => {
                  // navigation.navigate('Vendor');
                  navigation.navigate('SignUpScreen', {id: 3});
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}>
              <Text style={styles.bottomText}>Already have an account</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.small} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

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
  cancle: {
    fontSize: 30,
    color: '#fff',
    marginLeft: 'auto',
    padding: 30,
  },
  logo: {
    alignItems: 'center',
    marginTop: '14%',
    // marginHorizontal: '17%',
  },
  logoTxt: {
    color: '#000',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    textAlign: 'center',
  },
  BtnContainer: {
    // marginTop: '28%',
  },
  button: {
    backgroundColor: '#000',
    width: wp('42.6%'),
    height: hp('6.74%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  btnTxt: {
    color: '#fff',
    fontSize: hp('2.187%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  viewBtn: {
    height: hp('33.4%'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  middle: {
    height: hp('55%'),
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  bottomText: {
    color: '#000',
    marginTop: '5%',
    textAlign: 'center',
    borderBottomColor: '#5CE3D9',
    borderBottomWidth: 1,
    width: 168,
    alignSelf: 'center',
    paddingBottom: 6.5,
    fontFamily: 'GT Walsheim Pro Regular Regular',
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
});
