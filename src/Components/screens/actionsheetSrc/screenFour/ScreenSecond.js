/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";
import styles from './styles';
import TextCommon from '../../../Common/TextCommon'
import RoundedButton from '../../../Common/RoundedButton'
import global from "../../../Common/global";
import TextinputCommon from "../../../Common/TextinputCommon";
import LoadingScreen from "../../../Common/LoadingScreen";
import { registerApi } from '../../../../Actions/registerAction'
import { bindActionCreators } from 'redux'
import { constant } from './constant'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { TextInput } from "react-native-gesture-handler";

//import vector icons


export default class actionSheetSecond extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {

  }

  render() {
    if (this.props.RegisterIsLoding) {
      return <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }} color={'blue'} size="large" />
    }
    const data = new Date()
    console.log("data", data)
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <LoadingScreen loading={false} />
        <View style={styles.topHeaderView}>

          <Feather name="menu" color="white" size={25} style={{ marginTop: 10, marginLeft: 10 }} onPress={() => { this.props.navigation.openDrawer() }} />
          {/* Registrazione */}
          <TextCommon
            text={"Patologie passate"}
            color={"#FFFFFF"}
            textAlign={"center"}
            fontSize={global.fontSize_17}
            fontWeight={"600"}
            textAlign={"center"}
            fontFamily={"Montserrat-Bold"}
          />
          <View style={{ height: 16 }} />
        </View>
        <View style={{ height: 50, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20 }}>
          <TextCommon
            text={"Cerca"}
            color={global.secondary}
            fontSize={global.fontSize_17}
            fontWeight={"600"}
            textAlign={"center"}
            fontFamily={"Montserrat-Bold"}
          />
        </View>
        <View style={{ height: 50, backgroundColor: 'gray' }}>
          <View style={{ height: 40, margin: 5, backgroundColor: 'white', borderRadius: 15, justifyContent: 'center', paddingHorizontal: 10, flexDirection: 'row' }}>
            <Feather name="search" size={20} style={{ alignSelf: 'center' }} />
            <TextInput
              style={{ height: 40, flex: 1, marginLeft: 10 }}
            />
          </View>
        </View>
        <ScrollView>

        </ScrollView>
        <View styles={{ marginBottom: 20 }}>
          <RoundedButton
            btnText={"CONFERMA"}
            backgroundColor={global.green}
          //onPress={()=>this.props.navigation.navigate("RegisteredScreen")}
          />
        </View>
        <View style={styles.commonImageStyle}>
          <Image source={require("../../../../Image/common_icon.png",)} />
        </View>

      </SafeAreaView >
    );
  }
}


