import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Pending from '../../src/Screens/Measurer/Pending/Pending';
import Measurement from '../../src/Screens/Measurer/Measurment/Measurement';
import PendingMeasurement from '../../src/Screens/Measurer/Measurment/Measurement';
import Complete from '../../src/Screens/Measurer/Completed/Complete';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CompleteRoute({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Complete Requests"
      screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Completed Requests"
        options={{
          //   title: 'Hello User',
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
        component={Complete}
      />
      <Stack.Screen
        component={PendingMeasurement}
        name="Measurements"
        options={{
          headerTintColor: '#000',
          headerStyle: {
            // backgroundColor: '#3D7782',
            // height: heightPercentageToDP('10%'),
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default CompleteRoute;
