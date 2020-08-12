import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Home from '../../assets/Home.svg';
import HomeB from '../../assets/HomeB.svg';
import PendingIcon from '../../assets/Pending.svg';
import PendingIconB from '../../assets/PendingB.svg';
import CompleteIcon from '../../assets/Completed.svg';
import CompleteIconB from '../../assets/CompletedB.svg';
import WalletIcon from '../../assets/Wallet.svg';
import WalletIconB from '../../assets/WalletB.svg';
import ArchivmentIcon from '../../assets/Achievements.svg';
import ArchivmentIconB from '../../assets/AchievementsB.svg';
import Complete from '../../src/Screens/Measurer/Completed/Complete';
import PendingRoute from '../MeasurerRoute/PendingRoute';
import CustomDrawerContent from '../../CustomDrawerContent';
import CompleteRoute from './CompleteRoute';
import ArchivementRoute from './ArchivementRoute';
import WalletRoute from './WalletRoute';
import Tailor from './TailorRoute';
import TailorPendingRoute from './PendingRoute';
import UpdateInfo from '../../src/Screens/Drawer/UpdateInfo';
import WithdrawOption from '../../src/Screens/Drawer/WithdrawOption';
import Onboarding from '../OnboardingRoute';
import BankSettings from '../../src/Screens/Drawer/BankSetting';
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TailorsTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return focused ? <Home size={50} /> : <HomeB />;
          } else if (route.name === 'Requests') {
            return focused ? <PendingIcon /> : <PendingIconB />;
          } else if (route.name === 'Complete') {
            return focused ? <CompleteIcon /> : <CompleteIconB />;
          } else if (route.name === 'Achievements') {
            return focused ? <ArchivmentIcon /> : <ArchivmentIconB />;
          } else if (route.name === 'Wallet') {
            return focused ? <WalletIcon /> : <WalletIconB />;
          }

          // You can return any component that you like here!
          //   return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#5CE3D9',
        inactiveTintColor: '#000',
        style: {height: 55},
        labelStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen name="Home" component={Tailor} />
      <Tab.Screen name="Requests" component={TailorPendingRoute} />
      <Tab.Screen name="Complete" component={CompleteRoute} />
      {/* <Tab.Screen name="Achievements" component={ArchivementRoute} /> */}
      <Tab.Screen name="Wallet" component={WalletRoute} />
    </Tab.Navigator>
  );
}

export default function TailorTab() {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#000',
        width: widthPercentageToDP('80%'),
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomePages"
        component={TailorsTab}
        options={{drawerLabel: 'Home Page', headerTitle: 'Dashboard'}}
      />
      <Drawer.Screen
        name="UpdateInfo"
        component={UpdateInfo}
        options={{
          drawerLabel: 'Update Info',
          headerTitle: 'Dashboard',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="WithdrawOption"
        component={WithdrawOption}
        options={{
          drawerLabel: 'Withdraw Option',
          headerTitle: 'Dashboard',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Bank Settings"
        component={BankSettings}
        options={{
          drawerLabel: 'Bank Settings',
          headerTitle: 'Dashboard',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Onboarding"
        component={Onboarding}
        options={{drawerLabel: 'Logout', gestureEnabled: false}}
      />
    </Drawer.Navigator>
  );
}
