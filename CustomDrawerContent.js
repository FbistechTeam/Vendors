import React, {useState} from 'react';
import Profile from './assets/Profile.svg';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from './src/Screens/LoginScreen/Action/Action';
import useProfile from './src/Screens/generalHooks/useProfile';
import {useNavigation} from '@react-navigation/native';

function CustomDrawerContent({progress, ...rest}) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(' ');
  const [
    loading,
    setLoading,
    online,
    profile,
    getProfile,
    updateProfile,
    updatePassword,
    password,
    setPassword,
  ] = useProfile();
  const {userData, isLogged} = useSelector(state => state.LoginReducer);

  const navigation = useNavigation();
  navigation.addListener('focus', () => {
    getProfile();
  });
  const dispatch = useDispatch();
  //

  const pix = {
    uri: profile.profile_pix,
  };
  return (
    <DrawerContentScrollView {...rest}>
      <View>
        <View>
          <View style={styles.container}>
            <View>
              {profile.profile_pix === null ? (
                <Profile />
              ) : (
                <Image source={pix} style={styles.imaged} />
              )}
            </View>
            <View>
              <Text style={styles.name}>
                {profile.first_name + ' ' + profile.last_name}
              </Text>
              {/* <Text style={styles.number}>4.46</Text> */}
            </View>
          </View>
        </View>

        {/* <DrawerItemList {...rest} labelStyle={styles.Label} /> */}
        <DrawerItem
          label="Update Info"
          labelStyle={styles.Label}
          onPress={() => {
            navigation.navigate('UpdateInfo');
          }}
        />
        <DrawerItem
          label="Withdraw Options"
          labelStyle={styles.Label}
          onPress={() => {
            navigation.navigate('WithdrawOption');
          }}
        />
        <DrawerItem
          label="Bank Settings"
          labelStyle={styles.Label}
          onPress={() => {
            navigation.navigate('Bank Settings');
          }}
        />
        <DrawerItem
          label="Logout"
          labelStyle={styles.Label}
          onPress={() => {
            AsyncStorage.clear();
            dispatch(logoutUser('new'));
            navigation.navigate('Onboarding');
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, .25)',
  },
  name: {
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: 20,
    color: 'white',
    width: widthPercentageToDP('42%'),
  },
  number: {
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: 12,
    color: 'white',
  },
  Label: {
    color: '#fff',
    fontSize: heightPercentageToDP('2.4%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  imaged: {
    width: widthPercentageToDP('20%'),
    height: heightPercentageToDP('11.5%'),
    borderRadius: 100,
    marginRight: 10,
  },
});
