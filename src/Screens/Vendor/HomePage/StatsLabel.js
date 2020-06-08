import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Rating, AirbnbRating, Card} from 'react-native-elements';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating';

const StatsLabel = ({title, day, rating, time}) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.group}>
          <View>
            <View style={styles.picContainer}>
              <View style={styles.pic} />
              <Text style={styles.title}>{title}</Text>
            </View>

            <Text style={styles.days}>{day}</Text>
          </View>
          <View>
            {/* <Text style={styles.rating}>{rating}</Text> */}
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              fullStarColor="#5CE3D9"
              emptyStarColor="#fff"
              starSize={15}
            />
            <Text style={{color: '#fff', textAlign: 'right'}}>{time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StatsLabel;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 19,
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5,
  },
  title: {
    color: '#fff',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('2.5%'),
    marginLeft: 5,
  },
  days: {
    color: '#fff',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('1.875%'),
    marginTop: 9.5,
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
  pic: {
    height: 34,
    width: widthPercentageToDP('9.07%'),
    backgroundColor: '#fff',
    borderRadius: 34,
  },
  picContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
