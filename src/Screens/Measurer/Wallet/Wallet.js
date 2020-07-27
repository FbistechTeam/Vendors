import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button, Textarea, Card, CardItem} from 'native-base';
import WalletModal from './WalletModal';
import Ok from '../../../../assets/ok.svg';
import usePurse from '../../generalHooks/usePurse';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

const data = [
  {name: 'Sew Points', time: '34 mins ago', amount: 'N 3100'},
  {name: 'UserO94', time: '34 mins ago', amount: 'N 3100'},
  {name: 'UserO95', time: '34 mins ago', amount: 'N 3100'},
  {name: 'UserO97', time: '34 mins ago', amount: 'N 3100'},
];

const Wallet = () => {
  const [modalView, setModalView] = useState(false);
  const [pending, setPending] = useState(true);
  const [withdrawn, setWithdrawn] = useState(false);
  const [all, setAll] = useState(false);
  // const [done, setDone] = useState(false);
  const [
    loadingP,
    Run,
    purse,
    withrawalRequest,
    done,
    setDone,
    pendingR,
    history,
    msg,
    PendHistory,
    withdrawHistory,
  ] = usePurse();

  const navigation = useNavigation();
  navigation.addListener('focus', async () => {
    // Prevent default action
    await Run();
  });

  const handlePending = () => {
    setPending(true);
    setWithdrawn(false);
    setAll(false);
    PendHistory();
  };
  const handleWithdraw = () => {
    setPending(false);
    setWithdrawn(true);
    setAll(false);
    withdrawHistory();
  };
  const handleAll = () => {
    setPending(true);
    setWithdrawn(true);
    setAll(true);
  };

  return (
    <SafeAreaView style={styles.up}>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
        showHideTransition
        hidden={false}
      />
      <Spinner
        visible={loadingP}
        textContent={'Please Wait...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={styles.group}>
          <View style={styles.TopView}>
            {msg !== '' && (
              <Text
                style={{
                  color: '#5CE3D9',
                  textAlign: 'center',
                  paddingVertical: 100,
                }}>
                {msg}
              </Text>
            )}
            {msg === '' && (
              <View>
                <Text style={styles.bal}>Sew Balance</Text>
                <Text style={styles.amt}>
                  {purse.current_balance}
                  <Text style={{fontSize: 16}}>NGN</Text>
                </Text>
                <Text style={styles.dueDate}>
                  Next withdrawal due 7th April 2020
                </Text>
                <Button
                  style={styles.saveBtn}
                  onPress={() => {
                    setModalView(true);
                  }}>
                  <Text style={styles.saveBtnTxt}>Withdraw</Text>
                </Button>
              </View>
            )}
          </View>
          <View style={styles.btnGroup}>
            <Button
              style={pending ? styles.saveWallet : styles.saveWalletB}
              onPress={handlePending}>
              <Text style={pending ? styles.saveBtnTxt : styles.saveBtnTxtB}>
                Pending
              </Text>
            </Button>

            <Button
              style={withdrawn ? styles.saveWallet : styles.saveWalletB}
              onPress={handleWithdraw}>
              <Text style={withdrawn ? styles.saveBtnTxt : styles.saveBtnTxtB}>
                Withdrawn
              </Text>
            </Button>
            <Button
              style={all ? styles.saveWallet : styles.saveWalletB}
              onPress={handleAll}>
              <Text style={all ? styles.saveBtnTxt : styles.saveBtnTxtB}>
                All
              </Text>
            </Button>
          </View>
          {pending && (
            <Card style={styles.card}>
              <Text style={styles.saveBtnTxt}>Pending</Text>
              {pendingR.map(Data => {
                return (
                  <CardItem style={styles.cardItem}>
                    <Text style={styles.cardName}>{Data.amount}</Text>
                    <Text style={styles.cardTime}>
                      {Data.is_approved === 1 ? 'Approved' : 'Pending'}
                    </Text>
                    <Text style={styles.cardAmt}>
                      {moment(Data.created_at).format('YYYY-MM-DD')}
                    </Text>
                  </CardItem>
                );
              })}
            </Card>
          )}
          {withdrawn && (
            <Card style={styles.card}>
              <Text style={styles.saveBtnTxt}>Withdrawn</Text>
              {history.map(Data => {
                return (
                  <CardItem style={styles.cardItem}>
                    <Text style={styles.cardName}>{Data.amount}</Text>
                    <Text style={styles.cardTime}>
                      {Data.is_approved === 1 ? 'Approved' : 'Pending'}
                    </Text>
                    <Text style={styles.cardAmt}>
                      {moment(Data.created_at).format('YYYY-MM-DD')}
                    </Text>
                  </CardItem>
                );
              })}
            </Card>
          )}
        </View>
      </ScrollView>
      <WalletModal
        amount={purse.current_balance}
        modalVisible={modalView}
        closeModal={() => {
          setModalView(false);
        }}
        Proceed={() => {
          setModalView(false);
          withrawalRequest(purse.current_balance);
        }}
      />
      <Modal animationType="fade" transparent={false} visible={done}>
        <View style={styles.addModalContainer}>
          <View style={styles.addedContainer}>
            <View style={styles.headerAddContainer}>
              <Ok />
              <Text style={styles.addedText}>
                {purse.current_balance}NGN Has Been Sent To Your Account
              </Text>
              <Text style={styles.addedTextsub}>
                10% has been deducted from your Sew Wallet
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <Button
                style={styles.btnN}
                onPress={() => {
                  setDone(false);
                  navigation.navigate('wallet');
                }}>
                <Text style={styles.btnTxt}>Continue</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  up: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    padding: 19,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    // flex: 1,
  },
  group: {
    alignItems: 'center',
  },
  TopView: {
    // height: heightPercentageToDP('26.9%'),
    backgroundColor: '#000',
    width: widthPercentageToDP('89%'),
    borderRadius: 8,
    padding: 12,
  },
  bal: {
    color: '#fff',
    textAlign: 'center',
    fontSize: heightPercentageToDP('1.875%'),
  },
  amt: {
    color: '#5CE3D9',
    fontSize: heightPercentageToDP('7.3%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    textAlign: 'center',
  },
  dueDate: {
    color: '#fff',
    fontSize: heightPercentageToDP('1.66%'),
    textAlign: 'center',
  },
  status: {
    fontSize: heightPercentageToDP('3.12%'),
    color: '#fff',
    alignSelf: 'center',
  },
  saveBtn: {
    width: widthPercentageToDP('50.7%'),
    height: heightPercentageToDP('7.5%'),
    alignSelf: 'center',
    marginVertical: 25,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#5CE3D9',
    // marginBottom: heightPercentageToDP('10%'),
  },
  saveBtnTxt: {
    fontSize: heightPercentageToDP('2.1875%'),
    color: '#000',
  },
  saveBtnTxtB: {
    fontSize: heightPercentageToDP('2.1875%'),
    color: '#fff',
  },
  btnGroup: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    width: widthPercentageToDP('89%'),
  },
  saveWallet: {
    width: widthPercentageToDP('26.7%'),
    height: heightPercentageToDP('5.5%'),
    alignSelf: 'center',
    marginVertical: 25,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#fff',
    // marginBottom: heightPercentageToDP('10%'),
  },
  saveWalletB: {
    width: widthPercentageToDP('26.7%'),
    height: heightPercentageToDP('5.5%'),
    alignSelf: 'center',
    marginVertical: 25,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#000',
    // marginBottom: heightPercentageToDP('10%'),
  },
  card: {
    width: widthPercentageToDP('89%'),
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  cardItem: {
    justifyContent: 'space-between',
    // padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  cardName: {
    fontSize: heightPercentageToDP('2.5115%'),
  },
  cardTime: {
    fontSize: heightPercentageToDP('1.8115%'),
    color: '#5CE3D9',
  },
  cardAmt: {
    fontSize: heightPercentageToDP('2.5%'),
    color: '#5CE3D9',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#3D7782',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addModalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',

    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: heightPercentageToDP('6%'),
  },
  header: {
    color: 'white',
    fontSize: heightPercentageToDP('3.9%'),
    textAlign: 'center',
  },
  subHeader: {
    color: '#5CE3D9',
    fontSize: heightPercentageToDP('1.875%'),
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  inputs: {
    width: widthPercentageToDP('68%'),
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    color: '#FFFFFF',
    fontSize: heightPercentageToDP('2.18%'),
    textAlign: 'center',
    paddingBottom: 1,
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  btn: {
    width: widthPercentageToDP('42.7%'),
    backgroundColor: '#fff',
    height: heightPercentageToDP('6.75%'),
    justifyContent: 'center',
    borderRadius: 26,
    marginVertical: heightPercentageToDP('3.5%'),
  },
  btnTxt: {
    fontSize: heightPercentageToDP('2.2%'),
    color: '#3D7984',
  },
  addedContainer: {
    height: heightPercentageToDP('59.2%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP('10%'),
  },
  addedText: {
    color: '#fff',
    fontSize: heightPercentageToDP('3.525%'),
    width: widthPercentageToDP('59%'),
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginVertical: heightPercentageToDP('3%'),
  },
  addedTextsub: {
    color: '#5CE3D9',
    fontSize: heightPercentageToDP('1.825%'),
    width: widthPercentageToDP('59%'),
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginVertical: heightPercentageToDP('3%'),
  },
  btnN: {
    width: widthPercentageToDP('42.7%'),
    backgroundColor: '#fff',
    height: heightPercentageToDP('6.75%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: heightPercentageToDP('1.75%'),
  },
  headerAddContainer: {
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
