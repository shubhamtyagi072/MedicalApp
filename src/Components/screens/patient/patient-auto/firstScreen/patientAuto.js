/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, Switch, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from './styles';
import TextCommon from '../../../../Common/TextCommon'
import global from "../../../../Common/global";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import storage from "../../../../../utils/storage";
import { getPatTestList } from "../../../../../Actions/getPatTestList";
import CustomeHeader from "../../../../Common/CustomeHeader";



export default class patientAuto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      data: [],
    };
  }
  componentDidMount() {
    this.getPatientTestistApiCAll();
  }

  getPatientTestistApiCAll = async () => {

    const res = JSON.parse(await this.getUser_Detail())
    let data = {
      "patient_id": parseInt(res.patient.id)
    }
    const response = await getPatTestList(data)

    console.log("respo1234  ", response)
    this.setState({
      data: response.testAssociation
    })
  }
  toggleSwitch = () => {
    this.setState({
      isEnabled: !this.state.isEnabled
    })
  }
  getUser_Detail = async () => {
    return await storage.get('Login')
  }
  render() {

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <CustomeHeader backgroundColor={global.primary} text={"Automonitoraggio"} navigation={this.props.navigation} />

        <View style={{ height: 16 }} />
        <ScrollView>
          {
            this.state.data.length != 0 ? this.state.data.map((item, index) => {
              return (
                <View key={index} style={styles.buttonPadding}>
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('testDetails', { "detailsObjc": item }) }} style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: global.primary,
                    height: 50,
                    borderRadius: 50 / 2,
                    color: global.primary,
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'space-between',
                    paddingHorizontal: 20

                  }}>
                    <View style={{ flexDirection: 'row' }}>

                      <TextCommon
                        text={item.test_assigned}
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
              )
            }) : (<TextCommon  text="Nessun test disponibile. Chiedi al tuo medico" color={"#000000"} fontSize={global.fontSize_16} fontWeight={"600"} textAlign={"center"} fontFamily={"Montserrat-Bold"} />)
          }

        </ScrollView>

        <View style={styles.bottomView} />

      </SafeAreaView >
    );
  }
}


