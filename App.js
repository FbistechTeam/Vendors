import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Onboarding from './Routes/OnboardingRoute';
import MeasurerTab from './Routes/MeasurerRoute/MeasurerTab';
import VendorTab from './Routes/VendorRoute/VendorTab';
import TailorTab from './Routes/TailorRoute/TailorTab';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './src/reducer/rootReducer';
import createSagaMiddleware from 'redux-saga';
import saga from './src/saga/rootSaga';
import {Root} from 'native-base';
import OneSignal from 'react-native-onesignal';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {useEffect} from 'react';
import useOnesignal from './useOnesignal';

const Stack = createStackNavigator();

function App() {
  const [notificationPush] = useOnesignal();

  OneSignal.setLogLevel(6, 0);

  // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
  OneSignal.init('f17d3511-9863-487a-897b-582650cd07c2', {
    kOSSettingsKeyAutoPrompt: false,
    kOSSettingsKeyInAppLaunchURL: false,
    kOSSettingsKeyInFocusDisplayOption: 2,
  });
  OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

  // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
  OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

  OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('opened', onOpened);
  OneSignal.addEventListener('ids', onIds);

  // useEffect(() => {
  //   OneSignal.addEventListener('received', onReceived);
  //   OneSignal.addEventListener('opened', onOpened);
  //   OneSignal.addEventListener('ids', onIds);
  // }, []);

  function onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  function onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    // this.props.navigation.navigate('Request Notification');
    notificationPush(openResult);
  }

  function onIds(device) {
    console.log('Device info: ', device);
  }

  function myiOSPromptCallback(permission) {
    // do something with permission value
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            drawerLabel: 'Logout',
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Measurer"
          options={{
            headerShown: false,
          }}
          component={MeasurerTab}
        />
        <Stack.Screen
          name="Vendor"
          options={{
            headerShown: false,
          }}
          component={VendorTab}
        />
        <Stack.Screen
          name="Tailor"
          options={{
            headerShown: false,
          }}
          component={TailorTab}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default App;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['SignUpReducer'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
let persistor = persistStore(store);
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);
export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root>
          <App />
        </Root>
      </PersistGate>
    </Provider>
  );
};
