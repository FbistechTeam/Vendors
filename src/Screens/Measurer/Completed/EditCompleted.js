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
import useMeasurement from '../Measurment/hooks/useMeasurement';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const EditCompleted = ({modalVisible, closeModal}) => {
  const [display, setDisplay] = useState(false);
  const [display2, setDisplay2] = useState(false);
  const [props, setProps] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState('Select Measurement');
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

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.container}>
          <Header
            placement="center"
            backgroundColor="#fff"
            containerStyle={styles.barStyle}
            rightContainerStyle={styles.left}
            rightComponent={
              <Ionicons
                onPress={closeModal}
                name="times"
                size={25}
                color="black"
                style={{
                  paddingRight: 23,
                }}
              />
            }
            centerComponent={{
              text: <Text style={styles.maiHeaderTxt}>Measurement</Text>,
            }}
          />
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
            <Button style={styles.saveBtn}>
              <Text style={styles.saveBtnTxt}>Save</Text>
            </Button>
          </View>
        </View>
      </Modal>
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
};

export default EditCompleted;

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
    backgroundColor: '#fff',
    flex: 1,
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
    borderBottomWidth: 1,
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
  spinnerTextStyle: {
    color: '#FFF',
  },
});
