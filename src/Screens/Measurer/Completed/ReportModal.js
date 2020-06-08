import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  UIManager,
  LayoutAnimation,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Header, Divider} from 'react-native-elements';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Textarea} from 'native-base';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ReportModal = ({navigation, modalVisible, closeModal}) => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.container}>
          <Header
            placement="center"
            backgroundColor="#fff"
            containerStyle={styles.barStyle}
            rightContainerStyle={styles.left}
            rightComponent={
              <Ionicons
                onPress={closeModal}
                name="times"
                size={25}
                color="black"
                style={{
                  paddingRight: 23,
                }}
              />
            }
            centerComponent={{
              text: <Text style={styles.maiHeaderTxt}>Submit A Report</Text>,
            }}
          />
          <View style={styles.group}>
            <View>
              <TextInput style={styles.input} placeholder="What Went Wrong?" />
              <Textarea
                style={[styles.inputArea]}
                numberOfLines={10}
                placeholder="Additional Info"
              />
            </View>
            <Button style={styles.saveBtn} onPress={closeModal}>
              <Text style={styles.saveBtnTxt}>Submit</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReportModal;

const styles = StyleSheet.create({
  maiHeaderTxt: {
    color: '#000',
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
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },

  group: {
    width: widthPercentageToDP('89.3%'),
    flex: 1,
    justifyContent: 'space-between',
  },

  saveBtn: {
    width: widthPercentageToDP('42.7%'),
    height: heightPercentageToDP('7%'),
    alignSelf: 'center',
    marginVertical: 25,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#000',
    marginBottom: heightPercentageToDP('10%'),
  },
  saveBtnTxt: {
    fontSize: heightPercentageToDP('2.1875%'),
    color: '#fff',
  },
  input: {
    borderRadius: 8,
    borderColor: '#000',
    height: heightPercentageToDP('5.8%'),
    borderWidth: 1,
    marginTop: 20,
  },
  inputArea: {
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 1,
    height: heightPercentageToDP('28.8%'),
    marginTop: 20,
  },
});
