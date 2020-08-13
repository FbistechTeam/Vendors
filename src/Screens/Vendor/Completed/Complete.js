/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
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
import Sort from '../../../../assets/sort.svg';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import CompletedModal from './CompletedModal';
import {CompleteData} from './CompleteData';
import useSold from './hooks/useSold';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Toast} from 'native-base';
import {useSelector} from 'react-redux';
import {HandleAllRequest} from '../../../Api/Instance';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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

const CompleteVendor = ({route}) => {
  const [search, setSearch] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('Date');
  const [CompletedModalView, setCompletedModalView] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [display, setDisplay] = useState(false);
  const [user, SetUser] = useState('');
  const [sold, setSold] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

  const Style = {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
    borderRadius: 6,
  };

  const FilterByDate = date_value => {
    setLoadings(true);
    const request = HandleAllRequest(
      `vendors/materials/sold-out/${date_value}/filter?provider=vendor`,
      'get',
      access_token,
    );

    request.then(data => {
      let s = data.status;
      let m = data.message;
      if (s) {
        setSold(data.data);
        setLoadings(false);
      } else {
        setLoadings(false);
        RunSold();
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
  };

  const RunSold = () => {
    setLoadings(true);
    const request = HandleAllRequest(
      'vendors/materials/sold-out?provider=vendor',
      'get',
      access_token,
    );

    request
      .then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setSold(data.data);
          setLoadings(false);
        } else {
          Toast.show({
            text: m,
            buttonText: 'Okay',
            position: 'top',
            type: 'danger',
            duration: 5000,
            style: Style,
          });
          setLoadings(false);
        }
      })
      .catch(err => {
        setLoadings(false);
      });
  };

  let navigation = useNavigation();

  const init = () => {
    RunSold();
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
    let selected = moment(date).format('YYYY-MM-DD');
    FilterByDate(selected);
    setSelectedStartDate(selected);
    setDisplay(false);
  };

  // handle completed request
  const handleCompletedRequest = user => {
    SetUser(user);
    setCompletedModalView(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={loadings}
        textContent={'Please Wait...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sortContainer}>
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
        </View>
        {sold.map(data => {
          return (
            <TouchableOpacity
              key={data.job_id}
              style={styles.TopView}
              onPress={() => {
                // handleCompletedRequest(data);
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  borderBottomColor: '#fff',
                  borderBottomWidth: 0.5,
                  paddingBottom: 10,
                }}>
                <Text style={{color: '#fff', fontSize: 19}}>
                  {data.material.title}
                  <Text style={{color: '#5CE3D9', fontSize: 13}}>
                    {'     '}7 yard
                  </Text>
                </Text>
                <Text style={{color: '#5CE3D9', fontSize: 13}}>
                  NGN{' '}
                  {parseInt(`${data.material.price_per_yard}`).toLocaleString()}
                  /Yard
                </Text>
              </View>
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
                <Text style={styles.distance}>{data.distance}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <CompletedModal
        modalVisible={CompletedModalView}
        User={user}
        Data={CompleteData}
        closeModal={() => {
          setCompletedModalView(false);
        }}
        Edit={() => {
          setEditModal(true);
        }}
        Report={() => {
          setReportModal(true);
        }}
      />
    </SafeAreaView>
  );
};

export default CompleteVendor;

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
    marginTop: 10,
  },
  usertxt: {
    color: '#fff',
    fontSize: heightPercentageToDP('2.8%'),
    marginLeft: 10,
  },
});
