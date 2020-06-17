import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Rating, AirbnbRating, Card} from 'react-native-elements';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating';

const MeasurementLabel = ({title, day, rating}) => {
  return (
    <View>
      <Card containerStyle={styles.container}>
        <View style={styles.group}>
          <View>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {title}
            </Text>
          </View>
          <View>
            <Text style={styles.edit}>View/Edit</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default MeasurementLabel;

const styles = StyleSheet.create({
  container: {
    borderRadius: 39,
    backgroundColor: '#3D7782',
    width: widthPercentageToDP('82%'),
    alignSelf: 'center',
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingHorizontal: 25,
  },
  title: {
    color: '#fff',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('2.5%'),
    width: widthPercentageToDP('45%'),
  },
  days: {
    color: '#5CE3D9',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('1.875%'),
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 'auto',
    alignSelf: 'flex-end',
  },
  edit: {
    color: '#5CE3D9',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('1.875%'),
  },
});
