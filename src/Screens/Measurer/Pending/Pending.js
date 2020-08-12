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
import {HandleAllRequest} from '../../../Api/Instance';
import {Toast} from 'native-base';

const Pending = ({Measurements}) => {
  const [btn, setBtn] = useState('Arrived');
  const [id, setId] = useState();
  const [pending, setPending] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [segment, setSegment] = useState(false);
  const [notificationPush, notificationOff] = useOnesignal();

  const {userData, isLogged, playerCalled, signal} = useSelector(
    state => state.LoginReducer,
  );
  let {access_token} = userData;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };

  //**this is to get all job request */
  const GetJObs = async () => {
    setLoading(true);
    try {
      const request = HandleAllRequest(
        'vendors/measurer/jobs/pending?provider=vendor',
        'get',
        access_token,
      );
      request.then(data => {
        let s = data.status;
        let m = data.message;
        let pend = data.data;
        if (s) {
          setLoading(false);
          if (pend.length <= 0) {
            Toast.show({
              text: 'No Pending Request',
              buttonText: 'Okay',
              position: 'top',
              type: 'danger',
              duration: 5000,
              style: Style,
            });
          } else {
            setPending(data.data);
          }
        } else {
          setLoading(false);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'danger',
            duration: 5000,
            style: Style,
          });
        }
      });

      //**gets ongoing projects */
      const requestOngoing = HandleAllRequest(
        'vendors/measurer/jobs/ongoing?provider=vendor',
        'get',
        access_token,
      );
      requestOngoing.then(data => {
        let s2 = data.status;
        let m2 = data.message;
        if (s2) {
          setOngoing(data.data);
        } else {
          setLoading(false);
          Toast.show({
            text: m2,
            buttonText: 'Okay',
            position: 'top',
            type: 'danger',
            duration: 5000,
            style: Style,
          });
        }
      });
    } catch (err) {
      // setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  /**to accept requests */
  const AcceptRequest = async job_id => {
    setLoading(true);
    const dataId = {job_id};
    try {
      const requestOngoing = HandleAllRequest(
        'vendors/measurer/jobs/accept?provider=vendor',
        'put',
        access_token,
        dataId,
      );
      requestOngoing.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'success',
            duration: 5000,
            style: Style,
          });
          GetJObs();
          setLoading(false);
        } else {
          setLoading(false);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'danger',
            duration: 5000,
            style: Style,
          });
          GetJObs();
        }
      });
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  //**initial  */
  const init = async () => {
    await GetJObs();
    await notificationOff();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
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
                        navigation.navigate('Measurements', {
                          job_id: data.id,
                        });
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
