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
import { getPathologiesList } from '../../../../Actions/getPathologiesList'

//import vector icons


export default class actionSheetSecond extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount = async () => {
    const response = await getPathologiesList()
    console.log("response", response)
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

        <View style={{ height: 50, backgroundColor: '#c7c7cc' }}>
          <View style={{ height: 40, margin: 5, backgroundColor: 'white', borderRadius: 15, justifyContent: 'center', paddingHorizontal: 10, flexDirection: 'row' }}>
            <Feather name="search" size={20} style={{ alignSelf: 'center' }} />
            <TextInput
              style={{ height: 40, flex: 1, marginLeft: 10 }}
            />
          </View>
        </View>
        <ScrollView>
          <View style={{ backgroundColor: '#f9f9f9', marginTop: 5 }} >
            <Text style={{ marginLeft: 15, fontSize: 16 }} >P</Text>
          </View>
          <View style={{ marginLeft: 10 }} >
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('actionSheetThird') }} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ marginLeft: 5, fontSize: 16, paddingVertical: 10 }} >Pancretite</Text>
              <Ionicons name="chevron-forward" color={'#c7c7cc'} size={22} style={{ marginRight: 10 }} />
            </TouchableOpacity>

            <View style={{ height: 2, backgroundColor: '#f9f9f9', flex: 1 }} ></View>

            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ marginLeft: 5, fontSize: 16, paddingVertical: 10 }} >Psoriasi</Text>
              <Ionicons name="chevron-forward" color={'#c7c7cc'} size={22} style={{ marginRight: 10 }} />
            </TouchableOpacity>

            <View style={{ height: 2, backgroundColor: '#f9f9f9', flex: 1 }} ></View>
          </View>
        </ScrollView>

        <View style={styles.commonImageStyle}>
          <Image source={require("../../../../Image/common_icon.png",)} />
        </View>

      </SafeAreaView >
    );
  }
}


