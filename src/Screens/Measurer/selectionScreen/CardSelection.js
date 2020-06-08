import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  Platform,
  LayoutAnimation,
  Modal,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Shirt from '../../../assets/payment.svg';
import Ok from '../../../assets/ok.svg';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'native-base';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CardSelection = ({
  next,
  nameStyleVisible,
  added,
  AddedStyleVisible,
  sewAnother,
  sewDashboard,
}) => {
  const [display, setDisplay] = useState(false);
  const [display2, setDisplay2] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('Select Card');
  const styleSelection = [
    '5657 6585 9252 6171',
    '7463 7382 8282 9088',
    '2363 7627 8930 0963',
  ];

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
    <View style={styles.group}>
      <View style={styles.shirtLogo}>
        <Shirt />
      </View>
      <Text style={styles.select}>Select Payment Method</Text>
      <View style={styles.sortContainer}>
        <View style={styles.sortByContainer}>
          <View style={styles.drop}>
            <Text style={styles.sortTxt}>{selectedStyle}</Text>
            <Icon
              name={!display ? 'chevron-down' : 'chevron-up'}
              size={15}
              color="#fff"
              onPress={drop}
            />
          </View>
          <Divider
            style={
              !display ? {display: 'none'} : {marginVertical: 5, padding: 0.7}
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
                      ? {display: 'none'}
                      : {marginVertical: 5, padding: 0.7}
                  }
                />
              </View>
            );
          })}
        </View>
        <Text style={styles.totalTxt}>Total</Text>
        <Text style={styles.totalMain}>N27,000</Text>
      </View>
      <View style={styles.tabContainer}>
        <View style={styles.tabW} />
        <View style={styles.tabW} />
        <View style={styles.tabW} />
        <View style={styles.tabW} />
        <View style={styles.tab} />
      </View>
      <TouchableOpacity onPress={next}>
        <View style={styles.scrollButton}>
          <Text style={styles.scrollButtonText}>Sew</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={false}
        visible={nameStyleVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Almost Done</Text>
            <Text style={styles.subHeader}>
              Give your new measurement a name
            </Text>
          </View>
          <View>
            <TextInput style={styles.inputs} />
          </View>
          <Button style={styles.btn} onPress={added}>
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
              <Text style={styles.addedText}>
                Measurement added Successfully!
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <Button style={styles.btnN} onPress={sewAnother}>
                <Text style={styles.btnTxt}>Sew Another</Text>
              </Button>
              <Button style={styles.btnN} onPress={sewDashboard}>
                <Text style={styles.btnTxt}>Dashboard</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CardSelection;

const styles = StyleSheet.create({
  group: {
    // height: heightPercentageToDP('75%'),
    justifyContent: 'space-between',
  },
  shirtLogo: {
    alignSelf: 'center',
    marginBottom: heightPercentageToDP('5%'),
  },
  sortContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP('10%'),
  },

  sort: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortTxt: {
    color: '#fff',
    fontSize: heightPercentageToDP('2.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginLeft: 9,
  },
  sortByContainer: {
    width: widthPercentageToDP('70%'),
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 20,
    padding: 7,
    alignSelf: 'center',
    marginBottom: 20,
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
  scrollButton: {
    alignSelf: 'center',
    backgroundColor: 'white',
    height: heightPercentageToDP('6.65%'),
    width: 160,
    borderRadius: 32,
    justifyContent: 'center',
  },
  scrollButtonText: {
    textAlign: 'center',
    fontSize: heightPercentageToDP('2.18%'),
    color: '#3D7782',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  select: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    color: '#fff',
    fontSize: heightPercentageToDP('2.5%'),
    marginBottom: heightPercentageToDP('5%'),
    width: widthPercentageToDP('40%'),
  },
  tabContainer: {
    width: widthPercentageToDP('50.2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: heightPercentageToDP('5%'),
  },
  tab: {
    borderBottomWidth: 3,
    width: widthPercentageToDP('8%'),
    borderBottomColor: '#5CE3D9',
  },
  tabW: {
    borderBottomWidth: 3,
    width: widthPercentageToDP('8%'),
    borderBottomColor: '#fff',
  },
  totalTxt: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    color: '#5CE3D9',
    fontSize: heightPercentageToDP('2.5%'),
    marginBottom: heightPercentageToDP('2%'),
    marginTop: heightPercentageToDP('6%'),
    width: widthPercentageToDP('40%'),
  },
  totalMain: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    color: '#5CE3D9',
    fontSize: heightPercentageToDP('4.5%'),
    marginBottom: heightPercentageToDP('2%'),
    width: widthPercentageToDP('40%'),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#3D7782',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addModalContainer: {
    flex: 1,
    backgroundColor: '#3D7782',
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
    borderRadius: 26,
    marginVertical: heightPercentageToDP('3.5%'),
  },
  btnTxt: {
    fontSize: heightPercentageToDP('2.2%'),
    color: '#3D7984',
  },
  addedContainer: {
    height: heightPercentageToDP('59.2%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP('10%'),
  },
  addedText: {
    color: '#fff',
    fontSize: heightPercentageToDP('2.525%'),
    width: widthPercentageToDP('46%'),
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginVertical: heightPercentageToDP('3%'),
  },
  btnN: {
    width: widthPercentageToDP('42.7%'),
    backgroundColor: '#fff',
    height: heightPercentageToDP('6.75%'),
    justifyContent: 'center',
    borderRadius: 26,
    marginTop: heightPercentageToDP('1.75%'),
  },
  headerAddContainer: {
    alignItems: 'center',
  },
});
