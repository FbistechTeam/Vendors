/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Toast} from 'native-base';
import Switches from 'react-native-switches';
import GreyWallet from '../../../../assets/Group2633.svg';
import Wallet from '../../../../assets/Group 2634.svg';
import Archivment from './Archivment';
import {Data} from './ArchivmentData';
import StatsLabel from '../../../components/StatsLabel';
import StarRating from 'react-native-star-rating';
import usePurse from '../../generalHooks/usePurse';
import {useNavigation} from '@react-navigation/native';
import useAnalytics from '../hooks/useAnalytics';
import Achievements from '../../../../assets/archivement.svg';
import Accepted from '../../../../assets/accepted.svg';
import Measurement from '../../../../assets/measurement.svg';
import {useSelector} from 'react-redux';
import useProfile from '../../generalHooks/useProfile';
import {HandleAllRequest} from '../../../Api/Instance';

const Homepage = ({route}) => {
  const [visible, setVisible] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [name, setName] = useState('');
  const [purse, setPurse] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };

  const {userData, isLogged, playerCalled, signal} = useSelector(
    state => state.LoginReducer,
  );
  let {access_token} = userData;

  const navigation = useNavigation();

  //**gets user Profile */
  const getProfile = async () => {
    setLoading(true);
    try {
      const response = HandleAllRequest(
        'vendors/profile?provider=vendor',
        'get',
        access_token,
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          console.log('garrit');
          setProfile(data.data);
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
        }
      });
    } catch (err) {
      setLoading(false);
    }
  };

  //**get purse info */
  const Run = () => {
    setLoading(true);
    /**gets user purse */
    const request = HandleAllRequest(
      'vendors/purse?provider=vendor',
      'get',
      access_token,
    );

    request.then(data => {
      let p = data.data;
      let s = data.status;
      let m = data.message;
      if (s) {
        setPurse(data.data);
        setLoading(false);
      } else {
        Toast.show({
          text: m,
          buttonText: 'Okay',
          position: 'top',
          type: 'danger',
          duration: 5000,
          style: Style,
        });
        // setMsg(m);
        setLoading(false);
      }
    });
  };

  //**this runs the analytics */
  const RunAnalytics = async () => {
    setLoading(true);
    try {
      const request = HandleAllRequest(
        'vendors/measurer/analytics/total_accepted_requests?provider=vendor',
        'get',
        access_token,
      );
      await request.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setAccepted(data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });

      //**gets ongoing projects */
      const requestCompleted = HandleAllRequest(
        'vendors/measurer/analytics/total_completed_jobs?provider=vendor',
        'get',
        access_token,
      );
      await requestCompleted.then(data => {
        let s2 = data.status;
        let m2 = data.message;
        if (s2) {
          setCompleted(data.data);
        } else {
          setLoading(false);
        }
      });
    } catch (err) {
      // setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  const init = async () => {
    await RunAnalytics();
    await Run();
    await getProfile();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text>Hello {profile.first_name}</Text>,
    });
  }, [navigation, profile.first_name]);

  //**initializes screan */
  useEffect(() => {
    if (signal) {
      navigation.navigate('Pending');
    }
    console.log('again');
    init();
  }, []);

  const Data = [
    {svg: <Accepted />, value: accepted, text: 'Requests Accepted'},
    {
      svg: <Measurement />,
      value: completed,
      text: 'Measurements Taken',
    },
    // {svg: <Achievements />, value: 103, text: 'Achievements Unlocked'},
  ];

  const data = [
    {
      name: 'User 01',
      feedback: 'Early and Great human interaction',
      time: '2 days ago',
      rate: 4,
    },
    {
      name: 'User 03',
      feedback: 'Early and Great human interaction',
      time: '2 days ago',
      rate: 4.5,
    },
    {
      name: 'User 02',
      feedback: 'Early and Great human interaction',
      time: '2 days ago',
      rate: 2,
    },
  ];

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
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
            <View style={styles.status}>
              {/* <Text style={styles.TopTxt}>
                {switchValue ? (
                  <View style={styles.spot} />
                ) : (
                  <View style={styles.greySpot} />
                )}
                {switchValue ? ' Online' : ' Offline'}
              </Text> */}
              {/* <View style={styles.Switches}>
                <Switches
                  shape={'pill'}
                  buttonColor="#000"
                  buttonSize={17}
                  showText={false}
                  sliderHeight={heightPercentageToDP('3.45%')}
                  sliderWidth={widthPercentageToDP('11%')}
                  colorSwitchOn="#5CE3D9"
                  colorSwitchOff="#707070"
                  onChange={() => setSwitchValue(!switchValue)}
                  borderColor={switchValue ? '#5CE3D9' : '#707070'}
                  value={switchValue}
                  animationDuration={100}
                />
              </View> */}
            </View>
            <View style={styles.Wallet}>
              <Wallet />
            </View>
            <Text style={styles.bal}>Sew Balance</Text>
            <Text style={switchValue ? styles.amt : styles.amt}>
              {purse.current_balance}
              <Text style={switchValue ? styles.amts : styles.amts}>NGN</Text>
            </Text>
            {/* <Text style={styles.dueDate}>Next withdrawal due 7th April 20</Text> */}
          </View>
          <View style={styles.top}>
            {Data.map(data => {
              return (
                <Archivment
                  img={data.svg}
                  value={data.value}
                  text={data.text}
                />
              );
            })}
          </View>
          {/* <View style={styles.review}>
            <View style={styles.stats}>
              <Text style={styles.stats_title}>Reviews</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.stats_rates}>87 Reviews | 4.0</Text>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={4}
                  fullStarColor="#5CE3D9"
                  emptyStarColor="#fff"
                  starSize={15}
                />
              </View>
            </View>
            {data.map(data => {
              return (
                <StatsLabel
                  time={data.time}
                  day={data.feedback}
                  title={data.name}
                  rating={data.rate}
                />
              );
            })}
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Homepage;

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
    height: heightPercentageToDP('26.9%'),
    backgroundColor: '#000',
    width: widthPercentageToDP('89%'),
    borderRadius: 8,
    padding: 11,
  },
  spot: {
    height: 10,
    width: 10,
    backgroundColor: '#5CE3D9',
    borderRadius: 10,
  },
  greySpot: {
    height: 10,
    width: 10,
    backgroundColor: '#707070',
    borderRadius: 10,
  },
  TopTxt: {
    color: '#fff',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  Switches: {
    transform: [{rotate: '180deg'}],
  },
  Wallet: {
    alignItems: 'center',
    position: 'relative',
    top: -10,
  },
  bal: {
    color: '#fff',
    textAlign: 'center',
    fontSize: heightPercentageToDP('1.875%'),

    marginVertical: 12.55,
  },
  amt: {
    color: '#5CE3D9',
    fontSize: heightPercentageToDP('6.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    textAlign: 'center',
  },
  amtgrey: {
    color: '#707070',
    fontSize: heightPercentageToDP('6.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    textAlign: 'center',
  },
  amts: {
    color: '#5CE3D9',
    fontSize: heightPercentageToDP('2.26%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  amtsgrey: {
    color: '#707070',
    fontSize: heightPercentageToDP('2.26%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  dueDate: {
    color: '#fff',
    fontSize: heightPercentageToDP('1.66%'),
    paddingVertical: 10,
    textAlign: 'center',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 17,
  },
  review: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 13,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5,
    paddingBottom: 13,
  },
  stats_title: {
    color: '#fff',
    fontSize: heightPercentageToDP('2.5%'),
  },
  stats_rates: {
    color: '#fff',
    fontSize: heightPercentageToDP('1.875%'),
    marginRight: 5,
  },
});
