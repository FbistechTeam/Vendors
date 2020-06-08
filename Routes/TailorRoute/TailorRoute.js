import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Homepage from '../../src/Screens/Measurer/HomePage/Homepage';
import CustomDrawerContent from '../../CustomDrawerContent';
import PendingRoute from './PendingRoute';
import TailorHomepage from '../../src/Screens/Tailor/HomePage/Homepage';

const Stack = createStackNavigator();

function TailorRoute({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="HomePages"
      screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="HomePages"
        options={{
          title: 'Hello User',
          headerRight: () => (
            <Ionicons
              onPress={() => {
                navigation.openDrawer();
              }}
              name="bookmark"
              size={25}
              color="black"
              style={{paddingRight: 23}}
            />
          ),
          headerLeft: () => (
            <Ionicons
              onPress={() => {
                navigation.openDrawer();
              }}
              name="bars"
              size={30}
              color="black"
              style={{paddingLeft: 23}}
            />
          ),
        }}
        component={TailorHomepage}
      />
    </Stack.Navigator>
  );
}

export default TailorRoute;
