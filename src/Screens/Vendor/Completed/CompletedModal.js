import React from 'react';
import {
  View,
  Text,
  Modal,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Button} from 'native-base';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating';

const CompletedModal = ({
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
          <View>
            {/* <Text style={styles.UserTxt}>{User}</Text> */}
            <View style={styles.SummaryTop}>
              <View style={styles.SummaryTopText} />
              <View>
                <Text style={styles.SummaryTopTextRt}>{date}Material Type</Text>
                <Text style={styles.SummaryTopTextR}>Material Name</Text>
                <Text style={styles.SummaryTopTextRtt}>{date}6 Yards</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../../../assets/Profile.png')}
                  style={styles.userImage}
                />
                <Text style={{fontSize: 19, marginLeft: 10}}>Tailor 004</Text>
              </View>
              <Text style={{fontSize: 11}}>5 miles Away</Text>
            </View>
          </View>

          <View>
            <View style={styles.ratingGroup}>
              <View style={{alignItems: 'center'}}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={4}
                  fullStarColor="#5CE3D9"
                  emptyStarColor="#000"
                  starSize={20}
                />
                <Text style={{marginLeft: 5, fontSize: 12, color: '#707070'}}>
                  Delivered Today 02:45pm
                </Text>
              </View>
            </View>
            <View style={styles.btnGroup}>
              <Button style={styles.btn} onPress={closeModal}>
                <Text style={styles.btnTxt}>close</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CompletedModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .44)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: {
    width: widthPercentageToDP('77%'),
    height: heightPercentageToDP('70%'),
    padding: 19,
    backgroundColor: '#fff',
    borderRadius: 6,
    justifyContent: 'space-between',
  },
  UserTxt: {
    fontSize: heightPercentageToDP('2.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    // paddingBottom: 5,
  },
  SummaryTop: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  SummaryTopText: {
    fontSize: heightPercentageToDP('2.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    height: heightPercentageToDP('13.5%'),
    width: widthPercentageToDP('24%'),
    backgroundColor: '#707070',
    borderRadius: 8,
  },
  SummaryTopTextR: {
    fontSize: heightPercentageToDP('2.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginLeft: 10,
  },
  SummaryTopTextRt: {
    fontSize: heightPercentageToDP('1.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginLeft: 10,
  },
  SummaryTopTextRtt: {
    fontSize: heightPercentageToDP('1.85%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginLeft: 10,
  },
  MesurementTitle: {
    fontSize: heightPercentageToDP('2.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginTop: 10,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  ratingGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  report: {
    color: '#3D7782',
    fontSize: heightPercentageToDP('1.875%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
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
    justifyContent: 'center',
  },
  userImage: {
    height: heightPercentageToDP('6.3%'),
    width: widthPercentageToDP('11.3%'),
  },
});
