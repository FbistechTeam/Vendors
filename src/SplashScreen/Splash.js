import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import SplashLogo from '../../assets/Group2758.svg';

const Splash = ({navigation}) => {
  const {loading, userData, isLogged} = useSelector(
    state => state.LoginReducer,
  );

  useEffect(() => {
    if (isLogged) {
      let reg_type = userData.profile.reg_type_id;
      let reg_type2 = userData.profile.vendor_category_id;

      if (reg_type == 1 || reg_type2 == 1) {
        navigation.navigate('Measurer');
      } else if (reg_type == 2 || reg_type2 == 2) {
        navigation.navigate('Tailor');
      } else if (reg_type == 3 || reg_type2 == 3) {
        navigation.navigate('Vendor');
      } else {
        null;
      }
    } else {
      setTimeout(() => {
        navigation.navigate('Onboard');
      }, 3000);
    }
    // setTimeout(() => {
    //   navigation.navigate('Onboard');
    // }, 3000);
  }, [isLogged, navigation, userData]);
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle="dark-content" hidden backgroundColor="#000" />
      <View style={styles.image}>
        <SplashLogo />
        <Text style={styles.txt}>Vendor</Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#000000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 20,
  },
});
