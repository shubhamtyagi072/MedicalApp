import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import styles from './styles';
import TextCommon from '../../../Common/TextCommon'
import global from "../../../Common/global";
import LoadingScreen from "../../../Common/LoadingScreen";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { images } from "../../../../Image";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import storage from "../../../../utils/storage"
import { registerForPush } from "../../../../Actions/NotificationAction";
import patientBanner from "../../../../../assets/banner-paziente.png";

export default class PatientDashBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptTerms: false,
      activeIndex: 0,
    };

  }

  getUser_Detail = async () => {
    return await storage.get('Login')
  }


  componentDidMount() {
    console.log('patient dashboard')
    Platform.OS === 'ios' && PushNotificationIOS.setApplicationIconBadgeNumber(0);
    this.pushWork();
  }

  pushWork = async () =>
  {
    const res = JSON.parse(await this.getUser_Detail())
        let data = {
            "patient_id": res.patient.id
        }
        console.log('data',data)

    console.log(this.props)
    const { navigation } = this.props
    await registerForPush(data, navigation)

  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LoadingScreen />
        <View style={{ marginVertical: 10, marginLeft: 10 }} >
          <Feather name="menu" color="white" size={25} onPress={() => { this.props.navigation.openDrawer() }} />
        </View>
        <View style={{ marginVertical: 10 }}>
          <TextCommon
            text={"Pagina Personale"}
            color={"#FFFFFF"}
            textAlign={"center"}
            fontSize={global.fontSize_17}
            fontWeight={"600"}
            fontFamily={"Poppins-Bold"}
          />
        </View>

        <View style={styles.buttonPadding}>
          <View style={styles.FirstRow}>

            <TouchableOpacity onPress={() => { this.props.navigation.navigate('ProfiloScreen') }} style={{ width:'50%',alignItems: "center" }}>
              <Image source={images.icon1} style={{ height: 80, width: 80, resizeMode: 'contain' }} />


              <TextCommon
                text={"Profilo"}
                color={"#FFFFFF"}
                textAlign={"center"}
                fontSize={12}
                fontWeight={"600"}
                fontFamily={"Poppins-SemiBold"}
                lineHeight={16}
              />
              <View style={{ height: 4 }} />
              <TextCommon
                text={"I miei\nDati"}
                color={"#FFFFFF"}
                textAlign={"center"}
                fontSize={global.fontSize_10}
                fontWeight={"600"}
                fontFamily={"Poppins-Regular"}
                lineHeight={16}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.props.navigation.navigate('firstScreen') }} style={{ width:'50%',alignItems: "center" }}>

              <Image source={images.icon2} style={{ height: 80, width: 80, resizeMode: 'contain' }} />


              <TextCommon
                text={"Storia e"}
                color={"#FFFFFF"}
                textAlign={"center"}
                fontSize={12}
                fontWeight={"600"}
                fontFamily={"Poppins-SemiBold"}
                lineHeight={16}
              />
              <View style={{ height: 4 }} />
              <TextCommon
                text={"Diario clinico"}
                color={"#FFFFFF"}
                textAlign={"center"}
                fontSize={global.fontSize_10}
                fontWeight={"600"}
                fontFamily={"Poppins-Regular"}
                lineHeight={16}
              />
            </TouchableOpacity>

          </View>


          <View style={styles.secondView}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('requestScreen') }} style={{ width:'33%',alignItems: "center" }}>

              <Image source={images.icon3} style={{ height: 80, width: 80, resizeMode: 'contain' }} />

              <TextCommon
                text={"Medici"}
                color={"#FFFFFF"}
                textAlign={"center"}
                fontSize={12}
                fontWeight={"600"}
                fontFamily={"Poppins-SemiBold"}
                lineHeight={16}
              />
              <View style={{ height: 4 }} />
              <TextCommon
                text={"Il Mio\nMedico"}
                color={"#FFFFFF"}
                textAlign={"center"}
                fontSize={global.fontSize_10}
                fontWeight={"600"}
                fontFamily={"Poppins-Regular"}
                lineHeight={16}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.props.navigation.navigate('terapiMain') }} style={{ width:'33%',alignItems: "center" }}>

              <Image source={images.icon4} style={{ height: 80, width: 80, resizeMode: 'contain' }} />

              <TextCommon
                text={"Terapia"}
                color={"#FFFFFF"}
                textAlign={"center"}
                fontSize={12}
                fontWeight={"600"}
                fontFamily={"Poppins-SemiBold"}
                lineHeight={16}
              />
              <View style={{ height: 4 }} />
              <TextCommon
                text={"Le Mie\nMedicine"}
                color={"#FFFFFF"}
                textAlign={"center"}
                fontSize={global.fontSize_10}
                fontWeight={"600"}
                fontFamily={"Poppins-Regular"}
                lineHeight={16}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('patientAuto') }} style={{width:'33%', alignItems: "center" }}>
              {/* <View style={{ height: 60, width: 60, marginBottom: 10, backgroundColor: 'white', borderRadius: 60 / 2, alignItems: 'center', justifyContent: 'center' }}> */}
              <Image source={images.icon5} style={{ height: 80, width: 80, resizeMode: 'contain', alignSelf: 'center' }} />
              {/* </View> */}
              <TextCommon
                text={"Auto monitoraggio"}
                color={"#FFFFFF"}
                textAlign={"center"}
                fontSize={12}
                fontWeight={"600"}
                fontFamily={"Poppins-SemiBold"}
                lineHeight={16}
              />
              <View style={{ height: 4 }} />
              <TextCommon
                text={"Le mie\nPrescrizioni e test"}
                color={"#FFFFFF"}
                textAlign={"center"}
                fontSize={global.fontSize_10}
                fontWeight={"600"}
                fontFamily={"Poppins-Regular"}
                lineHeight={16}
              />

            </TouchableOpacity>

          </View>
        </View>


      </SafeAreaView>
    );
  }
}


