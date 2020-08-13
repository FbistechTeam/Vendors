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
  FlatList,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {Toast} from 'native-base';
import {Button, Divider} from 'react-native-elements';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Fab, Card} from 'native-base';
import Switches from 'react-native-switches';
import GreyWallet from '../../../../assets/Group2633.svg';
import Wallet from '../../../../assets/Group 2634.svg';
import Add from '../../../../assets/Add Button.svg';
import Archivment from './Archivment';
import StatsLabel from '../../../components/StatsLabel';
import StarRating from 'react-native-star-rating';
import FabricStyle from './FabricStyle';
import {FabricData} from './FabricData';
import AddModal from './AddModal';
import useHome from './hooks/useHome';
import {useSelector, useDispatch} from 'react-redux';
import useAnalytics from './hooks/useAnalytics';
import usePurse from '../../generalHooks/usePurse';
import Achievementts from '../../../../assets/archivement.svg';
import Accepted from '../../../../assets/VendorRequest.svg';
import Measurement from '../../../../assets/accepted.svg';
import EditModal from './editModal';
import {useNavigation} from '@react-navigation/native';
import useProfile from '../../generalHooks/useProfile';
import {HandleAllRequest} from '../../../Api/Instance';
import InstanceTwo from '../../../Api/InstanceTwo';

const VendorHomepage = ({route}) => {
  const [visible, setVisible] = useState(false);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [inputs, setInputs] = useState({});
  const [materials, setMaterials] = useState([]);
  const [purse, setPurse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(false);
  const [profile, setProfile] = useState([]);
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [Achievements, setAchievements] = useState([]);
  const [completed, setCompleted] = useState([]);
  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;
  const options = {mediaType: 'photo'};

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };

  const reload = () => {
    const request = new Promise(res => {
      res(
        InstanceTwo.get('vendors/materials?provider=vendor', {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        }),
      );
    });
    request.then(({data: data}) => {
      console.log('started', data);
      setMaterials(data.data);
    });
  };

  const Analytics = async () => {
    setLoading(true);
    try {
      const request = HandleAllRequest(
        'vendors/retailer/analytics/achievements?provider=vendor',
        'get',
        access_token,
      );
      request.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setAchievements(data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });

      //**gets ongoing projects */
      const requestCompleted = HandleAllRequest(
        'vendors/retailer/analytics/sold_out?provider=vendor',
        'get',
        access_token,
      );
      requestCompleted.then(data => {
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

  const updateProfile = async data => {
    setLoading(true);
    try {
      const response = HandleAllRequest(
        'vendors/profile/update?provider=vendor',
        'put',
        access_token,
        data,
      );
      response.then(Data => {
        let s = Data.status;
        let m = Data.message;

        if (s) {
          setLoading(false);
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'success',
            duration: 5000,
            style: Style,
          });
          getProfile();
        } else {
          setLoading(false);
          // setReqMessage(m);
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
      //   setErrorMessage('Something went wrong');
      setLoading(false);
      alert(err);
    }
  };

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

  const navigation = useNavigation();
  const init = async () => {
    // Prevent default action
    await Run();
    await Analytics();
    await getProfile();
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text>Hello {profile.first_name}</Text>,
    });
  }, [navigation, profile.first_name]);
  useEffect(() => {
    init();
    const request = new Promise(res => {
      res(
        InstanceTwo.get('vendors/materials?provider=vendor', {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        }),
      );
    });
    request.then(({data: data}) => {
      setMaterials(data.data);
    });
  }, []);

  const Data = [
    // {svg: <Accepted />, value: 150, text: 'Requests Accepted'},
    {
      svg: <Measurement />,
      value: completed,
      text: 'Materials sold',
    },
    {
      svg: <Achievementts />,
      value: Achievements,
      text: 'Achievements Unlocked',
    },
  ];

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
            {msg == '' && (
              <View>
                <View style={styles.Wallet}>
                  <Wallet />
                </View>
                <Text style={styles.bal}>Sew Balance</Text>
                <Text style={styles.amt}>
                  {purse.length <= 0 ? '0' : purse.current_balance}
                  <Text style={styles.amts}>NGN</Text>
                </Text>
                {/* <Text style={styles.dueDate}>
                  Next withdrawal due 7th April 20
                </Text> */}
              </View>
            )}
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
          <View style={styles.materialContainer}>
            <View style={styles.materialContainerTop}>
              <Text style={styles.materialContainerTxt}>Material</Text>
              <TouchableOpacity
                onPress={() => {
                  setAdd(true);
                }}>
                <Add />
              </TouchableOpacity>
            </View>
            <View style={styles.fabrics}>
              {/* {materials.length <= 0 && <ActivityIndicator size={20} />} */}
              {materials.map(item => {
                return (
                  <FabricStyle
                    status={true}
                    name={item.title}
                    location={item.location}
                    rating={item.rating}
                    Price={item.Price}
                    image={item.img_url}
                    onSelect={() => {
                      setInputs(item);
                      setEdit(true);
                    }}
                  />
                );
              })}
            </View>
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
            {reviews.length <= 0 ? (
              <Text style={styles.msg}>{message}</Text>
            ) : (
              <ActivityIndicator />
            )}
            {reviews.map(data => {
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
          {/* <View style={styles.materialContainer}>
            <View style={styles.materialContainerTop}>
              <Text style={styles.materialContainerTxt}>Featured</Text>
            </View>
            <View style={styles.fabrics}>
              {FabricData.map(item => {
                return (
                  <FabricStyle
                    status={false}
                    name={item.name}
                    location={item.location}
                    rating={item.rating}
                    Price={item.Price}
                    onSelect={() => {
                      // handleSelected(item);
                    }}
                  />
                );
              })}
            </View>
          </View> */}
        </View>
      </ScrollView>
      <View style={{position: 'relative'}}>
        <TouchableOpacity
          style={styles.bigBtn}
          onPress={() => {
            setAdd(true);
          }}>
          <Text style={styles.bigBtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <AddModal
        modalVisible={add}
        closeModal={() => {
          setAdd(false);
          reload();
        }}
        reload={reload}
      />
      <EditModal
        modalVisible={edit}
        closeModal={() => {
          setEdit(false);
          reload();
        }}
        dataInput={inputs}
        reload={reload}
      />
    </SafeAreaView>
  );
};

export default VendorHomepage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
    // flex: 1,
  },
  group: {
    padding: 19,
  },
  TopView: {
    height: heightPercentageToDP('26.9%'),
    backgroundColor: '#000',
    width: widthPercentageToDP('89%'),
    borderRadius: 8,
    padding: 11,
    alignSelf: 'center',
    justifyContent: 'center',
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
    paddingTop: 10,
    textAlign: 'center',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 17,
  },
  review: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 13,
    marginBottom: 10,
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
  materialContainer: {
    backgroundColor: 'black',
    borderRadius: 8,
    marginBottom: 10,
    padding: 19,
  },
  materialContainerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  materialContainerTxt: {
    color: '#fff',
    fontSize: heightPercentageToDP('2.5%'),
  },
  fabrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  bigBtn: {
    height: 70,
    width: 70,
    borderRadius: 50,
    backgroundColor: '#5CE3D9',
    position: 'absolute',
    zIndex: 111,
    borderColor: 'transparent',
    top: heightPercentageToDP('-12%'),
    left: widthPercentageToDP('80%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 7,
  },
  bigBtnText: {
    fontSize: heightPercentageToDP('6%'),
  },
  msg: {
    color: '#fff',
    textAlign: 'center',
    paddingVertical: heightPercentageToDP('2%'),
  },
});
