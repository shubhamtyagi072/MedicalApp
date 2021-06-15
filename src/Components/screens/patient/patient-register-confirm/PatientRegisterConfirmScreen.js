/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import styles from './styles';
import TextCommon from '../../../Common/TextCommon'
import RoundedButton from '../../../Common/RoundedButton'
import global from "../../../Common/global";
import LoadingScreen from "../../../Common/LoadingScreen";
import Swiper from 'react-native-swiper'
import AntDesign from 'react-native-vector-icons/AntDesign';

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: 'grey' }}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
}

export default class PatientRegisterConfirmScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptTerms: false,
      activeIndex: 0,

    };
    this.swiper
  }
  componentDidMount() {

  }

  onNextPress = () => {
    if (this.state.activeIndex != 1) {
      this.swiper.scrollBy(this.state.activeIndex + 1)
      this.setState({ activeIndex: this.state.activeIndex + 1 })
    } else {
      this.props.navigation.navigate("PatientDashBoardScreen")
    }
  }

  onConfirmPress = () => {
    this.props.navigation.navigate("PatientDashBoardScreen")
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <LoadingScreen />
        <View style={styles.topHeaderView}>

          <View style={styles.imageMainView}>
            <Image source={require("../../../../Image/splash_logo.png",)} style={styles.imageView} />
          </View>

        </View>

        <View style={styles.swiperView}>
          <Swiper ref={(swiper) => { this.swiper = swiper; }} onIndexChanged={(index) => this.setState({ activeIndex: index })} loop={false} showsPagination={false} showsButtons={false}>

            <View style={styles.buttonPadding}>


              <Image source={require("../../../../Image/patient_2.png",)} style={styles.sliderImage} />

              <TextCommon
                text={"Cerca il tuo Medico"}
                color={global.darkBlack}
                textAlign={"center"}
                fontSize={global.fontSize_20}
                fontWeight={"600"}
                textAlign={"center"}
                fontFamily={"Poppins-SemiBold"}
              />

              <TextCommon
                text={"Seleziona il tuo\nMedico curante o Specialista"}
                color={global.darkBlack}
                textAlign={"center"}
                fontSize={global.fontSize_14}
                fontWeight={"600"}
                textAlign={"center"}
                fontFamily={"Poppins-Light"}
              />


            </View>


            <View style={styles.buttonPadding}>

              <Image source={require("../../../../Image/patient_1.png",)} style={styles.sliderImage} />

              <TextCommon
                text={"Prenota una Televisita"}
                color={global.darkBlack}
                textAlign={"center"}
                fontSize={global.fontSize_20}
                fontWeight={"600"}
                textAlign={"center"}
                fontFamily={"Poppins-SemiBold"}
              />

              <TextCommon
                text={"Hai la possibilità di \nparlare o chattare con il \ntuo Medico"}
                color={global.darkBlack}
                textAlign={"center"}
                fontSize={global.fontSize_14}
                fontWeight={"600"}
                textAlign={"center"}
                fontFamily={"Poppins-Light"}
              />
            </View>
          </Swiper>
        </View>

        <View style={styles.rowView}>
          <View style={[styles.dotView, { backgroundColor: this.state.activeIndex == 0 ? global.primary : global.grey, }]} />
          <View style={{ width: 8 }} />
          <View style={[styles.dotView, { backgroundColor: this.state.activeIndex == 1 ? global.primary : global.grey }]} />
        </View>

        {this.state.activeIndex == 1 ?
          <View style={styles.buttonPadding}>
            <RoundedButton
              btnText={"CONFERMA"}
              backgroundColor={global.green}
              onPress={() => this.onConfirmPress()}
            />
          </View>
          :
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.onNextPress()} style={styles.buttonStyle}>
            <AntDesign size={20} name="right" color="white" />
          </TouchableOpacity>
        }


        <View style={styles.commonImageStyle}>
          <Image source={require("../../../../Image/common_icon.png",)} />
        </View>

      </SafeAreaView>
    );
  }
}


