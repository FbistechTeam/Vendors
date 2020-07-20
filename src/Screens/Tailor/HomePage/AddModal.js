import React, {useState} from 'react';
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
  RefreshControl,
} from 'react-native';
import {Header, Divider} from 'react-native-elements';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Textarea, Card} from 'native-base';
import Camera from '../../../../assets/camera.svg';
import {InputData2} from '../../Vendor/HomePage/inputData';
import ImagePicker from 'react-native-image-picker';
import Instance from '../../../Api/Instance';
import {Toast} from 'native-base';
import {Button} from 'react-native-elements';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AddModal = ({
  navigation,
  modalVisible,
  closeModal,
  submit,
  dataInput,
}) => {
  const [values, setValues] = useState({});
  const [image, setImage] = useState({});
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {userData} = useSelector(state => state.LoginReducer);
  const [data, setData] = useState(null);

  let {access_token} = userData;

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        handleImagePicker();
      } else {
        alert('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const options = {mediaType: 'Photo'};

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
        console.log(response);
        // const source = {uri: response.uri};
        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};
        const source = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };
        setImage(source);
        setImages(true);

        setData(response.data);
        setValues({...values, image: source});
      }
    });
  };

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };

  const upload = async () => {
    setLoading(true);

    try {
      let AddData = new FormData();
      AddData.append('image', image);
      AddData.append('title', values.title);
      const response = await Instance.post(
        'styles/upload?provider=vendor',
        AddData,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
            // 'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        },
      );
      let s = response.data.status;
      let m = response.data.message;
      console.log(response, s, m);
      if (s) {
        setValues({});
        setImage({});
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'success',
          duration: 5000,
          style: Style,
        });
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
  return (
    <SafeAreaView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.group}>
            <View>
              {InputData2.map(data => {
                return (
                  <Card style={styles.test}>
                    <TextInput
                      key={data.placeholder}
                      placeholder={data.placeholder}
                      onChangeText={value => {
                        let input = data.title;

                        setValues({
                          ...values,
                          [input]: value,
                        });
                        console.log(values);
                      }}
                    />
                  </Card>
                );
              })}
              <View style={styles.camera}>
                {images === false ? (
                  <Camera />
                ) : (
                  <Image source={image} style={styles.imaged} />
                )}
              </View>
              <Button
                title="Add Photo"
                buttonStyle={styles.addImg}
                titleStyle={styles.addImgTxt}
                onPress={requestCameraPermission}
              />
            </View>
            <View style={styles.saveBtnGrp}>
              <Button
                title="Add"
                buttonStyle={styles.saveBtn}
                loading={loading}
                onPress={upload}
              />
              <Button
                title="Cancel"
                buttonStyle={styles.saveBtn}
                onPress={closeModal}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default AddModal;

const styles = StyleSheet.create({
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
    justifyContent: 'center',
  },

  group: {
    width: widthPercentageToDP('89.3%'),
    // flex: 1,
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
  },

  saveBtn: {
    width: widthPercentageToDP('30.4%'),
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
    // borderWidth: 1,
    // marginTop: 20,
    padding: 10,
    // marginBottom: 19,
    fontSize: heightPercentageToDP('2%'),
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
  imaged: {
    height: heightPercentageToDP('23.3%'),
    width: widthPercentageToDP('100%'),
    maxWidth: widthPercentageToDP('81.05%'),
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
  addImgTxt: {
    color: 'black',
  },
});
