/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import TextCommon from '../../../../Common/TextCommon'
import RoundedButton from '../../../../Common/RoundedButton'
import global from "../../../../Common/global";
import TextinputCommon from "../../../../Common/TextinputCommon";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from "react-native-gesture-handler";
import { getAllPathologyList } from '../../../../../Actions/getCurrentPathologyByPatient';
import { submitPathology } from "../../../../../Actions/submitPathology";
import styles from "./styles";
import CustomeHeader from "../../../../Common/CustomeHeader";
import storage from "../../../../../utils/storage";

export default class PatientPathology extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      render: false,
      searchTxt: "",
      rawResponse: [],
      from: ""
    };
  }

  componentDidMount = () => {

    const { from } = this.props.navigation.state.params
    this.setState({
      from: from
    })
    this.getAllPatologieApiCall()

  }

  getAllPatologieApiCall = async () => {
    const response = await getAllPathologyList()
    console.log("response", response)
    
    const group = response.pathology
      .sort((a, b) => a.name.localeCompare(b.name))
      .reduce((r, e) => {
        const key = e.name[0];
        if (!r[key]) r[key] = []
        r[key].push(e);
        return r;
      }, []);
    console.log("group", group)
    this.setState({ data: group, rawResponse: response.pathology, render: !this.state.render })
  }

  searchText = (searchTxt) => {

    this.setState({
      searchTxt: searchTxt
    })
    if (searchTxt.length > 0) {
      console.log("raw", this.state.rawResponse)
      console.log("Search", searchTxt)
      var filterArray = this.state.rawResponse.filter(item => item.name.toLowerCase().includes(searchTxt.toLowerCase()))
      console.log("filterArray", filterArray)

      const group = filterArray
        .sort((a, b) => a.name.localeCompare(b.name))
        .reduce((r, e) => {
          const key = e.name[0];
          if (!r[key]) r[key] = []
          r[key].push(e);
          return r;
        }, []);
      console.log("group", group)
      this.setState({ data: group })
    } else {
      this.getAllPatologieApiCall()
    }
  }

  getUser_Detail = async () => {
    return await storage.get('Login')
  }

  //method to add another pathology to the patient history
  addPathology = async (selectedPathology, from) => {
    this.setState({ isLoading: true })
    const res = JSON.parse(await this.getUser_Detail());
    var currentDate = JSON.stringify(new Date());
    currentDate = currentDate.split("T");
    var data = {}
    console.log("selected pathology", selectedPathology)
    if (from === "current") {
      data = {
        "patient_id": res.patient.id,
        "pathology_id": selectedPathology.id,
        "recent_pathology_date": this.state.date,
        "past_pathology_date": this.state.yearDate,
        "description": this.state.notes
      }
    } else if (from === "previous") {
      console.log("previous***",selectedPathology)
      data = {
        "patient_id": res.patient.id,
        "pathology_id": selectedPathology.id,
        "recent_pathology_date": Date.now(),
        "past_pathology_date": Date.now(),
        "description": selectedPathology.description
      }
    } else {
      data = {
        "patient_id": parseInt(res.patient.id),

        "notes": this.state.notes,
        "current_date": currentDate[0].replace(/"/g, '')
      }
    }

    const reponse = await submitPathology(data, from)
    console.log("reponse", reponse)
    if (reponse.status == "success") {
      this.setState({ isLoading: false })
      //alert(reponse.message)
      this.props.navigation.navigate('secondScreen', { from: from })
    } else {
      alert(reponse.message)
    }
  }
  
  render() {

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <CustomeHeader backgroundColor={global.primary} text= "Patologie"  navigation={this.props.navigation} />



        <View style={{ height: 50, backgroundColor: '#c7c7cc' }}>
          <View style={{ height: 40, margin: 5, backgroundColor: 'white', borderRadius: 15, justifyContent: 'center', paddingHorizontal: 10, flexDirection: 'row' }}>
            <Feather name="search" size={20} style={{ alignSelf: 'center' }} />
            <TextInput
              style={{ height: 40, flex: 1, marginLeft: 10 }}
              onChangeText={(value) => { this.searchText(value) }}
              value={this.state.searchTxt}
            />
          </View>
        </View>
        <ScrollView style={{ flex: 1 }} >
          <View style={{ marginTop: 5 }} >
            {
              Object.entries(this.state.data).map(([key, value], index) => {
                return (
                  <View key={index}>
                    <View style={{ backgroundColor: '#f9f9f9' }} >
                      <Text style={{ marginLeft: 15, fontSize: 16, fontWeight: 'bold' }} >{key.toUpperCase()}</Text>
                    </View>
                    {
                      value.map((item, insideIndex) => {
                        return (
                          <TouchableOpacity key={insideIndex} onPress={(item) => { this.state.from == "current" ? (this.props.navigation.navigate('thirdScreen', { detils: value[insideIndex], from: this.state.from })) : this.addPathology(value[insideIndex],this.state.from)}} style={{ borderBottomColor: '#f9f9f9', borderBottomWidth: 2, marginLeft: 15, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Text style={{ fontSize: 16, paddingVertical: 10 }} >{item.name}</Text>
                              <Ionicons name="chevron-forward" color={'#c7c7cc'} size={22} style={{ marginRight: 10 }} />
                            </View>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                )
              })
            }
          </View>
        </ScrollView>

        <View style={styles.commonImageStyle}>
        <Image source={require("../../../../../Image/common_icon.png",)} />

        </View>

      </SafeAreaView >
    );
  }
}


