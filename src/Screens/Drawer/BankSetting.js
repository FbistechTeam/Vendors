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
} from 'react-native';
import {Header, Divider, Button} from 'react-native-elements';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import {Picker} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Textarea, Card} from 'native-base';
import useBank from '../generalHooks/useBank';
import {set} from 'react-native-reanimated';
import {BankData} from './data';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import {HandleAllRequest} from '../../Api/Instance';
import {Toast} from 'native-base';
import InstanceTwo from '../../Api/InstanceTwo';

const BankSettings = ({navigation, closeModal, images, Add, image}) => {
  const [frequency, setFrequency] = useState('Frequency');
  const [bankk, setBankk] = useState('1');
  const [bvn, setBvn] = useState('');
  const [bankDets, setBankDets] = useState('');
  const [bankData, setBankdata] = useState({});
  const [vendor_bank_id, setvendor_bank_id] = useState('');
  const [Bank, setBank] = useState([]);
  const [currentBank, setCurrentBank] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bvnModalVisible, setBvnModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;
  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
    zIndex: 11111,
  };

  /** Update Bvn */
  const updateBvn = async bvn => {
    setLoading(true);
    let data = {
      bvn: bvn,
    };
    try {
      const response = HandleAllRequest(
        'vendors/banks/bvn/update?provider=vendor',
        'put',
        access_token,
        data,
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          // setResults(response.data.data);
          setLoading(false);
          setBvnModalVisible(false);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'success',
            duration: 5000,
            style: Style,
          });
        } else {
          setLoading(false);
          // setReqMessage(m);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'bottom',
            type: 'danger',
            duration: 5000,
            style: Style,
          });
        }
      });
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  //** Delete Bank*/
  const DeleteBank = async id => {
    setLoading(true);
    try {
      const response = await InstanceTwo.delete(
        'vendors/banks/delete?provider=vendor',

        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
          data: {
            vendor_bank_id: id,
          },
        },
      );
      let s = response.data.status;
      let m = response.data.message;
      if (s) {
        // setResults(response.data.data);
        setLoading(false);
        setDeleteModal(false);
        setModalVisible2(false);
        reload();
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'success',
          duration: 5000,
          style: Style,
        });
      } else {
        setLoading(false);
        // setReqMessage(m);
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'bottom',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
      }
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      console.log(err);
      setLoading(false);
    }
  };

  //**Adds bank */
  const AddBank = async bankData => {
    setLoading(true);
    try {
      const response = HandleAllRequest(
        'vendors/banks/add?provider=vendor',
        'post',
        access_token,
        bankData,
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          // setResults(response.data.data);
          setModalVisible(false);
          setLoading(false);
          reload();
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'success',
            duration: 5000,
            style: Style,
          });
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
    }
  };
  const setDefault = async bankData => {
    setLoading(true);
    try {
      const response = HandleAllRequest(
        'vendors/banks/set-default?provider=vendor',
        'put',
        access_token,
        bankData,
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
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
    }
  };

  /**to  reloadbanks after adding */
  const reload = () => {
    const requestMyBanks = HandleAllRequest(
      'vendors/banks?provider=vendor',
      'get',
      access_token,
    );

    requestMyBanks.then(data => {
      let s = data.status;
      let m = data.message;
      if (s) {
        setCurrentBank(data.data);
        setLoading(false);
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
  };

  const Run = () => {
    setLoading(true);
    /**get sall banks */
    const request = HandleAllRequest('banks?provider=vendor', 'get');
    request
      .then(data => {
        let p = data.data;
        setBank(data.data);
      })
      .catch(err => {
        console.log('first', err);
      });

    //**gets user added banks */
    const requestMyBanks = HandleAllRequest(
      'vendors/banks?provider=vendor',
      'get',
      access_token,
    );

    requestMyBanks.then(data => {
      let s = data.status;
      let m = data.message;
      if (s) {
        setCurrentBank(data.data);
        setLoading(false);
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
  };

  const init = e => {
    // Prevent default action
    Run();
  };
  useEffect(() => {
    init();
  }, []);

  const Dets = {
    bank_id: bankk,
    account_number: bankDets,
  };

  const Dets2 = {
    vendor_bank_id,
  };

  const handleSubmit = Det => {
    AddBank(Det);
  };
  const handleDefalt = Det2 => {
    setDefault(Det2);
  };
  const BvnUpdate = b => {
    updateBvn(b);
  };

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
          text: <Text style={styles.maiHeaderTxt}>Bank Settings</Text>,
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.group}>
          <View>
            {currentBank.map(data => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setBankdata(data.bank);
                    setModalVisible2(true);
                    setBankk(data.bank.id);
                    setBankDets(data.account_number);
                    setvendor_bank_id(data.id);
                  }}>
                  <Card style={styles.test}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: heightPercentageToDP('2%'),
                      }}>
                      {data.bank.name}
                    </Text>
                    <Icons name="options-vertical" color="#5CE3D9" size={20} />
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.saveBtnGrp}>
            <Button
              title="Add Bank"
              titleStyle={styles.saveBtnTxt}
              buttonStyle={styles.saveBtn}
              onPress={() => {
                setModalVisible(true);
              }}
            />
            <Button
              title="Update BVN"
              titleStyle={styles.saveBtnTxt}
              buttonStyle={styles.saveBtn}
              onPress={() => {
                setBvnModalVisible(true);
              }}
            />
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={bvnModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.addContainer}>
          <View style={styles.addContainerGroup}>
            <Card style={styles.tests}>
              <TextInput
                placeholder="Enter Bank Verification Number"
                onChangeText={value => {
                  setBvn(value);
                }}
              />
            </Card>
          </View>
          <View style={styles.saveBtnGrp2}>
            <Button
              title="Update"
              titleStyle={styles.saveBtnTxt}
              buttonStyle={styles.saveBtn}
              onPress={() => {
                BvnUpdate(bvn);
              }}
            />
            <Button
              title="Cancel"
              titleStyle={styles.saveBtnTxt}
              buttonStyle={styles.saveBtn}
              onPress={() => {
                setBvnModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModal}
        onRequestClose={closeModal}>
        <View style={styles.addContainer}>
          <View style={styles.addContainerGroup}>
            <Text>Are you sure you want to delete {bankData.name}?</Text>
          </View>
          <View style={styles.saveBtnGrp2}>
            <Button
              title="Yes"
              titleStyle={styles.saveBtnTxt}
              buttonStyle={styles.saveBtn}
              onPress={() => {
                DeleteBank(vendor_bank_id);
              }}
            />
            <Button
              title="Cancel"
              titleStyle={styles.saveBtnTxt}
              buttonStyle={styles.saveBtn}
              onPress={() => {
                setDeleteModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.addContainer}>
          <View style={styles.addContainerGroup}>
            <Card style={styles.tests}>
              <Picker
                mode="dropdown"
                // iosIcon={<Icon name="arrow-down" />}
                placeholder="Select Bank"
                placeholderStyle={{
                  color: '#707070',
                }}
                style={{
                  width: undefined,
                }}
                selectedValue={bankk}
                onValueChange={value => {
                  setBankk(value);
                }}>
                {Bank.map(data => {
                  return <Picker.Item label={data.name} value={data.id} />;
                })}
              </Picker>
            </Card>
            <Card style={styles.tests}>
              <TextInput
                placeholder="Account Number"
                onChangeText={value => {
                  setBankDets(value);
                }}
              />
            </Card>
          </View>
          <View style={styles.saveBtnGrp2}>
            <Button
              title="Add"
              titleStyle={styles.saveBtnTxt}
              buttonStyle={styles.saveBtn}
              onPress={() => {
                handleSubmit(Dets);
              }}
            />
            <Button
              title="Cancel"
              titleStyle={styles.saveBtnTxt}
              buttonStyle={styles.saveBtn}
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={closeModal}>
        <Header
          placement="center"
          backgroundColor="#fff"
          containerStyle={styles.barStyle}
          leftContainerStyle={styles.left}
          rightContainerStyle={styles.left}
          rightComponent={
            <Ionicons
              onPress={() => {
                setModalVisible2(false);
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
            text: <Text style={styles.maiHeaderTxt}>{bankData.name}</Text>,
          }}
        />
        <View style={styles.addContainer2}>
          <View style={styles.addContainerGroup}>
            <Card style={styles.tests}>
              <TextInput
                placeholder="Account Number"
                value={bankData.name}
                disabled
              />
            </Card>
            <Card style={styles.tests}>
              <TextInput
                placeholder="Account Number"
                value={bankDets}
                onChangeText={value => {
                  setBankDets(value);
                }}
              />
            </Card>
          </View>
          <View style={styles.saveBtnGrp3}>
            <Button
              title="Set As Default"
              titleStyle={styles.saveBtnTxt}
              buttonStyle={styles.saveBtn}
              onPress={() => {
                handleDefalt(Dets2);
                setModalVisible2(false);
              }}
            />
            <Button
              title="Delete"
              titleStyle={styles.saveBtnTxt}
              buttonStyle={styles.saveBtn}
              onPress={() => {
                setDeleteModal(true);
              }}
            />
          </View>
        </View>
      </Modal>
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={styles.spinnerTextStyle}
      />
    </SafeAreaView>
  );
};

export default BankSettings;

const styles = StyleSheet.create({
  maiHeaderTxt: {
    color: '#000',
    fontSize: heightPercentageToDP('2.5%'),
    paddingBottom: 20,
    textAlign: 'center',
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
    justifyContent: 'space-between',
  },
  saveBtnGrp2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPercentageToDP('80%'),
    marginTop: heightPercentageToDP('10%'),
  },
  saveBtnGrp3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPercentageToDP('80%'),
    marginTop: heightPercentageToDP('10%'),
  },

  saveBtn: {
    width: widthPercentageToDP('35.4%'),
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    height: heightPercentageToDP('8%'),
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
    backgroundColor: '#000',
  },
  tests: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    height: heightPercentageToDP('8%'),
    width: widthPercentageToDP('80%'),
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    // borderWidth: 1,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
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
  addContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: heightPercentageToDP('10.5%'),
    alignItems: 'center',
    height: heightPercentageToDP('50%'),
    width: widthPercentageToDP('90%'),
    alignSelf: 'center',
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
  addContainer2: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: heightPercentageToDP('50%'),
    flex: 1,
    width: widthPercentageToDP('100%'),
    alignSelf: 'center',
  },
  addContainerGroup: {
    height: heightPercentageToDP('25%'),
    justifyContent: 'space-evenly',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
