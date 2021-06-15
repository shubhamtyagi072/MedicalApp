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
import DatePicker from 'react-native-datepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MonthPicker from 'react-native-month-year-picker';
import { TextInput } from "react-native-gesture-handler";

//import vector icons


export default class actionSheetThird extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false,
      date: null,
      yearDate: new Date(),
      showDate1: false,
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

          <Feather name="menu" color="white" size={25} style={{}} onPress={() => { this.props.navigation.openDrawer() }} />
          {/* Registrazione */}
          <TextCommon
            text={"Sintomo/Segno"}
            color={"#FFFFFF"}
            textAlign={"center"}
            fontSize={global.fontSize_17}
            fontWeight={"600"}
            textAlign={"center"}
            fontFamily={"Montserrat-Bold"}
          />
          <AntDesign name="setting" color="white" size={25} style={{}} onPress={() => { this.props.navigation.openDrawer() }} />

        </View>
        <TouchableOpacity onPress={() => { this.setState({ showDate: true }) }} style={{ height: 50, width: '90%', borderRadius: 25, borderWidth: 2, alignSelf: 'center', borderColor: global.primary, marginTop: 50 }} >
          <TextinputCommon
            placeHolder={"data dei primi sintomi"}
            placeholderTextColor={global.primary}
            value={this.state.yearDate}
            color={global.primary}
            editable={false}
            disable={false}

          />
          {

            this.state.showDate && (
              <MonthPicker
                onChange={(event, newDate) => { this.setState({ showDate: false, yearDate: newDate }) }}
                value={this.state.yearDate}
                minimumDate={new Date(1990, 1)}
                maximumDate={new Date()}
                enableAutoDarkMode={false}
              />
            )
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.setState({ showDate1: true }) }} style={{ height: 50, width: '90%', borderRadius: 25, borderWidth: 2, alignSelf: 'center', borderColor: global.primary, marginTop: 20 }} >
          <TextinputCommon
            placeHolder={"data dei sintomi recenti"}
            placeholderTextColor={global.primary}
            value={this.state.date}
            color={global.primary}
            editable={false}
            disable={false}
          />
          {

            this.state.showDate1 && (
              <DatePicker
                style={{ width: '100%', height: 50, position: 'absolute', opcity: 0, borderWidth: 0 }}
                date={new Date()} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="seleziona la data"
                format="DD-MM-YYYY"
                minDate="01-01-1990"
                maxDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    opacity: 0
                  },
                  dateInput: {
                    marginLeft: 36,
                    borderWidth: 0, opacity: 0
                  }
                }}
                onDateChange={(date) => { this.setState({ showDate1: false, date: date }) }}
              />
            )
          }
        </TouchableOpacity>
        <View style={{ borderTopColor: '#cccccc', height: 2 }} ></View>
        <View style={{ flex: 1, marginTop: 50, borderTopColor: '#cccccc', borderTopWidth: 2 }} >
          <TextInput
            placeholderTextColor={'#b1b1b1'}
            placeholder={"Descrizione"}
            style={{ height: 300, justifyContent: "flex-start", textAlignVertical: 'top', paddingHorizontal: '5%', flex: 1 }}
            numberOfLines={10}
            multiline={true} />
        </View>
        <View style={{ height: 100, alignSelf: 'flex-end', width: '100%', borderTopColor: '#cccccc', borderTopWidth: 2, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 25 }} >
          <TouchableOpacity style={{ height: 50, width: 140, borderRadius: 25, backgroundColor: '#5c837c', justifyContent: 'center', alignItems: 'center' }} >
            <Text style={{ color: 'white', fontSize: 14 }} >Annulla</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ height: 50, width: 140, borderRadius: 25, backgroundColor: global.primary, justifyContent: 'center', alignItems: 'center' }} >
            <Text style={{ color: 'white', fontSize: 14 }} >CONFERMA</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView >
    );
  }
}


