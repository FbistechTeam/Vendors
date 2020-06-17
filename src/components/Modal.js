import React from 'react';
import {View, Text, Modal, Alert, StyleSheet} from 'react-native';
import {Button} from 'native-base';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {not} from 'react-native-reanimated';

const FullScreenModal = ({
  modalVisible,
  closeModal,
  navigateTailors,
  navigateDeluxe,
  measurement,
}) => {
  const Btn = [{title: 'Premium'}, {title: 'Deluxe'}, {title: 'Regular'}];
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.container}>
          <View style={styles.group}>
            {Btn.map(data => {
              return (
                <Button
                  style={styles.btn}
                  onPress={
                    data.title === 'Premium'
                      ? navigateTailors
                      : data.title === 'Deluxe'
                      ? navigateDeluxe
                      : measurement
                  }>
                  <Text key={data.title} style={styles.btnTxt}>
                    {data.title}
                  </Text>
                </Button>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FullScreenModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(61, 119, 130, .95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: widthPercentageToDP('41%'),
    borderRadius: 32,
    height: 63,
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  group: {
    height: heightPercentageToDP('34.2%'),
    justifyContent: 'space-between',
  },
  btnTxt: {
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('2.5%'),
    color: 'rgba(61, 119, 130, 1)',
  },
});
