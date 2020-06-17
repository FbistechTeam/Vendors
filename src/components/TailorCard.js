import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Card, CardItem} from 'native-base';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Star from '../../assets/star.svg';

const TailorCard = ({name, rating, location, onSelect}) => {
  return (
    <View>
      <TouchableOpacity onPress={onSelect}>
        <Card style={styles.container}>
          <View style={styles.cardheader}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/add.png')}
                style={styles.add}
              />
            </TouchableOpacity>
          </View>

          <CardItem footer style={styles.cardfooter}>
            <View>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.location}>{location}</Text>
            </View>
            <View style={styles.rating}>
              <Text style={styles.rates}>{rating}</Text>
              <Star />
            </View>
          </CardItem>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default TailorCard;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP('44%'),
    // height: heightPercentageToDP('30.6%'),
    borderRadius: 32,
    position: 'relative',
  },
  cardheader: {
    height: heightPercentageToDP('22.6%'),
    backgroundColor: '#7AEFD4',
    borderTopRightRadius: 11,
    borderTopLeftRadius: 11,
  },
  cardfooter: {
    height: heightPercentageToDP('8%'),
    borderBottomRightRadius: 11,
    borderBottomLeftRadius: 11,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  add: {
    position: 'absolute',
    right: 0,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    width: widthPercentageToDP('10%'),
    justifyContent: 'space-between',
  },
  name: {
    fontSize: heightPercentageToDP('2.34%'),
    color: '#3D7782',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  location: {
    fontSize: heightPercentageToDP('1.8%'),
    color: '#5CE3D9',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  rates: {
    fontSize: heightPercentageToDP('1.8%'),
    color: '#3D7782',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
});
