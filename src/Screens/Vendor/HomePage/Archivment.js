import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const Archivment = ({img, value, text}) => {
  return (
    <View style={styles.container}>
      <View>{img}</View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Archivment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5CE3D9',
    width: widthPercentageToDP('26%'),
    height: heightPercentageToDP('15%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
    padding: 11,
    justifyContent: 'center',
  },
  value: {
    fontSize: heightPercentageToDP('3.5%'),
    color: '#fff',
  },
  text: {
    fontSize: heightPercentageToDP('1.25%'),
    color: '#000',
    textAlign: 'center',
    width: widthPercentageToDP('18.8%'),
  },
});
