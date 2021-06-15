/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import styles from './styles';
import TextCommon from '../../../Common/TextCommon'
import RoundedButton from '../../../Common/RoundedButton'
import global from "../../../Common/global"
import { registerApi } from '../../../../Actions/registerAction'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import CustomeHeader from "../../../Common/CustomeHeader";
import storage from '../../../../utils/storage'

//import vector icons
import { getDocList } from '../../../../Actions/getDoctorList'
import {docListForRequest} from '../../../../Actions/docListForRequest'
import { TextInput } from "react-native-gesture-handler";
import Saprator from "../../../Common/saprator";

class requestDocListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data2: [],
            searchTxt: ""
        };
    }


    componentDidMount() {
        this.getDocListApiCAll()
    }
    getDocListApiCAll = async () => {
        const { type } = this.props.navigation.state.params
        const userData = JSON.parse(await this.getUser_Detail())

        let data = {
            "patientId": parseInt(userData.patient.id)
        }
        const response = await docListForRequest(data)
        console.log('response in the componennt+++++++++++++',response[0])
        let filterdArray = []
        if (type == "basic") {
            filterdArray = response.filter(item => item.specialization == null)
        } else {
            filterdArray = response.filter(item => item.specialization != null)
        }
        this.setState({
            data2: filterdArray
        },()=>{
          console.log('printing the filterd arrar--------------',this.state.data2)
          })
    }

    onSearchTxtChange = (value) => {
        this.setState({ searchTxt: value })
        if (value.length > 0) {
            var FilerdArray = this.state.data2.filter(item => (item.name.toLowerCase()).includes(value.toString().toLowerCase()))
            this.setState({
                data2: FilerdArray
            })
        }
        else {
            this.getDocListApiCAll()
        }
    }
    getUser_Detail = async () => {
        return await storage.get('Login')
    }

    render() {
        const { type } = this.props.navigation.state.params
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <CustomeHeader backgroundColor={global.primary} text={type === "basic" ? "Medico di famiglia" : "Medico specialista"} navigation={this.props.navigation} />
                <View style={styles.topHeaderView}>
                    <View style={{ width: '90%', height: 50, borderRadius: 25, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ececec' }} >
                        <AntDesign name="left" color="gray" size={30} style={{ marginHorizontal: 5 }} onPress={() => { this.props.navigation.goBack() }} />
                        <TextInput
                            placeholder={"Digita il nome"}
                            style={{ width: '70%', height: 40, backgroundColor: 'white' }}
                            value={this.state.search}
                            onChangeText={(value) => { this.onSearchTxtChange(value) }}
                        />
                    </View>
                </View>
                <View style={{ paddingLeft: '5%', marginVertical: 5 }} >
                    <TextCommon
                        text={type === "basic" ? "Medico di famiglia" : "Medico specialista"}
                        color={"#000000"}
                        fontSize={12}
                        fontFamily={"Montserrat-Bold"}
                    />
                </View>
                <Saprator />
                <ScrollView style={{ flex: 1, marginBottom: '14%' }} >
                    {
                        this.state.data2 && this.state.data2.length > 0 ? this.state.data2.map((objc, index) => {
                            return (
                                <View key={index} style={{maxHeight:'90%'}}>
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('requestFinalScreen', { docObjc: objc }) }} style={{ height: 70, justifyContent: 'center',maxHeight:'90%',maxWidth:'90%', marginLeft: '5%' }}  >
                                        <TextCommon
                                            text={"Dott. "+objc.name}
                                            color={"#000000"}
                                            maxWidth={"80%"}
                                            fontSize={14}
                                            fontFamily={"Montserrat-Bold"}
                                        />
                                        <TextCommon
                                            text={objc.specialization_info ? objc.specialization_info : ' '}
                                            color={"#d3d3d3"}
                                            maxWidth={"80%"}
                                            fontSize={12}
                                            fontFamily={"Montserrat-Regular"}
                                        />
                                    </TouchableOpacity>
                                    <Saprator key={index} />
                                </View>

                            )
                        }) : <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }} >
                                <TextCommon
                                    text={"Non ci sono dottori"}
                                    color={"#000000"}
                                    fontSize={17}
                                    fontFamily={"Montserrat-Bold"}
                                />
                            </View>
                    }
                </ScrollView>
                <View style={styles.bottomView} />
            </SafeAreaView >
        );
    }
}

export default requestDocListScreen;
