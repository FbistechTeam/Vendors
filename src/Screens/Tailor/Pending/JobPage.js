import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Button} from 'native-base';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CompletedModal from '../../Measurer/Completed/CompletedModal';
import {CompleteData} from '../../Measurer/Completed/CompleteData';
import CompletedView from './CompletedView';
import MaterialView from './MaterialView';
import NoteView from './NoteView';
import useRequest from './useRequest';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

const JobPage = ({route}) => {
  const {itemId} = route.params;
  const [index, setIndex] = useState('');
  const [sliderWidth, setSliderWidth] = useState(widthPercentageToDP('79%'));
  const [
    loading,
    results,
    resultsOngoing,
    Messages,
    status1,
    ViewRequest,
    reqMessages,
    setReqMessage,
    CompleteRequest,
    run,
    AcceptRequest,
    jobInfo,
    resultsData,
    openCarousel,
    setOpenCarousel,
  ] = useRequest();
  const navigation = useNavigation();

  navigation.addListener('focus', () => {
    ViewRequest(itemId);
  });

  const message = [
    {
      title: <Text style={styles.msg}>{reqMessages}</Text>,
    },
  ];
  const carouselItems = [
    {
      title: (
        <View>
          <CompletedView Data={resultsData} />
        </View>
      ),
    },
    {
      title: (
        <View>
          <MaterialView Data={resultsData} />
        </View>
      ),
    },
    {
      title: (
        <View>
          <NoteView Data={resultsData} />
        </View>
      ),
    },
  ];

  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 5,
        }}>
        <View>{item.title}</View>
      </View>
    );
  };

  return (
    <>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      {!loading && (
        <View style={styles.container}>
          <View style={styles.group}>
            <Carousel
              layout={'stack'}
              layoutCardOffset={18}
              // ref={ref => (this.carousel = ref)}
              data={carouselItems}
              sliderWidth={sliderWidth}
              itemWidth={sliderWidth}
              renderItem={_renderItem}
              onSnapToItem={indexx => setIndex(indexx)}
            />
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={index}
              containerStyle={{backgroundColor: '#fff'}}
              dotStyle={styles.dotStyle}
              inactiveDotStyle={styles.dotStyleInactive}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
            <View style={styles.bottom}>
              <Button
                style={styles.btn}
                onPress={title => {
                  // setDispatch(true);
                  AcceptRequest(itemId);
                }}>
                <Text style={styles.btnTxt}>Accept</Text>
              </Button>
              <Button
                style={styles.btn}
                onPress={() => {
                  navigation.navigate('Requests');
                }}>
                <Text style={styles.btnTxt}>Close</Text>
              </Button>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default JobPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .44)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: {
    width: widthPercentageToDP('87%'),
    // height: heightPercentageToDP('88%'),
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
  },
  UserTxt: {
    fontSize: heightPercentageToDP('2.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    // paddingBottom: 5,
  },
  SummaryTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  SummaryTopText: {
    fontSize: heightPercentageToDP('2.1875%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    width: widthPercentageToDP('50%'),
    textAlign: 'center',
    paddingVertical: 11,
    alignSelf: 'center',
  },
  SummaryTopTextR: {
    fontSize: heightPercentageToDP('1.25%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    textAlign: 'right',
  },
  btnTxt: {
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: heightPercentageToDP('2.185%'),
    color: '#fff',
  },
  btn: {
    width: widthPercentageToDP('30.4%'),
    borderRadius: 8,
    height: heightPercentageToDP('7.5%'),
    justifyContent: 'center',
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    height: heightPercentageToDP('6%'),
    width: widthPercentageToDP('10.6%'),
  },
  hide: {
    display: 'none',
  },
  usertxt: {
    color: '#000',
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
    justifyContent: 'center',
    // paddingVertical: 10,
    width: widthPercentageToDP('67%'),
    alignSelf: 'center',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dotStyle: {
    height: 7,
    width: 7,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: '#5CE3D9',
  },
  dotStyleInactive: {
    height: 7,
    width: 7,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: '#707070',
  },
  msg: {
    textAlign: 'center',
    color: '#000',
    fontSize: heightPercentageToDP('1.875%'),
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
