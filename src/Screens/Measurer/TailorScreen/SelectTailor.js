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
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SearchBar, Divider} from 'react-native-elements';
import Sort from '../../../assets/sort.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import TailorCard from '../../components/TailorCard';
import {TailorData} from './TailorData';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SelectTailor = ({route, navigation}) => {
  const [search, setSearch] = useState('');
  const [display, setDisplay] = useState(false);
  const updateSearch = search => {
    let value = search;
    setSearch(value);
  };

  // set params and title
  const {title} = route.params;
  navigation.setOptions({title});

  //   set sort by drop down
  const drop = () => {
    LayoutAnimation.easeInEaseOut();
    setDisplay(!display);
  };

  //handles selected tailor
  const handleSelected = data => {
    navigation.navigate('SelectionScreen', {data, title});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}> Select a Tailor</Text>
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
              color="#fff"
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
      {/* <ScrollView>
        <TailorCard />
      </ScrollView> */}
      <FlatList
        data={TailorData}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item}) => (
          <TailorCard
            name={item.name}
            location={item.location}
            rating={item.rating}
            onSelect={() => {
              handleSelected(item);
            }}
          />
        )}
        keyExtractor={item => item.location}
        columnWrapperStyle={styles.list}
      />
    </View>
  );
};

export default SelectTailor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D7782',
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
    color: '#fff',
    fontSize: heightPercentageToDP('2.5%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
    marginLeft: 9,
  },
  sortByContainer: {
    width: widthPercentageToDP('39%'),
    borderWidth: 1,
    borderColor: '#fff',
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
});
