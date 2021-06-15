/* @flow */

import React, { Component } from "react";
import { View, Text, Image, SafeAreaView, StatusBar, Switch, ScrollView, Alert, ActivityIndicator } from "react-native";
import styles from './styles';
import TextCommon from '../../../../Common/TextCommon'
import global from "../../../../Common/global";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextinputCommon from "../../../../Common/TextinputCommon";
import storage from "../../../../../utils/storage";
import { getPatTestList } from "../../../../../Actions/getPatTestList";
import CustomeHeader from "../../../../Common/CustomeHeader";

import RoundedButton from "../../../../Common/RoundedButton";
import { submitScore } from "../../../../../Actions/submitScore";


export default class score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      isLoading: false
    };
  }
  componentDidMount() {


  }

  getUser_Detail = async () => {
    return await storage.get('Login')
  }
  onSubmitPress = (score, detailsObjc) => {
    this.submitScoreistApiCAll(score, detailsObjc)

  }
  submitScoreistApiCAll = async (score, detailsObjc) => {
    this.setState({ isLoading: true })
    console.log("respo1234")
    const res = JSON.parse(await this.getUser_Detail())
    let data = {

      "patient_id": parseInt(res.patient.id),
      "score": score,
      "questionary_identifier": detailsObjc.test_assigned,
      "date": "some date"

    }
    const response = await submitScore(data)

    console.log("respo1234  ", response)
    if (response.status == "success") {
      this.setState({ isLoading: false })
      Alert.alert(
        '',
        response["message"],
        [

          { text: 'OK', onPress: () => { this.props.navigation.navigate('testDetails', {"detailsObjc":detailsObjc}) } },


        ]
      );

    }
  }

  render() {
    const { score, detailsObjc } = this.props.navigation.state.params
    console.log('detailsObjc', detailsObjc)
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <CustomeHeader backgroundColor={global.primary} text={detailsObjc.test_assigned} navigation={this.props.navigation} />
        <View style={{ height: 16 }} />

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '-10%' }} >
          <TextCommon
            text={"il tuo punteggio è"}
            textAlign={"center"}
            fontSize={16}
            fontFamily={"Montserrat-Regular"}
          />
          <View style={{ backgroundColor: "#73b3a7", height: 200, width: 200, borderRadius: 100, justifyContent: 'center', marginTop: '5%' }} >
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: "600", fontFamily: 'Montserrat-Bold', fontSize: 60 }} >{score}</Text>
          </View>
        </View>
        <View style={{marginBottom:'10%'}}>
          <RoundedButton
            btnText={this.state.isLoading ? <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }} color={"white"} size="small" /> : "AVANTI"}
            backgroundColor={global.green}
            onPress={() => { this.onSubmitPress(score, detailsObjc) }}
          />
        </View>
      </SafeAreaView >
    );
  }
}


