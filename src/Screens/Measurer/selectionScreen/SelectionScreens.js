import React, {Component} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from 'react-native';
import {Card, CardItem} from 'native-base';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Star from '../../../assets/star.svg';
import StyleFabricSelection from './StyleFabricSelection';
import SelectMeasurement from './SelectMeasurement';
import SelecctDeadline from './SelectDeadline';
import Summery from './Summery';
import CardSelection from './CardSelection';

let scrollXPos = 0;

export default class SelectionScreens extends Component {
  constructor(props) {
    super(props);
    const {title, data, Type} = this.props.route.params;
    this.props.navigation.setOptions({title});
    this.state = {
      screenHeight: Dimensions.get('window').height,
      screenWidth: Dimensions.get('window').width,
      card: data,
      title: title,
      summaryModal: false,
      namestyleModal: false,
      addedModal: false,
      type: Type,
    };
  }

  //   set sort by drop down

  scrollToB = () => {
    scrollXPos = this.state.screenWidth * 1;
    this.scroller.scrollTo({x: scrollXPos, y: 0});
  };
  scrollToC = () => {
    scrollXPos = this.state.screenWidth * 2;
    this.scroller.scrollTo({x: scrollXPos, y: 0});
  };
  scrollToD = () => {
    scrollXPos = this.state.screenWidth * 3;
    this.scroller.scrollTo({x: scrollXPos, y: 0});
  };
  scrollToDReg = () => {
    this.setState({summaryModal: false});
    scrollXPos = this.state.screenWidth * 3;
    this.scroller.scrollTo({x: scrollXPos, y: 0});
  };
  scrollToE = () => {
    this.setState({summaryModal: false});
    scrollXPos = this.state.screenWidth * 4;
    this.scroller.scrollTo({x: scrollXPos, y: 0});
  };

  // handle summary Modal

  handleSummaryModal = () => {
    this.setState({summaryModal: !this.state.summaryModal});
  };
  handleNameStyleModal = () => {
    this.setState({namestyleModal: !this.state.namestyleModal});
  };
  handleAddeStyle = () => {
    this.setState({
      namestyleModal: false,
      addedModal: !this.state.addedModal,
    });
  };
  handleSewNavigation = () => {
    this.props.navigation.navigate('HomePages', {
      openSewModal: true,
    });
  };
  handleSewDashboard = () => {
    this.props.navigation.navigate('HomePages');
  };

  render() {
    const {
      card,
      type,
      title,
      summaryModal,
      namestyleModal,
      addedModal,
    } = this.state;

    return (
      <ScrollView
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        ref={scroller => {
          this.scroller = scroller;
        }}>
        <View
          style={
            type === 'Regular'
              ? styles.hide
              : [styles.screen, styles.screenColor]
          }>
          <View style={styles.group}>
            <Text style={styles.title}>You,ve Selected...</Text>
            <Card style={cardstyles.container}>
              <View style={cardstyles.cardheader}>
                <TouchableOpacity>
                  <Image
                    source={require('../../../assets/add.png')}
                    style={cardstyles.add}
                  />
                </TouchableOpacity>
              </View>

              <CardItem footer style={cardstyles.cardfooter}>
                <View>
                  <Text style={cardstyles.name}>
                    {type === 'Regular' ? '' : card.name}
                  </Text>
                  <Text style={cardstyles.location}>
                    {type === 'Regular' ? '' : card.location}
                  </Text>
                </View>
                <View>
                  <View style={cardstyles.rating}>
                    <Text style={cardstyles.rates}>
                      {type === 'Regular' ? '' : card.rating}
                    </Text>
                    <Star />
                  </View>
                  <Text style={{fontSize: 10}}>56 jobs completed</Text>
                </View>
              </CardItem>
            </Card>
            <View style={styles.tabContainer}>
              <View style={styles.tab} />
              <View style={styles.tabW} />
              <View style={styles.tabW} />
              <View style={styles.tabW} />
              <View style={styles.tabW} />
            </View>
            <TouchableOpacity onPress={this.scrollToB}>
              <View style={styles.scrollButton}>
                <Text style={styles.scrollButtonText}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.screen, styles.screenColor]}>
          <StyleFabricSelection
            next={type === 'Regular' ? this.scrollToB : this.scrollToC}
          />
        </View>
        <View style={[styles.screen, styles.screenColor]}>
          <SelectMeasurement
            next={type === 'Regular' ? this.scrollToC : this.scrollToD}
          />
        </View>
        <View style={[styles.screen, styles.screenColor]}>
          <SelecctDeadline next={this.handleSummaryModal} />
        </View>
        <View style={[styles.screen, styles.screenColor]}>
          <CardSelection
            nameStyleVisible={namestyleModal}
            next={this.handleNameStyleModal}
            added={this.handleAddeStyle}
            AddedStyleVisible={addedModal}
            sewAnother={this.handleSewNavigation}
            sewDashboard={this.handleSewDashboard}
          />
        </View>
        <Summery
          headerTitle={title}
          visible={summaryModal}
          handleProceed={
            type === 'Regular' ? this.scrollToDReg : this.scrollToE
          }
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: heightPercentageToDP('3.125%'),
    color: '#fff',
  },
  group: {
    height: heightPercentageToDP('75%'),
    justifyContent: 'space-between',
  },
  screen: {
    backgroundColor: 'yellow',
    flexDirection: 'column',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  screenColor: {
    backgroundColor: '#3D7782',
  },
  letter: {
    color: '#000',
    fontSize: 60,
    textAlign: 'center',
  },
  scrollButton: {
    alignSelf: 'center',
    backgroundColor: 'white',
    height: heightPercentageToDP('6.65%'),
    width: 160,
    borderRadius: 32,
    justifyContent: 'center',
  },
  scrollButtonText: {
    textAlign: 'center',
    fontSize: heightPercentageToDP('2.18%'),
    color: '#3D7782',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  tabContainer: {
    width: widthPercentageToDP('50.2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  tab: {
    borderBottomWidth: 3,
    width: widthPercentageToDP('8%'),
    borderBottomColor: '#5CE3D9',
  },
  tabW: {
    borderBottomWidth: 3,
    width: widthPercentageToDP('8%'),
    borderBottomColor: '#fff',
  },
  hide: {
    display: 'none',
  },
});

const cardstyles = StyleSheet.create({
  container: {
    width: widthPercentageToDP('73%'),
    // height: heightPercentageToDP('30.6%'),
    borderRadius: 32,
    position: 'relative',
    alignSelf: 'center',
  },
  cardheader: {
    height: heightPercentageToDP('37.6%'),
    backgroundColor: '#7AEFD4',
    borderTopRightRadius: 11,
    borderTopLeftRadius: 11,
  },
  cardfooter: {
    height: heightPercentageToDP('10%'),
    borderBottomRightRadius: 11,
    borderBottomLeftRadius: 11,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  add: {
    position: 'absolute',
    right: 0,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    width: widthPercentageToDP('10%'),
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
  },
  name: {
    fontSize: heightPercentageToDP('3.125%'),
    color: '#3D7782',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  location: {
    fontSize: heightPercentageToDP('2%'),
    color: '#5CE3D9',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  rates: {
    fontSize: heightPercentageToDP('2%'),
    color: '#3D7782',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
});
