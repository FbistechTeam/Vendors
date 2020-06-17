import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Medal from '../../../../assets/medal.svg';
import {Button, Textarea, Card} from 'native-base';
import AchivementModal from './AchivementModal';
import {Medals} from './Medals';

const Archivements = () => {
  const [modalView, setModalView] = useState(false);
  return (
    <SafeAreaView style={styles.up}>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
        showHideTransition
        hidden={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={styles.group}>
          <View style={styles.TopView}>
            <Text style={styles.bal}>Sew Points Balance</Text>
            <Text style={styles.amt}>20,890</Text>
            <View style={styles.medal}>
              <Medal />
            </View>
            <Text style={styles.status}>Novice</Text>
            <Text style={styles.dueDate}>5/15 Achievements Unlocked</Text>
          </View>
          <Button
            style={styles.saveBtn}
            onPress={() => {
              setModalView(true);
            }}>
            <Text style={styles.saveBtnTxt}>Convert Points</Text>
          </Button>
          <View style={styles.med}>
            {Medals.map(data => {
              return (
                <Card
                  key={data.id}
                  style={
                    data.collected !== 'Point Collected'
                      ? styles.opacity
                      : styles.medalContainer
                  }>
                  <View>{data.medal}</View>
                  <Text style={styles.medalTxt}>{data.achievement}</Text>
                  <Text style={styles.medalTxtsub}>{data.collected}</Text>
                </Card>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <AchivementModal
        modalVisible={modalView}
        closeModal={() => {
          setModalView(false);
        }}
      />
    </SafeAreaView>
  );
};

export default Archivements;

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
    color: '#5CE3D9',
    fontSize: heightPercentageToDP('1.66%'),
    textAlign: 'center',
  },
  medal: {
    alignSelf: 'center',
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
    color: '#fff',
  },
  medalContainer: {
    width: widthPercentageToDP('28.7%'),
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    borderRadius: 8,
    elevation: 6,
  },
  medalTxt: {
    fontSize: heightPercentageToDP('1.875%'),
    textAlign: 'center',
  },
  medalTxtsub: {
    fontSize: heightPercentageToDP('1.25%'),
    textAlign: 'center',
    color: '#5CE3D9',
  },
  med: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  opacity: {
    width: widthPercentageToDP('28.7%'),
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    borderRadius: 8,
    elevation: 6,
    opacity: 0.4,
    backgroundColor: '#fff',
  },
});
