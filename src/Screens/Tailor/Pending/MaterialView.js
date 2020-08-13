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
import Camera from '../../../../assets/camera.svg';
import moment from 'moment';

const MaterialView = ({
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
  let styleImage = {
    uri: `${Data.style.img_url}`,
  };
  let fabricImage = {
    uri: `${Data.fabric.img_url}`,
  };

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
          <Text style={styles.ref}>Reference</Text>
          <View style={styles.ImageView}>
            <Image
              source={styleImage}
              style={styles.styleImager}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.ref}>Material</Text>
          <View style={styles.MaterialContainer}>
            <Image
              source={fabricImage}
              style={styles.blub}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.blubText}>{Data.fabric.title}</Text>
              <Text style={styles.blubTxt}>{Data.fabric.approval}</Text>
              {/* <Text style={styles.blubTxt}>6 Yards</Text> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MaterialView;

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
  ImageView: {
    backgroundColor: '#707070',
    height: heightPercentageToDP('35%'),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  styleImager: {
    // backgroundColor: '#000',
    height: heightPercentageToDP('35%'),
    width: widthPercentageToDP('70%'),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ref: {
    marginVertical: 10,
  },
  MaterialContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  blub: {
    height: heightPercentageToDP('12.5%'),
    width: widthPercentageToDP('24%'),
    backgroundColor: '#707070',
    borderRadius: 8,
    marginRight: 10,
  },
});
