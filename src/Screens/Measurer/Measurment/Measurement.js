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
  StatusBar,
} from 'react-native';
import {Header, Divider} from 'react-native-elements';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewMeasurementComponent from '../Measurment/NewMeasurementComponent';
import {FlatList} from 'react-native-gesture-handler';
import {DimensionData} from '../Measurment/MesureData';
import {Button} from 'native-base';
import Ok from '../../../../assets/ok.svg';
import {useNavigation} from '@react-navigation/native';
import useMeasurement from './hooks/useMeasurement';
import Spinner from 'react-native-loading-spinner-overlay';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MeasurementModal = ({route}) => {
  const {job_id} = route.params;
  const [display, setDisplay] = useState(false);
  const [display2, setDisplay2] = useState(false);
  const [title, settitle] = useState('');
  const [props, setProps] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState('Select Style');
  const styleSelection = ['Top', 'Trouser $ Short', 'Agbada', 'Cap'];
  const [
    results,
    propt,
    handlePropts,
    Allmeasurement,
    AddMesurement,
    loading,
    getList,
    amount,
    measurement_id,
    setMeasurement_id,
    nameStyleVisible,
    AddedStyleVisible,
    setAddedStyleVisible,
    setNameStyleVisible,
  ] = useMeasurement();
  const navigation = useNavigation();

  navigation.addListener('focus', async () => {
    await getList();
  });

  //drop down
  const drop = () => {
    LayoutAnimation.easeInEaseOut();
    setDisplay(!display);
    setDisplay2(false);
  };
  const drop2 = () => {
    LayoutAnimation.easeInEaseOut();
    setDisplay2(!display2);
    setDisplay(false);
  };
  // get selected style
  const handleSelected = data => {
    LayoutAnimation.easeInEaseOut();
    handlePropts(data);
  };
  ///////////////// add measurment /////////////////
  const handleAdd = () => {
    setNameStyleVisible(true);
  };

  const measurement = {job_id, props, title};
  return (
    <ScrollView>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
        showHideTransition
        hidden={false}
      />
      <View style={styles.container}>
        <View style={styles.group}>
          <View style={styles.sortByContainer}>
            <View style={styles.drop}>
              <Text style={styles.sortTxt} onPress={drop}>
                {selectedStyle}
              </Text>
              <Icon
                name={!display ? 'chevron-down' : 'chevron-up'}
                size={15}
                color="#3D7782"
                onPress={drop}
              />
            </View>
            <Divider
              style={
                !display
                  ? {
                      display: 'none',
                    }
                  : {
                      marginVertical: 5,
                      padding: 0.7,
                    }
              }
            />
            {results.map(data => {
              return (
                <View key={data.id}>
                  <TouchableOpacity>
                    <Text
                      style={display ? styles.sortTxt : styles.display}
                      onPress={() => {
                        handleSelected(data.id);
                        setSelectedStyle(data.title);
                        setDisplay(false);
                      }}>
                      {data.title}
                    </Text>
                  </TouchableOpacity>
                  <Divider
                    style={
                      !display
                        ? {
                            display: 'none',
                          }
                        : {
                            marginVertical: 5,
                            padding: 0.7,
                          }
                    }
                  />
                </View>
              );
            })}
          </View>
          <View style={styles.component}>
            <FlatList
              data={propt}
              keyExtractor={item => item.name}
              renderItem={({item, index}) => {
                return (
                  <View style={index === 9 ? styles.NoBorder : styles.border}>
                    <NewMeasurementComponent
                      title={item.title}
                      change={e => {
                        let p = {
                          prop_id: item.id,
                          size: e.nativeEvent.text,
                        };
                        props.push(p);
                      }}
                    />
                  </View>
                );
              }}
              contentContainerStyle={styles.dimensions}
            />
          </View>
          <Button style={styles.saveBtn} onPress={handleAdd}>
            <Text style={styles.saveBtnTxt}>Save</Text>
          </Button>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={nameStyleVisible}>
        <StatusBar
          backgroundColor="#000"
          barStyle="dark-content"
          showHideTransition
          hidden={false}
        />
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Almost Done</Text>
            <Text style={styles.subHeader}>
              Give your new measurement a name
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.inputs}
              value={title}
              onChangeText={val => {
                settitle(val);
              }}
            />
          </View>
          <Button
            style={styles.btn}
            onPress={() => {
              AddMesurement(measurement);
            }}>
            <Text style={styles.btnTxt}>Save</Text>
          </Button>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={false}
        visible={AddedStyleVisible}>
        <View style={styles.addModalContainer}>
          <View style={styles.addedContainer}>
            <View style={styles.headerAddContainer}>
              <Ok />
              <Text style={styles.addedText}>Measurement Confirmed</Text>
            </View>
            <View style={styles.btnContainer}>
              <Button
                style={styles.btnN}
                onPress={() => {
                  setAddedStyleVisible(false);
                  navigation.navigate('Home');
                }}>
                <Text style={styles.btnTxt}>Dashboard</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={styles.spinnerTextStyle}
      />
    </ScrollView>
  );
};

export default MeasurementModal;

const styles = StyleSheet.create({
  maiHeaderTxt: {
    color: '#3D7782',
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
    backgroundColor: '#fff',
    // flex: 1,
  },
  sortContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 21,
  },

  sort: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortTxt: {
    color: '#000',
    fontSize: heightPercentageToDP('2.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginLeft: 9,
  },
  sortByContainer: {
    width: widthPercentageToDP('70%'),
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 8,
    padding: 7,
    alignSelf: 'center',
    marginVertical: 20,
  },
  drop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  display: {
    display: 'none',
  },
  list: {
    justifyContent: 'space-between',
  },
  component: {
    alignItems: 'center',
  },
  dimensions: {
    height: heightPercentageToDP('62%'),
    justifyContent: 'space-between',
  },

  border: {
    borderBottomWidth: 0.65,
    borderBottomColor: '#000',
    paddingBottom: 9,
  },
  NoBorder: {
    borderBottomWidth: 0,
  },
  saveBtn: {
    width: widthPercentageToDP('42.7%'),
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addModalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',

    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: heightPercentageToDP('6%'),
  },
  header: {
    color: 'white',
    fontSize: heightPercentageToDP('3.9%'),
    textAlign: 'center',
  },
  subHeader: {
    color: '#5CE3D9',
    fontSize: heightPercentageToDP('1.875%'),
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  inputs: {
    width: widthPercentageToDP('68%'),
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    color: '#FFFFFF',
    fontSize: heightPercentageToDP('2.18%'),
    textAlign: 'center',
    paddingBottom: 1,
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  btn: {
    width: widthPercentageToDP('42.7%'),
    backgroundColor: '#fff',
    height: heightPercentageToDP('6.75%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: heightPercentageToDP('3.5%'),
  },
  btnTxt: {
    fontSize: heightPercentageToDP('2.2%'),
    color: '#000',
  },
  addedContainer: {
    height: heightPercentageToDP('59.2%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP('10%'),
  },
  addedText: {
    color: '#fff',
    fontSize: heightPercentageToDP('3.825%'),
    width: widthPercentageToDP('46%'),
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginBottom: heightPercentageToDP('2%'),
  },
  btnN: {
    width: widthPercentageToDP('42.7%'),
    backgroundColor: '#fff',
    height: heightPercentageToDP('6.75%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: heightPercentageToDP('1.75%'),
  },
  headerAddContainer: {
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
