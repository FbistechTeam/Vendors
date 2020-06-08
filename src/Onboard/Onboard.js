import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Logo from '../../assets/Logo and Tag.svg';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

const Onboard = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              navigation.navigate('OnboardCarousel');
              // oneSignal();
            }}>
            <View style={styles.button}>
              <Text style={styles.text}>Get Started</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#fff',
    width: widthPercentageToDP('42%'),
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    marginBottom: 30.06,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: '#3D7984',
    fontSize: heightPercentageToDP('2.18%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  logo: {
    paddingVertical: '25%',
    alignSelf: 'center',
  },
});
