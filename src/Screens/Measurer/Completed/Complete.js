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
import {SearchBar, Divider, Button} from 'react-native-elements';
import Sort from '../../../../assets/sort.svg';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import CompletedModal from './CompletedModal';
import {CompleteData} from './CompleteData';
import EditCompleted from './EditCompleted';
import ReportModal from './ReportModal';
import useCompleted from './hooks/useCompleted';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Toast} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {HandleAllRequest} from '../../../Api/Instance';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Complete = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('Date');
  const [editModal, setEditModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [display, setDisplay] = useState(false);
  const [propt, setPropt] = useState([]);
  const [results, setResults] = useState([]);
  const [CompletedModalView, setCompletedModalView] = useState(false);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [measurement_id, setMeasurement_id] = useState(' ');
  const [user, SetUser] = useState('');
  const {userData} = useSelector(state => state.LoginReducer);
  let {access_token} = userData;

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

  const getList = async () => {
    setMeasurement_id(null);
    setLoading(true);
    try {
      const req = HandleAllRequest(
        'vendors/measurer/jobs/completed?provider=vendor',
        'get',
        access_token,
      );
      req.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setLoading(false);
          setResults(data.data);
        } else {
          Toast.show({
            text: m,
            buttonText: 'Okay',
            duration: 3000,
            type: 'danger',
            position: 'top',
          });
          setLoading(false);
        }
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePropts = async job_id => {
    setLoading(true);
    try {
      const response = HandleAllRequest(
        `vendors/measurer/jobs/${job_id}/details?provider=vendor`,
        'get',
        access_token,
      );
      response.then(data => {
        let s = data.status;
        let m = data.message;
        if (s) {
          setPropt(data.data);
          setCompletedModalView(true);
          setLoading(false);
          setStatus(true);
        } else {
          Toast.show({
            text: m,
            buttonText: 'Okay',
            duration: 3000,
            type: 'danger',
            position: 'top',
          });
          setLoading(false);
        }
      });
    } catch (err) {
      setLoading(false);
    }
  };

  //**initiate screen */
  const init = () => {
    getList();
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {results.map(data => {
          return (
            <TouchableOpacity
              key={data.id}
              style={styles.TopView}
              onPress={() => {
                handlePropts(data.id);
              }}>
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
                <Text style={styles.distance}>
                  {data.measurement_status.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <CompletedModal
        modalVisible={CompletedModalView}
        User={propt}
        Data={CompleteData}
        status={status}
        closeModal={() => {
          setCompletedModalView(false);
          setStatus(false);
        }}
        Edit={() => {
          setEditModal(true);
        }}
        Report={() => {
          setReportModal(true);
        }}
      />
      <EditCompleted
        modalVisible={editModal}
        closeModal={() => {
          setEditModal(false);
        }}
      />
      <ReportModal
        modalVisible={reportModal}
        closeModal={() => {
          setReportModal(false);
        }}
      />
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={styles.spinnerTextStyle}
      />
    </SafeAreaView>
  );
};

export default Complete;

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
    fontSize: heightPercentageToDP('2.2%'),
    marginLeft: 10,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
