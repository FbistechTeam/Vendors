/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
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
  ActivityIndicator,
} from 'react-native';
import {Header, Divider} from 'react-native-elements';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {Picker} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Toast, Card} from 'native-base';
import useWithdrawals from '../generalHooks/useWithdrawals';
import {useNavigation} from '@react-navigation/native';
import {HandleAllRequest} from '../../Api/Instance';
import {useEffect} from 'react';

const WithdrawOption = ({closeModal, images, Add, image}) => {
  const [frequency, setFrequency] = useState('Frequency');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentBank, setCurrentBank] = useState([]);
  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };

  const navigation = useNavigation();

  const init = () => {
    Details();
  };
  /**set withrawal options */
  const withrawalOption = dataA => {
    setLoading(true);
    let Data = {
      option_id: dataA,
    };
    const request = HandleAllRequest(
      'vendors/withdrawals/options/set?provider=vendor',
      'put',
      access_token,
      Data,
    );
    request
      .then(data => {
        setLoading(false);
        let s = data.status;
        let m = data.message;
        if (s) {
          let d = data.data;
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'success',
            duration: 5000,
            style: Style,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    //**gets on-going projects */
  };

  const Details = async () => {
    setLoading(true);
    try {
      const response = HandleAllRequest(
        `vendors/withdrawals/options?provider=vendor`,
        'get',
        access_token,
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setOptions(data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });

      //**gets ongoing projects */
      const response2 = HandleAllRequest(
        'vendors/banks?provider=vendor',
        'get',
        access_token,
      );
      response2.then(data => {
        let s2 = data.status;
        let m2 = data.message;
        if (s2) {
          setCurrentBank(data.data);
        } else {
          setLoading(false);
        }
      });
    } catch (err) {
      // setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
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
          text: <Text style={styles.maiHeaderTxt}>Withdraw Options</Text>,
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.group}>
          <View>
            <Card style={styles.test}>
              {/* <TextInput style={styles.input} placeholder="First Name" />
               */}
              <Picker
                mode="dropdown"
                // iosIcon={<Icon name="arrow-down" />}
                placeholder="Frequencey"
                placeholderStyle={{
                  color: '#707070',
                }}
                style={{
                  width: undefined,
                }}
                selectedValue={frequency}
                onValueChange={value => {
                  setFrequency(value);
                }}>
                {options.map(data => {
                  return (
                    <Picker.Item
                      label={data.frequency}
                      value={data.id}
                      key={data.id}
                    />
                  );
                })}
              </Picker>
            </Card>
            {/* <Card style={styles.test}>
              <Picker
                mode="dropdown"
                // iosIcon={<Icon name="arrow-down" />}
                placeholder="Select Bank"
                placeholderStyle={{color: '#707070'}}
                style={{width: undefined}}
                selectedValue={frequency}
                onValueChange={value => {
                  setFrequency(value);
                }}>
                {currentBank.map(data => {
                  return (
                    <Picker.Item
                      label={data.bank.name}
                      value={data.id}
                      key={data.id}
                    />
                  );
                })}
              </Picker>
            </Card> */}
          </View>
          {loading && <ActivityIndicator size={30} />}
          <View style={styles.saveBtnGrp}>
            <Button
              style={styles.saveBtn}
              onPress={() => {
                withrawalOption(frequency);
              }}>
              <Text style={styles.saveBtnTxt}>Update</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WithdrawOption;

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
  },

  group: {
    flex: 1,
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
    justifyContent: 'center',
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
  imaged: {
    height: heightPercentageToDP('23.3%'),
    width: widthPercentageToDP('100%'),
    maxWidth: widthPercentageToDP('81.05%'),
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blub: {
    height: heightPercentageToDP('14%'),
    backgroundColor: '#707070',
    margin: 10,
    borderRadius: 8,
  },
});
