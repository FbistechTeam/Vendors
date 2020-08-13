/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  UIManager,
  LayoutAnimation,
  Modal,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {Header, Divider} from 'react-native-elements';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Textarea, Card} from 'native-base';
import useProfile from '../generalHooks/useProfile';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-picker';
import {Toast} from 'native-base';
import {useSelector} from 'react-redux';
import Instance, {HandleAllRequest} from '../../Api/Instance';
import Logo from '../../../assets/Profile.svg';
import InstanceTwo from '../../Api/InstanceTwo';

const UpdateInfo = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [statee, setStates] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState({});
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(false);
  const [profile, setProfile] = useState([]);
  const [password, setPassword] = useState('');

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };
  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;
  const navigation = useNavigation();

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = HandleAllRequest(
        'vendors/profile?provider=vendor',
        'get',
        access_token,
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        let profiles = data.data;
        if (s) {
          console.log(profiles);
          setProfile(profiles);
          setStates(profiles.state === null ? '' : profiles.state.title);
          setFirstName(profiles.first_name === null ? '' : profiles.first_name);
          setLastName(profiles.last_name === null ? '' : profiles.last_name);
          setAddress(profiles.address === null ? '' : profiles.address);
          setPhone(profiles.phone === null ? '' : profiles.phone);
          setEmail(profiles.email === null ? '' : profiles.email);
          setLoading(false);
        } else {
          setLoading(false);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'danger',
            duration: 5000,
            style: Style,
          });
        }
      });
    } catch (err) {
      setLoading(false);
    }
  };

  const updateProfile = async data => {
    setLoading(true);
    try {
      const response = HandleAllRequest(
        'vendors/profile/update?provider=vendor',
        'put',
        access_token,
        data,
      );
      response.then(Data => {
        let s = Data.status;
        let m = Data.message;

        if (s) {
          setLoading(false);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'success',
            duration: 5000,
            style: Style,
          });
          getProfile();
        } else {
          setLoading(false);
          // setReqMessage(m);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'danger',
            duration: 5000,
            style: Style,
          });
        }
      });
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
      alert(err);
    }
  };

  const updatePassword = async data => {
    setLoading(true);
    try {
      const response = HandleAllRequest(
        'vendors/profile/password/update?provider=vendor',
        'put',
        access_token,
        data,
      );
      response.then(Data => {
        let s = Data.status;
        let m = Data.message;

        if (s) {
          setLoading(false);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'success',
            duration: 5000,
            style: Style,
          });
          setPassword(' ');
          getProfile();
        } else {
          setLoading(false);
          // setReqMessage(m);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'danger',
            duration: 5000,
            style: Style,
          });
        }
      });
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
      alert(err);
    }
  };
  const init = () => {
    getProfile();
  };

  useEffect(() => {
    init();
  }, []);

  let datas = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    state_id: 25,
    address: address,
    phone: phone,
  };

  const setProfiled = () => {
    updateProfile(datas);
  };

  // image picker
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Sew App needs access to your camera ' +
            'so you can take and upload pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        handleImagePicker();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const options = {mediaType: 'photo'};
  const handleImagePicker = () => {
    return ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };
        console.log(source);
        // setData(response.data);
        setImage(source);
        setImages(true);
        upload();
      }
    });
  };

  // // upload image

  const upload = async () => {
    setLoading(true);
    try {
      let AddData = new FormData();
      AddData.append('profile_pix', image);
      const response = await InstanceTwo.post(
        'vendors/profile/avatar/upload?provider=vendor',
        AddData,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
            Accept: 'application/json',
          },
        },
      );
      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        setImage({});
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'success',
          duration: 5000,
          style: Style,
        });
        getProfile();
        setLoading(false);
      } else {
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
        setLoading(false);
      }
    } catch (err) {
      Toast.show({
        text: 'Something went wrong',
        buttonText: 'Okay',
        position: 'top',
        type: 'danger',
        duration: 5000,
        style: Style,
      });
      setLoading(false);
    }
  };

  const changePassword = () => {
    updatePassword({password: password});
  };

  const pix = {
    uri: profile.profile_pix,
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        placement="center"
        backgroundColor="#fff"
        containerStyle={styles.barStyle}
        leftComponent={
          <Ionicons
            onPress={() => {
              navigation.openDrawer();
            }}
            name="bars"
            size={30}
            color="black"
            style={{
              paddingLeft: 23,
            }}
          />
        }
        leftContainerStyle={styles.left}
        rightContainerStyle={styles.left}
        rightComponent={
          <Ionicons
            onPress={() => {
              navigation.navigate('HomePages');
            }}
            name="times"
            size={25}
            color="black"
            style={{
              paddingRight: 23,
            }}
          />
        }
        centerComponent={{
          text: <Text style={styles.maiHeaderTxt}>Update Info</Text>,
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.group}>
          <TouchableOpacity
            style={styles.logo}
            onPress={requestCameraPermission}>
            {profile.profile_pix === null || profile.profile_pix === '' ? (
              <Logo />
            ) : (
              <Image
                source={
                  profile.profile_pix === null || profile.profile_pix === ''
                    ? image
                    : pix
                }
                style={styles.imaged}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
          <View>
            <Card style={styles.test}>
              <TextInput
                style={styles.input}
                value={first_name}
                placeholder="First Name"
                onChangeText={val => {
                  setFirstName(val);
                }}
              />
            </Card>
            <Card style={styles.test}>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={last_name}
                onChangeText={val => {
                  setLastName(val);
                }}
              />
            </Card>
            <Card style={styles.test}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={val => {
                  setEmail(val);
                }}
              />
            </Card>
            <Card style={styles.test}>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phone}
                onChangeText={val => {
                  setPhone(val);
                }}
              />
            </Card>
            <Card style={styles.test}>
              <TextInput
                style={styles.input}
                placeholder="State of Residence"
                disabled={true}
                value={statee}
                onChangeText={val => {
                  setStates(val);
                }}
              />
            </Card>
            <Card style={styles.test}>
              <TextInput
                style={styles.input}
                placeholder="Residential Address"
                value={address}
                onChangeText={val => {
                  setAddress(val);
                }}
              />
            </Card>
            <View style={styles.saveBtnGrp}>
              <Button style={styles.saveBtn} onPress={setProfiled}>
                <Text style={styles.saveBtnTxt}>Update Info</Text>
              </Button>
            </View>

            <Card style={styles.test}>
              <TextInput
                style={styles.input}
                placeholder="Enter New Password"
                value={password}
                onChangeText={val => {
                  setPassword(val);
                }}
              />
            </Card>
          </View>
          <View style={styles.saveBtnGrp}>
            <Button style={styles.saveBtn} onPress={changePassword}>
              <Text style={styles.saveBtnTxt}>Update Password</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={styles.spinnerTextStyle}
      />
    </SafeAreaView>
  );
};

export default UpdateInfo;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  maiHeaderTxt: {
    color: '#000',
    fontSize: heightPercentageToDP('2.5%'),
    paddingBottom: 20,
  },
  barStyle: {
    height: 67,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  left: {
    paddingBottom: 20,
  },
  container: {
    // flex: 1,
  },

  group: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 19,
    paddingVertical: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 7,
  },

  saveBtnGrp: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  saveBtn: {
    width: widthPercentageToDP('40.4%'),
    height: heightPercentageToDP('7%'),
    alignSelf: 'center',
    marginVertical: 25,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  saveBtnTxt: {
    fontSize: heightPercentageToDP('2.1875%'),
    color: '#fff',
  },
  input: {
    // borderRadius: 8,
    borderColor: '#000',
    height: heightPercentageToDP('5.8%'),
    width: widthPercentageToDP('85%'),
    // borderWidth: 1,
    // marginTop: 20,
    padding: 10,
  },
  test: {
    height: heightPercentageToDP('6%'),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    // borderWidth: 1,
    elevation: 5,
    borderRadius: 8,
  },
  tested: {
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    // borderWidth: 1,
    elevation: 5,
    borderRadius: 8,
  },
  inputArea: {
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 1,
    height: heightPercentageToDP('28.8%'),
    marginTop: 20,
  },
  camera: {
    height: heightPercentageToDP('23.3%'),
    backgroundColor: '#707070',
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImg: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: heightPercentageToDP('5.8%'),
    borderColor: 'rgba(0,0,0,0.4)',
    borderWidth: 0.5,
  },
  // imaged: {
  //   height: heightPercentageToDP('23.3%'),
  //   width: widthPercentageToDP('100%'),
  //   maxWidth: widthPercentageToDP('81.05%'),
  //   borderRadius: 8,
  //   marginVertical: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  blub: {
    height: heightPercentageToDP('14%'),
    backgroundColor: '#707070',
    margin: 10,
    borderRadius: 8,
  },
  // logo: {
  //   width: 126,
  //   height: 71,
  // },
  imaged: {
    width: widthPercentageToDP('30%'),
    height: heightPercentageToDP('15.5%'),
    borderRadius: 100,
  },
});
