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
import NewMeasurementComponent from '../Screens/Measurer/Measurment/NewMeasurementComponent';
import {FlatList} from 'react-native-gesture-handler';
import {DimensionData} from '../Screens/Measurer/Measurment/MesureData';
import {Button} from 'native-base';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MeasurementModal = ({navigation, modalVisible, closeModal}) => {
  const [display, setDisplay] = useState(false);
  const [display2, setDisplay2] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('Select Card');
  const styleSelection = ['Top', 'Trouser $ Short', 'Agbada', 'Cap'];

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
    setSelectedStyle(data);
    setDisplay(false);
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
              text: <Text style={styles.maiHeaderTxt}>New Measurements</Text>,
            }}
          />
          <View style={styles.group}>
            <View style={styles.sortByContainer}>
              <View style={styles.drop}>
                <Text style={styles.sortTxt}>{selectedStyle}</Text>
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
              {styleSelection.map(data => {
                return (
                  <View>
                    <TouchableOpacity>
                      <Text
                        style={display ? styles.sortTxt : styles.display}
                        onPress={() => {
                          handleSelected(data);
                        }}>
                        {data}
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
                data={DimensionData}
                keyExtractor={item => item.name}
                renderItem={({item, index}) => {
                  console.log(index, item.length);
                  return (
                    <View style={index === 9 ? styles.NoBorder : styles.border}>
                      <NewMeasurementComponent title={item.name} />
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
    </View>
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
    color: '#3D7782',
    fontSize: heightPercentageToDP('2.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginLeft: 9,
  },
  sortByContainer: {
    width: widthPercentageToDP('70%'),
    borderWidth: 3,
    borderColor: '#3D7782',
    borderRadius: 20,
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
    borderBottomColor: '#3D7782',
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
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: '#3D7782',
  },
  saveBtnTxt: {
    fontSize: heightPercentageToDP('2.1875%'),
    color: '#fff',
  },
});
