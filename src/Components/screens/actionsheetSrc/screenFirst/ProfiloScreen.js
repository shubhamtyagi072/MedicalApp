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
import CustomeHeader from '../../../Common/CustomeHeader';

//import vector icons


export default class actionSheetFirst extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {

  }
  btnOnpress = () => {
    this.props.navigation.navigate('actionSheetSecond')
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
        <CustomeHeader backgroundColor={global.primary} text={"Patologie in corso"} navigation={this.props.navigation} />

        <LoadingScreen loading={false} />
        
        <ScrollView>
          <View style={styles.buttonPadding}>
            <TouchableOpacity onPress={() => { this.btnOnpress() }} style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: global.primary,
              height: 50,
              borderRadius: 50 / 2,
              color: global.primary,
              alignItems: 'center',
              flex: 1,
              marginTop: 20,
              justifyContent: 'space-between',
              paddingHorizontal: 20

            }}>
              <View style={{ flexDirection: 'row' }}>
                <Octicons name="plus" color={global.primary} size={20} style={{ marginRight: 10 }} />
                <TextCommon
                  text={"PATOLOGIE PASSATE"}
                  color={global.primary}
                  textAlign={"center"}
                  fontSize={13}
                  fontWeight={"600"}
                  textAlign={"center"}
                  fontFamily={"Montserrat-Bold"}
                />
              </View>
              <Ionicons name="chevron-forward" color={global.primary} size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: global.primary,
              height: 50,
              borderRadius: 50 / 2,
              color: global.primary,
              alignItems: 'center',
              flex: 1,
              marginTop: 20,
              justifyContent: 'space-between',
              paddingHorizontal: 20

            }}>
              <View style={{ flexDirection: 'row' }}>
                <Octicons name="plus" color={global.primary} size={22} style={{ marginRight: 10 }} />
                <TextCommon
                  text={"PATOLOGIE IN CORSO"}
                  color={global.primary}
                  textAlign={"center"}
                  fontSize={13}
                  fontWeight={"600"}
                  textAlign={"center"}
                  fontFamily={"Montserrat-Bold"}
                />
              </View>

              <Ionicons name="chevron-forward" color={global.primary} size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: global.primary,
              height: 50,
              borderRadius: 50 / 2,
              color: global.primary,
              alignItems: 'center',
              flex: 1,
              marginTop: 20,
              justifyContent: 'space-between',
              paddingHorizontal: 20

            }}>
              <View style={{ flexDirection: 'row' }}>
                <Octicons name="plus" color={global.primary} size={22} style={{ marginRight: 10 }} />
                <TextCommon
                  text={"ANNOTAZIONI GIORNALIERE"}
                  color={global.primary}
                  textAlign={"center"}
                  fontSize={13}
                  fontWeight={"600"}
                  textAlign={"center"}
                  fontFamily={"Montserrat-Bold"}
                />
              </View>
              <Ionicons name="chevron-forward" color={global.primary} size={22} />
            </TouchableOpacity>
          </View>
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


