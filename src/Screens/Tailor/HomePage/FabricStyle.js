import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Card, CardItem} from 'native-base';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Edit from '../../../../assets/editBtn.svg';

const FabricStyle = ({
  name,
  rating,
  location,
  Price,
  onSelect,
  status,
  image,
}) => {
  return (
    <TouchableOpacity>
      <Card style={styles.container} onPress={onSelect}>
        <View style={styles.cardheader}>
          <Image
            source={{
              uri: `${image}`,
            }}
            style={styles.img}
            resizeMethod="auto"
            resizeMode="cover"
          />
          <View style={!status ? styles.hide : styles.add}>
            <Edit />
          </View>
        </View>

        <CardItem footer style={styles.cardfooter}>
          <View>
            <Text style={styles.name}>{name}</Text>
            {/* <Text style={styles.location}>{Price}</Text> */}
          </View>
          <View style={styles.rating}>
            {/* <Text style={styles.rates}>{location}</Text> */}
          </View>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default FabricStyle;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP('38%'),
    // height: heightPercentageToDP('30.6%'),
    borderRadius: 32,
    position: 'relative',
  },
  cardheader: {
    height: heightPercentageToDP('15.6%'),
    backgroundColor: '#5CE3D9',
    borderTopRightRadius: 11,
    borderTopLeftRadius: 11,
  },
  cardfooter: {
    // height: heightPercentageToDP('5%'),
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
    width: widthPercentageToDP('14%'),
    justifyContent: 'space-between',
  },
  name: {
    fontSize: heightPercentageToDP('1.875%'),
    color: '#3D7782',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  location: {
    fontSize: heightPercentageToDP('1.8%'),
    color: '#5CE3D9',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  rates: {
    fontSize: heightPercentageToDP('1%'),
    color: '#3D7782',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  hide: {
    display: 'none',
  },
  img: {
    height: heightPercentageToDP('15.6%'),
    width: widthPercentageToDP('38%'),
    borderTopRightRadius: 11,
    borderTopLeftRadius: 11,
  },
});
