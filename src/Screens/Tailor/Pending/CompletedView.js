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
import moment from 'moment';

const CompletedView = ({
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
    <View style={styles.container}>
      <View style={styles.group}>
        {/* <Text style={styles.UserTxt}>{User}</Text> */}

        <View style={styles.SummaryTop}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../../assets/Profile.png')}
              style={styles.img}
            />
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: heightPercentageToDP('1.875%'),
                }}>
                {Data.user.first_name + ' ' + Data.user.last_name}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: heightPercentageToDP('1.5%'),
                }}>
                {Data.order_name}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: '#000',
                fontSize: heightPercentageToDP('1.25%'),
              }}>
              Due by {moment(Data.dead_line_date).format('YYYY-MM-DD')}
            </Text>
            {/* <Text
              style={{
                color: '#000',
                fontSize: heightPercentageToDP('1.5%'),
              }}>
              15,000NGN
            </Text> */}
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.MesurementTitle}>{Data.measurement.title}</Text>
          {Data.measurement.properties.map(data => (
            <>
              <View style={styles.list}>
                <Text>{data.cat_prop.title}</Text>
                <Text>{data.size}</Text>
              </View>
            </>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default CompletedView;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .44)',
    alignItems: 'center',
    justifyContent: 'center',
    height: heightPercentageToDP('66%'),
    borderBottomWidth: 1,
    paddingBottom: 1,
  },
  group: {
    width: widthPercentageToDP('79%'),
    height: heightPercentageToDP('66%'),
    padding: 19,
    backgroundColor: '#fff',
  },
  UserTxt: {
    fontSize: heightPercentageToDP('2.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    // paddingBottom: 5,
  },
  SummaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  SummaryTopText: {
    fontSize: heightPercentageToDP('1.875%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  SummaryTopTextR: {
    fontSize: heightPercentageToDP('1.25%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    textAlign: 'right',
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
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: '#000',
    borderBottomWidth: 1,
    borderTopWidth: 1,
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
    justifyContent: 'space-between',
  },
  img: {
    height: heightPercentageToDP('6%'),
    width: widthPercentageToDP('10.6%'),
    marginRight: 5,
  },
});
