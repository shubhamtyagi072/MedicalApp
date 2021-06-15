/* @flow */

import React, { Component } from "react";
import { View, Image, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import styles from './styles';
import TextCommon from '../../../../../Common/TextCommon'
import global from "../../../../../Common/global";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomeHeader from '../../../../../Common/CustomeHeader';


export default class docPatClinicFirst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPatient: null
    };
  }

  componentDidMount() {
    const {patient} = this.props.navigation.state.params;
    console.log("patiet passed",patient)
    this.setState({
      currentPatient : patient
    })
  }

  btnOnpress = (from) => {
    console.log("patiet passed",this.state.currentPatient)
    this.props.navigation.navigate('docPatClinicSecond', { from: from, patient: this.state.currentPatient })
  }

  render() {
    const {patient} = this.props.navigation.state.params;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <CustomeHeader backgroundColor={global.secondary} text={`Diario clinico di ${patient.name}`} navigation={this.props.navigation} />

        <ScrollView>
          <View style={styles.buttonPadding}>
            <TouchableOpacity onPress={() => { this.btnOnpress("previous") }} style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: global.secondary,
              height: 50,
              borderRadius: 50 / 2,
              color: global.secondary,
              alignItems: 'center',
              flex: 1,
              marginTop: 20,
              justifyContent: 'space-between',
              paddingHorizontal: 20

            }}>
              <View style={{ flexDirection: 'row' }}>
                <Octicons name="plus" color={global.secondary} size={20} style={{ marginRight: 10 }} />
                <TextCommon
                  text={"PATOLOGIE PASSATE"}
                  color={global.secondary}
                  textAlign={"center"}
                  fontSize={13}
                  fontWeight={"600"}
                  textAlign={"center"}
                  fontFamily={"Montserrat-Bold"}
                />
              </View>
              <Ionicons name="chevron-forward" color={global.secondary} size={22} />
          </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.btnOnpress("current") }} style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: global.secondary,
              height: 50,
              borderRadius: 50 / 2,
              color: global.secondary,
              alignItems: 'center',
              flex: 1,
              marginTop: 20,
              justifyContent: 'space-between',
              paddingHorizontal: 20

            }}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="plus-outline" color={global.secondary} size={22} style={{ marginRight: 10 }} />
                <TextCommon
                  text={"PATOLOGIE IN CORSO"}
                  color={global.secondary}
                  textAlign={"center"}
                  fontSize={13}
                  fontWeight={"600"}
                  textAlign={"center"}
                  fontFamily={"Montserrat-Bold"}
                />
              </View>

              <Ionicons name="chevron-forward" color={global.secondary} size={22} />
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={() => { this.props.navigation.navigate('thirdScreen', { from: 'clinical' }) }} style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: global.secondary,
              height: 50,
              borderRadius: 50 / 2,
              color: global.secondary,
              alignItems: 'center',
              flex: 1,
              marginTop: 20,
              justifyContent: 'space-between',
              paddingHorizontal: 20

            }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={images.calender} style={{ height: 25, width: 20, resizeMode: 'contain', marginRight: 5 }} />
                <TextCommon
                  text={"ANNOTAZIONI GIORNALIERE"}
                  color={global.secondary}
                  textAlign={"center"}
                  fontSize={13}
                  fontWeight={"600"}
                  textAlign={"center"}
                  fontFamily={"Montserrat-Bold"}
                />
              </View>
              <Ionicons name="chevron-forward" color={global.secondary} size={22} />
          </TouchableOpacity>*/}
          </View>
        </ScrollView>

        <View style={styles.commonImageStyle}>
          <Image source={require("../../../../../../Image/common_icon.png",)} />
        </View>

      </SafeAreaView >
    );
  }
}


