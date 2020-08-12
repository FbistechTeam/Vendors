import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Divider, Header} from 'react-native-elements';
import {Button} from 'native-base';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import NewCardModal from './NewCardModal';

const Payments = ({route, navigation}) => {
  const [visible, setVisible] = useState(false);

  const Cards = [
    {number: '**** **** **** 6171'},
    {number: '**** **** **** 6172'},
    {number: '**** **** **** 6173'},
  ];

  //   opens modal
  const handleVisible = () => {
    setVisible(!visible);
  };

  // closes modal
  const handleModalClose = () => {
    setVisible(false);
  };

  // navigates to tailor page
  const handleNavigation = () => {
    setVisible(false);
    navigation.navigate('TailorScreen', {
      title: 'New Premium Design',
    });
  };

  const handleDeluxeNavigation = () => {
    setVisible(false);
    navigation.navigate('TailorScreen', {
      title: 'New Deluxe Design',
    });
  };
  // navigates to regular page
  const handelRegularNavigation = () => {
    setVisible(false);
    navigation.navigate('Measurements');
  };
  return (
    <View style={styles.container}>
      <Header
        placement="center"
        backgroundColor="#fff"
        containerStyle={styles.barStyle}
        leftComponent={
          <Ionicons
            onPress={() => {
              navigation.openDrawer();
            }}
            name="bars"
            size={30}
            color="black"
            style={{paddingLeft: 23}}
          />
        }
        leftContainerStyle={styles.left}
        rightContainerStyle={styles.left}
        rightComponent={
          <Ionicons
            onPress={() => {
              navigation.navigate('HomePages');
            }}
            name="times"
            size={25}
            color="black"
            style={{paddingRight: 23}}
          />
        }
        centerComponent={{
          text: <Text style={styles.maiHeaderTxt}>Payments</Text>,
        }}
      />
      <View style={styles.group}>
        <Button style={styles.btn} onPress={handleVisible}>
          <Text style={styles.btnText}>Add New Card</Text>
        </Button>
        <FlatList
          data={Cards}
          keyExtractor={items => items.number}
          renderItem={({item, index}) => {
            return (
              <View
                style={index === Cards.length ? styles.noBorder : styles.cards}>
                <Text style={styles.cardTxt}>{item.number}</Text>
              </View>
            );
          }}
          contentContainerStyle={styles.content}
        />
      </View>
      <NewCardModal visible={visible} />
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({
  maiHeaderTxt: {
    color: '#3D7782',
    fontSize: heightPercentageToDP('2.5%'),
    paddingBottom: 20,
  },
  barStyle: {
    height: 67,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  left: {
    paddingBottom: 20,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    paddingBottom: 17,
  },
  group: {
    paddingVertical: 19,
  },
  headers: {
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('2.5%'),
    color: 'rgba(61, 119, 130, 1)',
    textAlign: 'center',
  },
  btn: {
    width: widthPercentageToDP('70%'),
    height: heightPercentageToDP('8%'),
    justifyContent: 'center',
    borderRadius: 32,
    backgroundColor: '#3D7984',
  },
  btnText: {
    fontSize: heightPercentageToDP('2.1875%'),
    color: '#fff',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  cards: {
    width: widthPercentageToDP('70%'),
    borderBottomWidth: 1,
    marginVertical: 15,
    paddingBottom: 7,
    borderBottomColor: '#3D7782',
  },
  cardTxt: {
    color: '#3D7782',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('2.5%'),
  },
  content: {
    marginVertical: 25,
  },
});
