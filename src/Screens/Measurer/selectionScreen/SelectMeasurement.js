import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  Platform,
  LayoutAnimation,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Shirt from '../../../assets/tape.svg';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SelectMeasurement = ({next}) => {
  const [display, setDisplay] = useState(false);
  const [display2, setDisplay2] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('Self Measurement');
  const [selectedFabric, setSelectedFabric] = useState('Fabrics');
  const styleSelection = [
    'Sen. Short With Cap',
    'Sen. Long With Cap',
    'Agbada With Cap',
    'Cap',
    'Short',
  ];
  const FabricSelection = [
    'Browse Fabrics',
    'Saved Items',
    'My Designs',
    'Upload Image',
  ];

  //drop down
  const drop = () => {
    LayoutAnimation.easeInEaseOut();
    setDisplay(!display);
    setDisplay2(false);
  };
  const drop2 = () => {
    LayoutAnimation.easeInEaseOut();
    setDisplay2(!display2);
    setDisplay(false);
  };
  // get selected style
  const handleSelected = data => {
    LayoutAnimation.easeInEaseOut();
    setSelectedStyle(data);
    setDisplay(false);
  };
  // get selected style
  const handleSelectedFabric = data => {
    LayoutAnimation.easeInEaseOut();
    setSelectedFabric(data);
    setDisplay2(false);
  };

  return (
    <View style={styles.group}>
      <View style={styles.shirtLogo}>
        <Shirt />
      </View>
      <Text style={styles.select}>Select Your Measurement</Text>

      <View style={styles.sortContainer}>
        <View style={styles.sortByContainer}>
          <View style={styles.drop}>
            <Text style={styles.sortTxt}>{selectedStyle}</Text>
            <Icon
              name={!display ? 'chevron-down' : 'chevron-up'}
              size={15}
              color="#fff"
              onPress={drop}
            />
          </View>
          <Divider
            style={
              !display ? {display: 'none'} : {marginVertical: 5, padding: 0.7}
            }
          />
          {styleSelection.map(data => {
            return (
              <View>
                <TouchableOpacity>
                  <Text
                    style={display ? styles.sortTxt : styles.display}
                    onPress={() => {
                      handleSelected(data);
                    }}>
                    {data}
                  </Text>
                </TouchableOpacity>
                <Divider
                  style={
                    !display
                      ? {display: 'none'}
                      : {marginVertical: 5, padding: 0.7}
                  }
                />
              </View>
            );
          })}
        </View>
        <TouchableOpacity style={styles.sortByContainerRequest}>
          <View style={styles.request}>
            <Text style={styles.request}>Request To Be Measured</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        <View style={styles.tabW} />
        <View style={styles.tabW} />
        <View style={styles.tab} />
        <View style={styles.tabW} />
        <View style={styles.tabW} />
      </View>
      <TouchableOpacity onPress={next}>
        <View style={styles.scrollButton}>
          <Text style={styles.scrollButtonText}>Next</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectMeasurement;

const styles = StyleSheet.create({
  group: {
    // height: heightPercentageToDP('75%'),
    justifyContent: 'space-between',
  },
  shirtLogo: {
    alignSelf: 'center',
    marginBottom: heightPercentageToDP('5%'),
  },
  sortContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP('6%'),
  },

  sort: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortTxt: {
    color: '#fff',
    fontSize: heightPercentageToDP('2.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginLeft: 9,
  },
  sortByContainer: {
    width: widthPercentageToDP('53%'),
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 20,
    padding: 7,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sortByContainerRequest: {
    width: widthPercentageToDP('53%'),
    borderWidth: 3,
    borderColor: '#5CE3D9',
    borderRadius: 20,
    padding: 7,
    alignSelf: 'center',
    marginBottom: 20,
  },
  drop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  display: {
    display: 'none',
  },
  list: {
    justifyContent: 'space-between',
  },
  scrollButton: {
    alignSelf: 'center',
    backgroundColor: 'white',
    height: heightPercentageToDP('6.65%'),
    width: 160,
    borderRadius: 32,
    justifyContent: 'center',
  },
  scrollButtonText: {
    textAlign: 'center',
    fontSize: heightPercentageToDP('2.18%'),
    color: '#3D7782',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  select: {
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    color: '#fff',
    fontSize: heightPercentageToDP('2.5%'),
    marginBottom: heightPercentageToDP('5%'),
    width: 150,
    alignSelf: 'center',
  },
  tabContainer: {
    width: widthPercentageToDP('50.2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: heightPercentageToDP('5%'),
  },
  tab: {
    borderBottomWidth: 3,
    width: widthPercentageToDP('8%'),
    borderBottomColor: '#5CE3D9',
  },
  tabW: {
    borderBottomWidth: 3,
    width: widthPercentageToDP('8%'),
    borderBottomColor: '#fff',
  },
  request: {
    color: '#5CE3D9',
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    borderColor: '#5CE3D9',
    fontSize: heightPercentageToDP('2.2%'),
  },
});
