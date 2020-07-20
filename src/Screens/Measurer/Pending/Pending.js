import React, {useState, useEffect} from 'react';
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
import useJobs from './hooks/useJobs';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {signalOffData} from '../../LoginScreen/Action/Action';
import useOnesignal from '../../../../useOnesignal';

const Data = [
  {
    id: 1,
    user: ' User098',
    distance: '3 miles away',
  },
  {
    id: 2,
    user: ' User097',
    distance: '3 miles away',
  },
];

const Pending = ({Measurements}) => {
  const [btn, setBtn] = useState('Arrived');
  const [id, setId] = useState();
  const [loading, pending, ongoing, GetJObs, AcceptRequest] = useJobs();
  const [segment, setSegment] = useState(false);
  const [notificationPush, notificationOff] = useOnesignal();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  navigation.addListener('focus', async () => {
    await GetJObs();
    await notificationOff();
  });

  const handleArrived = id => {
    console.log(id);
    setId(id);
  };
  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
        showHideTransition
        hidden={false}
      />
      <View style={styles.segmentContainer}>
        <TouchableOpacity
          onPress={() => {
            setSegment(false);
          }}>
          <Text style={segment ? styles.segmentOff : styles.segment}>
            Available
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            setSegment(true);
          }}>
          <Text style={!segment ? styles.segmentOff : styles.segment}>
            Ongoing
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={styles.group}>
          {!segment &&
            pending.map(data => {
              return (
                <View key={data.id} style={styles.TopView}>
                  <View style={styles.reqTop}>
                    <View style={styles.user}>
                      <Image
                        source={require('../../../../assets/Profile.png')}
                        style={styles.img}
                      />
                      <Text style={styles.usertxt}>
                        {data.user.first_name + ' ' + data.user.last_name}
                      </Text>
                    </View>
                    {/* <Text style={styles.distance}>data.distance</Text> */}
                  </View>
                  <View style={styles.map}>
                    <Text style={{color: '#fff'}}>
                      ADDRESS:{' '}
                      {data.user.address === null
                        ? ' Address not available'
                        : data.user.address}
                    </Text>
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
                    <TouchableOpacity>
                      <Text style={styles.actions}>
                        <Cancel /> Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Button
                      id={data.id}
                      title="Accept"
                      buttonStyle={id === data.id ? styles.hide : styles.btn}
                      onPress={title => {
                        // handleArrived(data.id);
                        AcceptRequest(data.id);
                      }}
                    />
                    <Button
                      id={data.id}
                      title="Start Measurement"
                      buttonStyle={id !== data.id ? styles.hide : styles.btn}
                      onPress={() => {
                        navigation.navigate('Measurements');
                      }}
                    />
                  </View>
                </View>
              );
            })}
          {segment &&
            ongoing.map(data => {
              console.log(data);
              return (
                <View key={data.id} style={styles.TopView}>
                  <View style={styles.reqTop}>
                    <View style={styles.user}>
                      <Image
                        source={require('../../../../assets/Profile.png')}
                        style={styles.img}
                      />
                      <Text style={styles.usertxt}>
                        {data.user.first_name + ' ' + data.user.last_name}
                      </Text>
                    </View>
                    {/* <Text style={styles.distance}>data.distance</Text> */}
                  </View>
                  <View style={styles.map}>
                    {/* <Image
                      source={require('../../../../assets/Map.png')}
                      style={id === data.id ? styles.hide : styles.mapView}
                    /> */}
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
                    <TouchableOpacity>
                      <Text style={styles.actions}>
                        <Cancel /> Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Button
                      id={data.id}
                      title="Start Measurement"
                      buttonStyle={styles.btn}
                      onPress={() => {
                        navigation.navigate('Measurements', {job_id: data.id});
                      }}
                    />
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={styles.spinnerTextStyle}
      />
    </SafeAreaView>
  );
};

export default Pending;

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
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(61,119,130,.75)',
  },
  divider: {
    borderWidth: 0.8,
    borderColor: 'rgba(61,119,130,1)',
  },
  segment: {
    fontSize: heightPercentageToDP('2.5%'),
    color: 'rgba(61,119,130,1)',
  },
  segmentOff: {
    fontSize: heightPercentageToDP('2.5%'),
    color: 'rgba(61,119,130,.4)',
  },
});
