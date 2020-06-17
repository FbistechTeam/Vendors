import React from 'react';
import {ScrollView, StyleSheet, Text, View, Modal} from 'react-native';
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Input,
} from 'native-base';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native-gesture-handler';

const Summery = ({visible, headerTitle, handleProceed}) => {
  return (
    <Modal
      animationType="fade"
      presentationStyle="fullScreen"
      transparent={false}
      visible={visible}>
      <View style={styles.modal}>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" style={{color: 'black'}} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerTxt}>{headerTitle}</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView>
          <Text style={styles.summaryTxt}>Summary</Text>
          <View>
            <View style={styles.group}>
              <Text style={styles.grouptxt}>Material 10 *6</Text>
              <Text style={styles.grouptxt}>15,000</Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.grouptxt}>Short Sleeve Senator</Text>
              <Text style={styles.grouptxt}>5,000</Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.grouptxt}>Cap</Text>
              <Text style={styles.grouptxt}>2,000</Text>
            </View>
            <View style={styles.xpressCharge}>
              <Text style={styles.xpressChargeText}>Express Charges</Text>
              <Text style={styles.xpressChargeText}>5,000</Text>
            </View>
            <View style={styles.Total}>
              <Text style={styles.TotalText}>Total</Text>
              <Text style={styles.TotalText}>27,000</Text>
            </View>
            <View style={styles.dilivery}>
              <Text style={styles.grouptxt}>
                To be delivered on or before Mon, 24th of June 2019
              </Text>
            </View>
            <Input
              multiline={true}
              numberOfLines={3}
              style={styles.input}
              placeholder="Add additional notes here"
              placeholderTextColor="rgba(0,0,0,.5)"
            />
            <Button style={styles.proceed} onPress={handleProceed}>
              <Text style={styles.proceedtxt}>Proceed to payment</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default Summery;
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
  },
  headerTxt: {
    fontSize: heightPercentageToDP('2.25%'),
    color: '#3D7782',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  summaryTxt: {
    textAlign: 'center',
    fontSize: heightPercentageToDP('2.52%'),
    color: '#3D7782',
    marginVertical: heightPercentageToDP('2.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPercentageToDP('68%'),
    alignSelf: 'center',
    borderBottomWidth: 1,
    marginBottom: heightPercentageToDP('2%'),
    borderBottomColor: '#3D7782',
  },
  grouptxt: {
    color: '#3D7782',
    fontSize: heightPercentageToDP('2.2%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  xpressCharge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPercentageToDP('68%'),
    alignSelf: 'center',
  },
  xpressChargeText: {
    color: '#5CE3D9',
    fontSize: heightPercentageToDP('2.2%'),
  },
  Total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPercentageToDP('68%'),
    alignSelf: 'center',
    marginVertical: heightPercentageToDP('5%'),
  },
  TotalText: {
    color: '#3D7782',
    fontSize: heightPercentageToDP('2.52%'),
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 2,
    width: widthPercentageToDP('68%'),
    alignSelf: 'center',
    borderRadius: 23,
    borderColor: '#3D7782',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  proceed: {
    width: widthPercentageToDP('68%'),
    alignSelf: 'center',
    borderRadius: 32,
    backgroundColor: '#3D7782',
    height: heightPercentageToDP('8%'),
    justifyContent: 'center',
    marginTop: heightPercentageToDP('14%'),
  },
  proceedtxt: {
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('2.5%'),
    color: '#fff',
  },
  dilivery: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPercentageToDP('68%'),
    alignSelf: 'center',
    marginBottom: heightPercentageToDP('5%'),
  },
});
