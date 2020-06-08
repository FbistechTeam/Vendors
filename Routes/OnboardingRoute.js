import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Splash from '../src/SplashScreen/Splash';
import Onboard from '../src/Onboard/Onboard';
import Carousel from '../src/Onboard/Carousel';
import SignUp from '../src/Screens/SignupScreen/SignUp';
import SignupScreen from '../src/Screens/SignupScreen/SignupScreen';
import LoginScreen from '../src/Screens/LoginScreen/LoginScreen';
import Recovery from '../src/Screens/Recovery/Recovery';
import RecoverSuccess from '../src/Screens/Recovery/RecoverSucess';
import VerificationScreen from '../src/Screens/SignupScreen/Verification';
import ChangePassword from '../src/Screens/Recovery/ChangePassword';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Onboarding() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        options={{headerShown: false}}
        component={Splash}
      />
      <Stack.Screen
        name="Onboard"
        options={{headerShown: false}}
        component={Onboard}
      />
      <Stack.Screen
        name="OnboardCarousel"
        options={{headerShown: false}}
        component={Carousel}
      />
      <Stack.Screen
        name="SignUp"
        options={{headerShown: false}}
        component={SignUp}
      />
      <Stack.Screen
        name="SignUpScreen"
        options={{headerShown: false}}
        component={SignupScreen}
      />
      <Stack.Screen
        name="Verification"
        options={{headerShown: false}}
        component={VerificationScreen}
      />
      <Stack.Screen
        name="LoginScreen"
        options={{headerShown: false}}
        component={LoginScreen}
      />
      <Stack.Screen
        name="ChangeScreen"
        options={{headerShown: false}}
        component={ChangePassword}
      />
      <Stack.Screen
        name="RecoveryScreen"
        options={{headerShown: false}}
        component={Recovery}
      />
      <Stack.Screen
        name="RecoverSuccess"
        options={{headerShown: false}}
        component={RecoverSuccess}
      />
    </Stack.Navigator>
  );
}

export default Onboarding;
