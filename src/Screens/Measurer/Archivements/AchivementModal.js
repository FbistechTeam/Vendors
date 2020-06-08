import React from 'react';
import {
  View,
  Text,
  Modal,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'native-base';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating';

const AchivementModal = ({
  modalVisible,
  closeModal,
  User,
  date,
  name,
  size,
  Data,
  Edit,
  Report,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={styles.container}>
        <View style={styles.group}>
          <View style={styles.SummaryTop}>
            <Text style={styles.SummaryTopText}>
              Convert 3,100 Sew Points To Your Sew Wallet?
            </Text>
          </View>
          <Text style={styles.SummaryTopText}>1 Sew Point = 1NGN</Text>

          <View style={styles.btnGroup}>
            <Button style={styles.btn} onPress={Edit}>
              <Text style={styles.btnTxt}>Proceed</Text>
            </Button>
            <Button style={styles.btn} onPress={closeModal}>
              <Text style={styles.btnTxt}>Cancel</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AchivementModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .44)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: {
    width: widthPercentageToDP('77%'),
    maxHeight: heightPercentageToDP('88%'),
    padding: 19,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  UserTxt: {
    fontSize: heightPercentageToDP('2.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    // paddingBottom: 5,
  },
  SummaryTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  SummaryTopText: {
    fontSize: heightPercentageToDP('2.1875%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    width: widthPercentageToDP('50%'),
    textAlign: 'center',
    paddingVertical: 11,
    alignSelf: 'center',
  },
  SummaryTopTextR: {
    fontSize: heightPercentageToDP('1.25%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    textAlign: 'right',
  },
  btnTxt: {
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('2.185%'),
    color: '#fff',
  },
  btn: {
    width: widthPercentageToDP('30.4%'),
    borderRadius: 8,
    height: heightPercentageToDP('7.5%'),
    justifyContent: 'center',
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
