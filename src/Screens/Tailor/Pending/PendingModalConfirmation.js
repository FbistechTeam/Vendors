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
import {Button, Card, Textarea} from 'native-base';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating';

const PendingModalConfirmation = ({
  modalVisible,
  closeModal,
  User,
  date,
  name,
  size,
  Data,
  Edit,
  Report,
  Rating,
  rate,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={styles.container}>
        <View style={styles.group}>
          <View style={styles.SummaryTop}>
            <Text style={styles.SummaryTopText}>Give A Review</Text>
          </View>
          <View style={styles.reqTop}>
            <View style={styles.user}>
              <Image
                source={require('../../../../assets/Profile.png')}
                style={styles.img}
              />
              <Text style={styles.usertxt}>Tailor 004</Text>
            </View>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rate}
              fullStarColor="#5CE3D9"
              emptyStarColor="#000"
              starSize={35}
              selectedStar={rating => Rating(rating)}
              starStyle={{marginVertical: 10}}
            />
            <Card style={styles.card}>
              <Textarea style={styles.textArea} placeholder="Type Something" />
            </Card>
          </View>

          <View style={styles.btnGroup}>
            <Button style={styles.btn} onPress={Edit}>
              <Text style={styles.btnTxt}>Send</Text>
            </Button>
            <Button style={styles.btn} onPress={closeModal}>
              <Text style={styles.btnTxt}>Not Now</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PendingModalConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .44)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: {
    width: widthPercentageToDP('87%'),
    maxHeight: heightPercentageToDP('88%'),
    padding: 25,
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
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.5)',
  },
  SummaryTopText: {
    fontSize: heightPercentageToDP('2.5%'),
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
  img: {
    height: heightPercentageToDP('6%'),
    width: widthPercentageToDP('10.6%'),
  },
  hide: {
    display: 'none',
  },
  usertxt: {
    color: '#000',
    fontSize: heightPercentageToDP('2.8%'),
    marginLeft: 10,
  },
  distance: {
    color: '#5CE3D9',
    fontSize: heightPercentageToDP('1.875%'),
  },
  reqTop: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 10,
    width: widthPercentageToDP('67%'),
    alignSelf: 'center',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  textArea: {
    width: widthPercentageToDP('75%'),
    height: heightPercentageToDP('16.6%'),
    padding: 10,
  },
  card: {
    borderRadius: 8,
    marginBottom: 20,
  },
});
