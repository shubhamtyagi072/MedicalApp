/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import 'react-native-gesture-handler';
import store from "./store";
import SplashScreen from './src/Components/screens/splash/SplashScreen';
import WelcomeScreen from './src/Components/screens/welcome/WelcomeScreen';
import RegisteredScreen from './src/Components/screens/register/RegisteredScreen';
import ForgotPassword from './src/Components/screens/forgotPassword/forgotPassword';
import VideoRoom from './src/Components/screens/videoRoom/VideoRoom';
import DoctorRegisterScreen from './src/Components/screens/doctor/doctor-register/DoctorRegisterScreen'
import DoctorRegisterConfirmScreen from './src/Components/screens/doctor/doctor-register-confirm/DoctorRegisterConfirmScreen'
import PatientRegisterScreen from './src/Components/screens/patient/patient-register/PatientRegisterScreen'
import PatientRegisterConfirmScreen from './src/Components/screens/patient/patient-register-confirm/PatientRegisterConfirmScreen';
import LoginScreen from './src/Components/screens/login/LoginScreen'
import drawer from './src/Components/screens/drawer/drawer';
import PatientDashBoardScreen from './src/Components/screens/patient/patient-dashboard/PatientDashBoardScreen'
import DoctorDashBoardScreen from './src/Components/screens/doctor/doctor-dashboard/DoctorDashBoardScreen'
import terapiaMain from './src/Components/screens/patient/patient-terapia/firstScreen/terapiaMain';
import ProfiloScreen from './src/Components/screens/patient/Profilo/ProfiloScreen';
import docProfile from './src/Components/screens/doctor/profilo/doc-profile';

import firstscreen from './src/Components/screens/patient/patient-clinical-dairy/firstScreen/firstScreen';
import PatientPathology from './src/Components/screens/patient/patient-clinical-dairy/patientPathology/PatientPathology';
import secondScreen from './src/Components/screens/patient/patient-clinical-dairy/secondScreen/secondScreen';
import thirdScreen from './src/Components/screens/patient/patient-clinical-dairy/thirdScreen/thirdScreen';

import docPatinetList from './src/Components/screens/doctor/doctor-patient/docPatientList/docPatinetList';
import selectedPatient from './src/Components/screens/doctor/doctor-patient/docSelectPatient/selectedPatient';
import patientTestList from './src/Components/screens/doctor/doctor-patient/docPatientTestResult/patientTestList';
import patientTestHsitory from './src/Components/screens/doctor/doctor-patient/docPatientTestResult/patientTestHistory';
import docPatClinicFirst from './src/Components/screens/doctor/doctor-patient/docPatClinicalDiary/firstScreen/firstScreen';
import docPatClinicSecond from './src/Components/screens/doctor/doctor-patient/docPatClinicalDiary/secondScreen/secondScreen';
import docPatClinicThird from './src/Components/screens/doctor/doctor-patient/docPatClinicalDiary/thirdScreen/thirdScreen';

import docChat from './src/Components/screens/doctor/doctor-patChat/doc-chat';
import doctorRequest from './src/Components/screens/doctor/doctor-request/doctorRequest';
import docRequestPro from './src/Components/screens/doctor/doctor-request-profilo/docRequestPro';
import docConfPnts from './src/Components/screens/doctor/doctor-confirm-patients/docConfPnts';
import chatList from './src/Components/screens/doctor/chatScreen/chatScreenList/chatList';
import docAppoFirst from './src/Components/screens/doctor/doc-appo/firstScreen/docAppoFirst';
import docAppoSecond from './src/Components/screens/doctor/doc-appo/secondScreen/docAppoSecond';
import videoCallList from './src/Components/screens/doctor/videoCall/videoCall/videoList';
import DocPatAppoint from './src/Components/screens/doctor/videoCall/docPatAppoint/DocPatAppoint';
import {docVideoCallScreen} from './src/Components/screens/doctor/doc-videoCall/docVideoCall';

import chatScreen from './src/Components/screens/patient/pateint-doctChat/pateint-chat';
import patientYourDoc from './src/Components/screens/patient/pateint-yourDoc/patientYourDoc';
import patAppoFirst from './src/Components/screens/patient/patient-appo/firstScreen/patAppoFirst';
import patAppoSecond from './src/Components/screens/patient/patient-appo/secondScreen/patAppoSecond';
import pateintAssignDocListScreen from './src/Components/screens/patient/patient-assignDcoList/pateintAssignDocListScreen'
import patientAuto from './src/Components/screens/patient/patient-auto/firstScreen/patientAuto';
import testDetails from './src/Components/screens/patient/patient-auto/secondScreen/testDetails';
import questionAns from './src/Components/screens/patient/patient-auto/questionAns/questionAns';
import score from './src/Components/screens/patient/patient-auto/scoreScreen.js/scoreScreen';
import requestScreen from './src/Components/screens/patient/request-doctor/requestScreen';
import requestTypeScreen from './src/Components/screens/patient/request-doctor-type/requestTypeScreen';
import requestDocListScreen from './src/Components/screens/patient/requsted-doctorlist/requestDocListScreen';
import videoCall from './src/Components/screens/patient/patient-videoCall/videoCall';
import requestFinalScreen from './src/Components/screens/patient/patient-request-final/requestFinalScreen';
import VideoRequest from './src/Components/screens/patient/video/VideoRequest'

var PushNotification = require("react-native-push-notification");
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const LoginNavigator = createStackNavigator(
  {
    Splash: { screen: SplashScreen },
    WelcomeScreen: { screen: WelcomeScreen },
    Login: { screen: LoginScreen },
    RegisteredScreen: { screen: RegisteredScreen },
    DoctorRegisterScreen: { screen: DoctorRegisterScreen },
    DoctorRegisterConfirmScreen: { screen: DoctorRegisterConfirmScreen },
    PatientRegisterScreen: { screen: PatientRegisterScreen },
    PatientRegisterConfirmScreen: { screen: PatientRegisterConfirmScreen },
    ForgotPassword: { screen: ForgotPassword },

  },
  {
    initialRouteName: "Splash",
    headerMode: "none"
    // defaultNavigationOptions: defaultNavigationOptions
  }
);

const HomeNavigator = createStackNavigator(
  {
    /// patinet dashboard screen
    PatientDashBoardScreen: { screen: PatientDashBoardScreen },
    /// profile screen
    ProfiloScreen: { screen: ProfiloScreen },

    /// three screen of patient clinical diary
    firstScreen: { screen: firstscreen },
    secondScreen: { screen: secondScreen },
    thirdScreen: { screen: thirdScreen },
    PatientPathology: { screen: PatientPathology },


    /// patient-medico flow for chat and video call
    requestScreen: {screen: requestScreen},
    patientYourDoc: { screen: patientYourDoc },
    requesTypeScreen: {screen: requestTypeScreen},
    requestDocListScreen: {screen: requestDocListScreen},
    requestFinalScreen: {screen: requestFinalScreen},
    pateintAssignDocListScreen: { screen: pateintAssignDocListScreen },
    videoCall: {screen: videoCall},
    chatScreen: { screen: chatScreen },

    // patient terapi

    terapiMain: { screen: terapiaMain },

    // pateint automoniter

    patientAuto: { screen: patientAuto },
    testDetails: { screen: testDetails },
    questionAns: { screen: questionAns },
    score: { screen: score },

    // doctor screen flow

    /// Doctor dashboard screen
    DoctorDashBoardScreen: { screen: DoctorDashBoardScreen },
    // Doctor-profile
    docProfile: { screen: docProfile },
    /// Doctor-patient rquest flow
    doctorRequest: { screen: doctorRequest },
    doctorReqPro: { screen: docRequestPro },
    docConfPnts: { screen: docConfPnts },
    docChatScreen: { screen: docChat },

    //Doctor-petient screen

    docPatinetList: { screen: docPatinetList },
    DocPatAppoint: {screen: DocPatAppoint},
    selectedPateint: { screen: selectedPatient },
    patientTestList:{screen:patientTestList},
    patientTestHsitory:{screen:patientTestHsitory},

    //Doctor-patient clinical diary screens

    docPatClinicFirst: { screen: docPatClinicFirst },
    docPatClinicSecond: { screen: docPatClinicSecond },
    docPatClinicThird: { screen: docPatClinicThird },

    //Dcotor-appoitment

    docAppFirst: { screen: docAppoFirst },
    docAppoSecond: { screen: docAppoSecond },

    //Patient-appoitment

    patAppoFirst: { screen: patAppoFirst },
    patAppoSecond: { screen: patAppoSecond },

    chatList: { screen: chatList },
    videoCallList: {screen: videoCallList},

    docVideoCall: {screen: docVideoCallScreen},

    VideoRoom: {screen: VideoRoom},
    VideoRequest: {screen: VideoRequest},
  },
  {

    headerMode: "none"

  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: HomeNavigator
  },

}, {

  drawerType: 'slide',
  drawerWidth: '70%',
  drawerLockMode: 'locked-closed',
  edgeWidth: 0,
  contentComponent: drawer,
  navigationOptions: {
    header: null,
  }
});

const AppNavigator = createSwitchNavigator(
  {
    LoginFlow: LoginNavigator,
    HomeFlow: AppDrawerNavigator
  },
  {
    initialRouteName: "LoginFlow",
    headerMode: "none"

  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {

  componentDidMount() {
    PushNotification.createChannel(
      {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

/*const App: () => React$Node = () => {
  return (

    <Provider store={store}>
      <AppContainer />
    </Provider>

  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;*/
