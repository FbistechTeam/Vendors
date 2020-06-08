import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Wallet from '../../src/Screens/Measurer/Wallet/Wallet';

const Stack = createStackNavigator();

function WalletRoute({navigation}) {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="wallet"
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
        component={Wallet}
      />
      {/* <Stack.Screen
        component={PendingMeasurement}
        name="Measurements"
        options={{
          headerTintColor: '#000',
          headerStyle: {
            // backgroundColor: '#3D7782',
            // height: heightPercentageToDP('10%'),
          },
        }}
      /> */}
    </Stack.Navigator>
  );
}

export default WalletRoute;
