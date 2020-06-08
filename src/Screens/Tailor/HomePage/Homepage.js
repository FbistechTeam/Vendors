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
import {Button, Divider} from 'react-native-elements';
import {useSelector} from 'react-redux';
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
import ImagePicker from 'react-native-image-picker';
import useVendorHome from './useVendorHome';
import usePurse from '../../generalHooks/usePurse';
import useAnalytics from '../../generalHooks/useAnalytics';
import Achievements from '../../../../assets/archivement.svg';
import Accepted from '../../../../assets/VendorRequest.svg';
import Measurement from '../../../../assets/accepted.svg';
import {useNavigation} from '@react-navigation/native';

const TailorHomepage = ({route}) => {
  const [visible, setVisible] = useState(false);
  const [add, setAdd] = useState(false);
  // const [online, setonline] = useState(false);
  const [image, setImage] = useState({});
  const [images, setImages] = useState(false);
  const [
    loading,
    handleToggle,
    online,
    profile,
    styled,
    RunVendorHome,
  ] = useVendorHome();
  const [accepted, completed, reviews, message, RunAnalytics] = useAnalytics();
  const [
    loadingP,
    Run,
    purse,
    withrawalRequest,
    done,
    setDone,
    pendingR,
    history,
  ] = usePurse();
  const {userData, isLogged, playerCalled, signal} = useSelector(
    state => state.LoginReducer,
  );

  const Data = [
    {svg: <Accepted />, value: accepted, text: 'Requests Accepted'},
    {
      svg: <Measurement />,
      value: completed,
      text: 'Materials Delivered (89.5%)',
    },
    {svg: <Achievements />, value: 103, text: 'Achievements Unlocked'},
  ];

  useEffect(() => {
    if (signal) {
      navigation.navigate('Requests', {
        screen: 'Request Notification',
        params: {user: 'jane'},
      });
    }
  }, [navigation, signal]);

  const navigation = useNavigation();
  navigation.addListener('focus', async e => {
    // Prevent default action
    await Run();
    await RunAnalytics();
    await RunVendorHome();
  });

  const options = {};

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        handleImagePicker();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleImagePicker = () => {
    return ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log(source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setImage(source);
        setImages(true);
        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  };

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
            <View style={styles.status}>
              <Text style={styles.TopTxt}>
                {online ? (
                  <View style={styles.spot} />
                ) : (
                  <View style={styles.greySpot} />
                )}
                {online ? ' Online' : ' Offline'}
              </Text>
              <View style={styles.Switches}>
                <Switches
                  shape={'pill'}
                  buttonColor="#000"
                  buttonSize={17}
                  showText={false}
                  sliderHeight={heightPercentageToDP('3.45%')}
                  sliderWidth={widthPercentageToDP('11%')}
                  colorSwitchOn="#5CE3D9"
                  colorSwitchOff="#707070"
                  onChange={handleToggle}
                  borderColor={online ? '#5CE3D9' : '#707070'}
                  value={online}
                  animationDuration={100}
                />
              </View>
            </View>
            <View style={styles.Wallet}>
              {online ? <Wallet /> : <GreyWallet />}
            </View>
            <Text style={styles.bal}>Sew Balance</Text>
            <Text style={online ? styles.amt : styles.amtgrey}>
              {purse.current_balance}
              <Text style={online ? styles.amts : styles.amtsgrey}>NGN</Text>
            </Text>
            <Text style={styles.dueDate}>Next withdrawal due 7th April 20</Text>
          </View>
          <View style={styles.top}>
            {Data.map(data => {
              return (
                <Archivment
                  key={data.text}
                  img={data.svg}
                  value={data.value}
                  text={data.text}
                />
              );
            })}
          </View>

          <View style={styles.review}>
            <View style={styles.stats}>
              <Text style={styles.stats_title}>Reviews</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.stats_rates}>0 Reviews | 0</Text>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={0}
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
            {reviews.length > 0 &&
              data.map(data => {
                return (
                  <StatsLabel
                    key={data.date}
                    time={data.time}
                    day={data.feedback}
                    title={data.name}
                    rating={data.rate}
                  />
                );
              })}
          </View>
          <View style={styles.materialContainer}>
            <View style={styles.materialContainerTop}>
              <Text style={styles.materialContainerTxt}>Gallary</Text>
              <TouchableOpacity
                onPress={() => {
                  setAdd(true);
                }}>
                <Add />
              </TouchableOpacity>
            </View>
            <View style={styles.fabrics}>
              {styled.map(item => {
                return (
                  <FabricStyle
                    key={item.title}
                    status={true}
                    name={item.title}
                    location={item.location}
                    rating={item.rating}
                    Price={item.Price}
                    image={item.img_url}
                    onSelect={() => {
                      // handleSelected(item);
                    }}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <AddModal
        modalVisible={add}
        closeModal={() => {
          setAdd(false);
          setImage({});
          setImages(false);
        }}
        Add={requestCameraPermission}
        image={image}
        images={images}
      />
    </SafeAreaView>
  );
};

export default TailorHomepage;

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
    paddingVertical: 10,
    textAlign: 'center',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
