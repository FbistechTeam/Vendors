import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Archivements from '../../src/Screens/Measurer/Archivements/Archivements';

const Stack = createStackNavigator();

function ArchivementRoute({navigation}) {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Achievements"
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
        component={Archivements}
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

export default ArchivementRoute;
