import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const NewCardModal = ({visible, keyPress}) => {
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        alert('Modal has been closed.');
      }}>
      <View style={styles.container}>
        <Header
          placement="center"
          backgroundColor="#fff"
          containerStyle={styles.barStyle}
          leftComponent={
            <Ionicons
              onPress={() => {
                // navigation.openDrawer();
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
                // navigation.navigate('HomePages');
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
        <View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="**** **** **** 1234"
              keyboardType="number-pad"
              onKeyPress={keyPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewCardModal;

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
  input: {
    width: widthPercentageToDP('70%'),
    borderBottomWidth: 1,
    textAlign: 'center',
    marginVertical: 50,
  },
});
