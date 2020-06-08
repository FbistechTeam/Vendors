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
  Alert,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Shirt from '../../../assets/calender.svg';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarPicker from 'react-native-calendar-picker';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SelecctDeadline = ({next}) => {
  const [display, setDisplay] = useState(false);
  const [display2, setDisplay2] = useState(false);
  const [modal, setModal] = useState(false);
  const [express, setExpress] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('Normal Deadline');
  const [move, setMove] = useState(false);

  //drop down
  const drop = () => {
    LayoutAnimation.easeInEaseOut();
    setDisplay(!display);
    setDisplay2(false);
    setModal(false);
  };
  const drop2 = () => {
    LayoutAnimation.easeInEaseOut();
    setModal(!modal);
    setExpress(!express);
  };

  // set modal visibility
  const handleModal = () => {
    setModal(!modal);
    setExpress(false);
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setMove(!move);
    }, 1);
  };

  return (
    <View style={styles.group}>
      <View style={styles.shirtLogo}>
        <Shirt />
      </View>
      <Text style={styles.select}>Select Choice Of Deadline</Text>

      <View style={styles.sortContainer}>
        <TouchableOpacity style={styles.sortByContainer} onPress={handleModal}>
          <View style={styles.drop}>
            <Text style={styles.sortTxt}>{selectedStyle}</Text>
            <Icon
              name={!display ? 'chevron-down' : 'chevron-up'}
              size={15}
              color="#fff"
              onPress={handleModal}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortByContainerRequest} onPress={drop2}>
          <View style={styles.drop}>
            <Text style={styles.request}>Express</Text>
            <Icon
              name={!display ? 'chevron-down' : 'chevron-up'}
              size={15}
              color="#5CE3D9"
              onPress={drop}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        <View style={styles.tabW} />
        <View style={styles.tabW} />
        <View style={styles.tabW} />
        <View style={styles.tab} />
        <View style={styles.tabW} />
      </View>
      <TouchableOpacity onPress={next}>
        <View style={styles.scrollButton}>
          <Text style={styles.scrollButtonText}>Next</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.ball} />
      <Modal
        animationType="fade"
        presentationStyle="pageSheet"
        transparent={false}
        visible={modal}>
        <View style={styles.modal}>
          <Text style={styles.selectHeader}>
            {express ? 'Select Express DeadLine' : 'Select Normal Deadline'}
          </Text>
          <View style={!express ? styles.calender : styles.calenderExpress}>
            <TouchableOpacity style={styles.drop}>
              <Text
                style={
                  !express
                    ? {...styles.sortTxt, color: 'rgba(61,119,130,.26)'}
                    : {...styles.sortTxt, color: 'rgba(255,255,255,.96)'}
                }
                onPress={handleModal}>
                DeadLine
              </Text>
              <Icon
                name={display ? 'chevron-down' : 'chevron-up'}
                size={15}
                color="#000"
                onPress={handleModal}
              />
            </TouchableOpacity>

            <CalendarPicker width={widthPercentageToDP('80%')} />
            <View style={!move ? styles.ballmove : styles.ball} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelecctDeadline;

const styles = StyleSheet.create({
  group: {
    justifyContent: 'space-between',
  },
  shirtLogo: {
    alignSelf: 'center',
    marginBottom: heightPercentageToDP('5%'),
  },
  sortContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP('6%'),
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
    width: widthPercentageToDP('53%'),
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 20,
    padding: 7,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sortByContainerRequest: {
    width: widthPercentageToDP('53%'),
    borderWidth: 3,
    borderColor: '#5CE3D9',
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
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    color: '#fff',
    fontSize: heightPercentageToDP('2.5%'),
    marginBottom: heightPercentageToDP('5%'),
    width: 150,
    alignSelf: 'center',
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
  request: {
    color: '#5CE3D9',
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    borderColor: '#5CE3D9',
    fontSize: heightPercentageToDP('2.2%'),
  },
  modal: {
    backgroundColor: '#3D7782',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calender: {
    backgroundColor: '#fff',
    borderRadius: 18,
    // height: heightPercentageToDP('50%'),
    padding: 20,
  },
  calenderExpress: {
    backgroundColor: '#5CE3D9',
    borderRadius: 20,
    // height: heightPercentageToDP('50%'),
    padding: 20,
  },
  selectHeader: {
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('2.8%'),
    width: widthPercentageToDP('40%'),
    marginBottom: heightPercentageToDP('7%'),
  },
  ball: {
    width: widthPercentageToDP('38%'),
    backgroundColor: '#5CE3D9',
    height: heightPercentageToDP('20%'),
    borderRadius: 90,
    position: 'absolute',
    bottom: heightPercentageToDP('-23%'),
    right: widthPercentageToDP('-15%'),
    zIndex: -100000,
  },
  ballmove: {
    width: widthPercentageToDP('38%'),
    backgroundColor: '#5CE3D9',
    height: heightPercentageToDP('20%'),
    borderRadius: 90,
    position: 'absolute',
    bottom: heightPercentageToDP('68%'),
    right: widthPercentageToDP('15%'),
    zIndex: -1000000,
  },
});
