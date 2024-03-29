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
import TailorPending from '../../src/Screens/Tailor/Pending/Pending';
import JobPage from '../../src/Screens/Tailor/Pending/JobPage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function TailorPendingRoute({navigation}) {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Requests"
        options={{
          //   title: 'Hello User',
          headerRight: () => (
            <Ionicons
              onPress={() => {
                // navigation.openDrawer();
                navigation.navigate('Request Notification');
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
        component={TailorPending}
      />
      <Stack.Screen
        name="Request Notification"
        options={{
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
        component={JobPage}
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

export default TailorPendingRoute;
