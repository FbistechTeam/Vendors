import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const OngoingLabel = ({title, day, color}) => {
  return (
    <View>
      <Card containerStyle={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.days}>{day}</Text>
      </Card>
    </View>
  );
};

export default OngoingLabel;

const styles = StyleSheet.create({
  container: {
    borderRadius: 39,
    backgroundColor: '#5CE3D9',
    width: widthPercentageToDP('82%'),
    alignSelf: 'center',
    borderColor: 'transparent',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  title: {
    color: '#3D7782',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('2.5%'),
    textAlign: 'center',
  },
  days: {
    color: '#fff',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('1.875%'),
    textAlign: 'center',
  },
});
