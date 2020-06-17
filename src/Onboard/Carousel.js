import React, {useState} from 'react';
import {
  Text,
  Image,
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const Carousel = ({navigation}) => {
  const [index, setIndex] = useState(0);

  // gets page index
  const getPageIndex = pageIndex => {
    setIndex(pageIndex);
  };

  const Square = ({isLight, selected}) => {
    let backgroundColor;
    if (isLight) {
      backgroundColor = selected ? '#5CE3D9' : 'rgba(92, 227, 217,0.43';
    } else {
      backgroundColor = selected ? '#5CE3D9' : 'rgba(92, 227, 217, 0.43)';
    }
    return (
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 8,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };

  // handles button on coursel done
  const Done = () => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate('SignUp');
      }}>
      <Text style={styles.btnText}>Next</Text>
    </TouchableOpacity>
  );
  // handles next button
  const Next = ({isLight, ...props}) => (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.btnText}>Next</Text>
    </TouchableOpacity>
  );
  const Skip = ({isLight, skipLabel, ...props}) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate('SignUp');
      }}>
      <Text style={styles.btnText}>Skip</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
      <Onboarding
        pageIndexCallback={getPageIndex}
        DotComponent={Square}
        DoneButtonComponent={Done}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        pages={[
          {
            backgroundColor: 'transparent',
            image: (
              <Image
                source={require('../../assets/slide1.png')}
                style={{display: 'none'}}
              />
            ),
            title: (
              <Text style={styles.text}>
                Take Fashion Measurements & Get Paid!
              </Text>
            ),
            subtitle: <Text style={{display: 'none'}}>and fabric</Text>,
          },
          {
            backgroundColor: 'transparent',
            image: (
              <Image
                source={require('../../assets/slide2.png')}
                style={{display: 'none'}}
              />
            ),
            title: (
              <Text style={styles.text}>Become A Registered Sew Retailer</Text>
            ),
            subtitle: <Text style={{display: 'none'}}>and fabric</Text>,
          },
          {
            backgroundColor: 'transparent',
            image: (
              <Image
                source={require('../../assets/slide3.png')}
                style={{display: 'none'}}
              />
            ),
            title: (
              <Text style={styles.text}>
                Work Your Way to Become #1 Fashion Designer In Lagos
              </Text>
            ),
            subtitle: <Text style={{display: 'none'}}>and fabric</Text>,
          },
        ]}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 25,
    width: widthPercentageToDP('70%'),
    textAlign: 'center',
    marginTop: '95%',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  button: {
    color: '#fff',
    backgroundColor: '#fff',
    width: 50,
    height: 30,
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  btnText: {
    color: '#3D7782',
    fontSize: 12,
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
});
