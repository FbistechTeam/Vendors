/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SearchBar, Divider, Button} from 'react-native-elements';
import Sort from '../../../../assets/sort.svg';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {Toast} from 'native-base';
import CarouselModal from '../Pending/CarouselModal';
import useComplete from './hooks/useComplete';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {HandleAllRequest} from '../../../Api/Instance';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CompleteTailor = ({route}) => {
  const [search, setSearch] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('Date');
  const [display, setDisplay] = useState(false);
  const [user, SetUser] = useState('');
  const [results, setResults] = useState([]);
  const [openCarousel, setOpenCarousel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultsData, setResultsData] = useState([]);
  const {userData, tailor_category_id} = useSelector(
    state => state.LoginReducer,
  );
  let {access_token} = userData;

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };

  //** sort fabrics */
  const ViewRequest = async job_id => {
    setLoading(true);
    setResultsData([]);
    try {
      const response = HandleAllRequest(
        `vendors/tailor/jobs/${job_id}/details?provider=vendor`,
        'get',
        access_token,
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setResultsData(data.data);
          setOpenCarousel(true);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } catch (err) {
      //   setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  const run = () => {
    setLoading(true);
    const request = HandleAllRequest(
      'vendors/tailor/jobs/completed?provider=vendor',
      'get',
      access_token,
    );
    request
      .then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setResults(data.data);
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
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const navigation = useNavigation();

  const init = () => {
    run();
  };

  useEffect(() => {
    init();
  }, []);

  const updateSearch = search => {
    let value = search;
    setSearch(value);
  };

  //   set sort by drop down
  const drop = () => {
    LayoutAnimation.easeInEaseOut();
    setDisplay(!display);
  };

  //set Date change
  const onDateChange = date => {
    let selected = moment(date).format('Do MMM YYYY');
    setSelectedStartDate(selected);
    setDisplay(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.sortContainer}>
          <View style={styles.sort}>
            <Sort />
            <Text style={styles.sortTxt}>Select Date</Text>
          </View>
          <View style={styles.sortByContainer}>
            <View style={styles.drop}>
              <TouchableOpacity>
                <Text style={styles.sortTxt} onPress={drop}>
                  {selectedStartDate}
                </Text>
              </TouchableOpacity>
              <Icon
                name={!display ? 'chevron-down' : 'chevron-up'}
                size={15}
                color="#000"
                onPress={drop}
              />
            </View>
            <View style={display ? '' : styles.display}>
              <CalendarPicker
                width={widthPercentageToDP('60%')}
                onDateChange={onDateChange}
              />
            </View>
          </View>
        </View> */}
        {results.map(data => {
          return (
            <TouchableOpacity
              key={data.id}
              style={styles.TopView}
              onPress={() => {
                ViewRequest(data.id);
              }}>
              <View style={styles.reqTop}>
                <View style={styles.user}>
                  <Image
                    source={require('../../../../assets/Profile.png')}
                    style={styles.img}
                  />
                  <Text style={styles.usertxt}>{data.order_name}</Text>
                </View>
                <Text style={styles.distance}>
                  {moment(data.completed_at).format('YYYY-MM-DD')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <CarouselModal
        modalVisible={openCarousel}
        closeModal={() => {
          setOpenCarousel(false);
        }}
        sewData={resultsData}
      />
    </SafeAreaView>
  );
};

export default CompleteTailor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 17,
  },
  headerTxt: {
    fontSize: heightPercentageToDP('3.125%'),
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    color: '#fff',
    paddingBottom: 20,
  },
  searchContainer: {
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,.32)',
  },
  text: {
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('2.5%'),
    padding: 0,
    color: '#3D7782',
  },
  sortContainer: {
    marginVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  sort: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortTxt: {
    // color: '#E4E4E5',
    color: '#000',
    fontSize: heightPercentageToDP('2.2%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginLeft: 9,
  },
  sortByContainer: {
    minWidth: widthPercentageToDP('39%'),
    borderWidth: 1,
    borderColor: '#E4E4E5',
    // height: 32,
    borderRadius: 8,
    padding: 7,
  },
  drop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  display: {
    display: 'none',
  },
  list: {
    justifyContent: 'space-between',
  },
  TopView: {
    // height: heightPercentageToDP('26.9%'),
    backgroundColor: '#000',
    width: widthPercentageToDP('89%'),
    borderRadius: 8,
    padding: 19,
    marginBottom: 20,
    alignSelf: 'center',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: heightPercentageToDP('6%'),
    width: widthPercentageToDP('10.6%'),
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
  usertxt: {
    color: '#fff',
    fontSize: heightPercentageToDP('2.8%'),
    marginLeft: 10,
  },
  spinnerTextStyle: {
    color: '#fff',
  },
});
