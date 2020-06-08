import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Call from '../../../../assets/call.svg';
import Message from '../../../../assets/message.svg';
import Cancel from '../../../../assets/cancel.svg';
import {Button} from 'react-native-elements';
import PendingModal from './PendingModal';

const Data = [
  {
    id: 1,
    user: ' User098',
    distance: '3 miles away',
    Transit: false,
  },
  {
    id: 2,
    user: ' User097',
    distance: '3 miles away',
    Transit: true,
  },
];

const VendorPending = ({Measurements}) => {
  const [btn, setBtn] = useState('Arrived');
  const [dispatch, setDispatch] = useState(false);

  const navigation = useNavigation();

  // const handleArrived = id => {
  //   setId(id);
  // };
  return (
    <SafeAreaView>
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
          {Data.map(data => {
            return (
              <View key={data.id} style={styles.TopView}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    borderBottomColor: '#fff',
                    borderBottomWidth: 0.5,
                    paddingBottom: 10,
                  }}>
                  <Text style={{color: '#fff', fontSize: 19}}>
                    Material Name
                    <Text style={{color: '#5CE3D9', fontSize: 13}}>
                      {'     '}7 yard
                    </Text>
                  </Text>
                  <Text style={{color: '#5CE3D9', fontSize: 13}}>Due Date</Text>
                </View>
                <View style={styles.reqTop}>
                  <View style={styles.user}>
                    <Image
                      source={require('../../../../assets/Profile.png')}
                      style={styles.img}
                    />
                    <Text style={styles.usertxt}>{data.user}</Text>
                  </View>
                  <Text style={styles.distance}>{data.distance}</Text>
                </View>
                <View style={styles.actionGroup}>
                  <TouchableOpacity>
                    <Text style={styles.actions}>
                      <Call /> Call
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.actions}>
                      <Message /> Message
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={
                    !data.Transit
                      ? {
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }
                      : styles.hide
                  }>
                  <Button
                    id={data.id}
                    title="Dispatch"
                    buttonStyle={styles.btn}
                    onPress={title => {
                      setDispatch(true);
                    }}
                    titleStyle={{color: '#000'}}
                  />
                  <Button
                    id={data.id}
                    title="Cancel"
                    buttonStyle={styles.btn}
                    onPress={() => {
                      navigation.navigate('Measurements');
                    }}
                    titleStyle={{color: '#000'}}
                  />
                </View>
                <View style={data.Transit ? '' : styles.hide}>
                  <Button
                    id={data.id}
                    title="In Transit"
                    buttonStyle={styles.btnT}
                    onPress={() => {
                      navigation.navigate('Measurements');
                    }}
                    titleStyle={{color: '#000'}}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <PendingModal
        modalVisible={dispatch}
        closeModal={() => {
          setDispatch(false);
        }}
      />
    </SafeAreaView>
  );
};

export default VendorPending;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    // flex: 1,
  },
  group: {
    paddingVertical: 19,
  },
  TopView: {
    // height: heightPercentageToDP('26.9%'),
    backgroundColor: '#000',
    width: widthPercentageToDP('89%'),
    borderRadius: 8,
    padding: 19,
    marginBottom: 20,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: heightPercentageToDP('6%'),
    width: widthPercentageToDP('10.6%'),
  },
  hide: {
    display: 'none',
  },
  usertxt: {
    color: '#fff',
    fontSize: heightPercentageToDP('2.8%'),
    marginLeft: 10,
  },
  distance: {
    color: '#5CE3D9',
    fontSize: heightPercentageToDP('1.875%'),
  },
  reqTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  mapView: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 8,
  },
  actions: {
    fontSize: heightPercentageToDP('2.031%'),
    color: '#fff',
  },
  actionGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  btn: {
    backgroundColor: '#5CE3D9',
    height: heightPercentageToDP('7.5%'),
    marginVertical: 10,
    width: widthPercentageToDP('37.6%'),
  },
  btnT: {
    backgroundColor: '#5CE3D9',
    height: heightPercentageToDP('7.5%'),
    marginVertical: 10,
  },
});
