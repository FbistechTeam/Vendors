import React, {useState} from 'react';
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
} from 'react-native';
import {Header} from 'react-native-elements';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {SearchBar, Divider} from 'react-native-elements';
import Sort from '../../../assets/sort.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import SegmentedControlIOS from '@react-native-community/segmented-control';
import {TailorData} from '../TailorScreen/TailorData';
import StyleCard from '../../components/StyleCard';
import FabricStyle from '../../components/FabricStyle';
import {FabricData} from './FabricData';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Gallery = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [display, setDisplay] = useState(false);
  const [segment, setSegment] = useState(false);
  const updateSearch = search => {
    let value = search;
    setSearch(value);
  };

  //   set sort by drop down
  const drop = () => {
    LayoutAnimation.easeInEaseOut();
    setDisplay(!display);
  };

  //handles selected tailor

  return (
    <View style={styles.container}>
      <Header
        placement="center"
        backgroundColor="#fff"
        containerStyle={styles.barStyle}
        leftComponent={
          <Ionicons
            onPress={() => {
              navigation.openDrawer();
            }}
            name="bars"
            size={30}
            color="black"
            style={{paddingLeft: 23}}
          />
        }
        leftContainerStyle={styles.left}
        rightContainerStyle={styles.left}
        rightComponent={
          <Ionicons
            onPress={() => {
              navigation.openDrawer();
            }}
            name="bookmark"
            size={25}
            color="black"
            style={{paddingRight: 23}}
          />
        }
        centerComponent={{
          text: <Text style={styles.maiHeaderTxt}>Gallery</Text>,
        }}
      />
      <View style={styles.subContainer}>
        <View style={styles.segmentContainer}>
          <TouchableOpacity
            onPress={() => {
              setSegment(false);
            }}>
            <Text style={segment ? styles.segmentOff : styles.segment}>
              Styles
            </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            onPress={() => {
              setSegment(true);
            }}>
            <Text style={!segment ? styles.segmentOff : styles.segment}>
              Fabrics
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <SearchBar
            platform="android"
            placeholder="Search"
            containerStyle={styles.searchContainer}
            inputStyle={styles.text}
            onChangeText={updateSearch}
            value={search}
          />
        </View>
        <View style={styles.sortContainer}>
          <View style={styles.sort}>
            <Sort />
            <Text style={styles.sortTxt}>Sort by</Text>
          </View>
          <View style={styles.sortByContainer}>
            <View style={styles.drop}>
              <TouchableOpacity>
                <Text style={styles.sortTxt}>Name</Text>
              </TouchableOpacity>
              <Icon
                name={!display ? 'chevron-down' : 'chevron-up'}
                size={15}
                color="#3D7782"
                onPress={drop}
              />
            </View>
            <Divider
              style={
                !display ? {display: 'none'} : {marginVertical: 5, padding: 0.7}
              }
            />
            <TouchableOpacity>
              <Text style={display ? styles.sortTxt : styles.display}>
                Rating
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={FabricData}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item}) =>
            segment ? (
              <FabricStyle
                name={item.name}
                location={item.location}
                rating={item.rating}
                Price={item.Price}
                onSelect={() => {
                  // handleSelected(item);
                }}
              />
            ) : (
              <StyleCard
                name={item.name}
                location={item.location}
                rating={item.rating}
                onSelect={() => {
                  // handleSelected(item);
                }}
              />
            )
          }
          keyExtractor={item => item.location}
          columnWrapperStyle={styles.list}
        />
      </View>
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  maiHeaderTxt: {
    color: '#3D7782',
    fontSize: heightPercentageToDP('2.5%'),
    paddingBottom: 20,
  },
  barStyle: {
    height: 67,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  left: {
    paddingBottom: 20,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  subContainer: {
    // backgroundColor: '#3D7782',
    padding: 17,
    flex: 1,
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
    backgroundColor: 'rgba(142,142,147,.24)',
    borderColor: '#3D7782',
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
    color: '#3D7782',
    fontSize: heightPercentageToDP('2.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginLeft: 9,
  },
  sortByContainer: {
    width: widthPercentageToDP('39%'),
    borderWidth: 1,
    borderColor: '#3D7782',
    // height: 32,
    borderRadius: 20,
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
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 17,
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
