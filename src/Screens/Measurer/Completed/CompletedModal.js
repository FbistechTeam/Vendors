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
  status,
}) => {
  const data = User;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      {status && (
        <View style={styles.container}>
          <View style={styles.group}>
            <Text style={styles.UserTxt}>
              {data.user.first_name + ' ' + data.user.last_name}
            </Text>
            <View style={styles.SummaryTop}>
              <Text style={styles.SummaryTopText}>
                {User.measurement.title}
              </Text>
              <View>
                <Text style={styles.SummaryTopTextR}>Last Edited</Text>
                <Text style={styles.SummaryTopTextR}>
                  {data.measurement.updated_at}
                </Text>
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.MesurementTitle}>{data.title}</Text>
              {data.measurement.properties.map(data => {
                return (
                  <View key={data.cat_prop.title} style={styles.list}>
                    <Text>{data.cat_prop.title}</Text>
                    <Text>{data.size}</Text>
                  </View>
                );
              })}
            </ScrollView>
            {/* <View style={styles.ratingGroup}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={4}
                  fullStarColor="#5CE3D9"
                  emptyStarColor="#000"
                  starSize={15}
                />
                <Text style={{marginLeft: 5, fontSize: 12}}>Edit Rating</Text>
              </View>
              <TouchableOpacity onPress={Report}>
                <Text style={styles.report}>Report User</Text>
              </TouchableOpacity>
            </View> */}
            <View style={styles.btnGroup}>
              {/* <Button style={styles.btn} onPress={Edit}>
                <Text style={styles.btnTxt}>Edit</Text>
              </Button> */}
              <Button style={styles.btn} onPress={closeModal}>
                <Text style={styles.btnTxt}>Cancel</Text>
              </Button>
            </View>
          </View>
        </View>
      )}
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
    justifyContent: 'center',
    marginTop: 20,
  },
});
