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
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

//import vector icons
import DatePicker from 'react-native-datepicker';
import Icon from "react-native-vector-icons/Feather";
import CustomeHeader from "../../../Common/CustomeHeader";
import CustomeBottomBar from "../../../Common/CustomeBottomBar";
import { getPendingRequests } from "../../../../Actions/getPendingRequests";
import { getProfile } from "../../../../Actions/getPatientProfile";
import storage from "../../../../utils/storage";

export default class doctorRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            intervalRef: null,
        };
    }

    getPatientApiCAll =  async () => {
        //getting all the request for the current not still validated
        const res = JSON.parse(await storage.get('Login'));
        const user = res.user || res.doctor;

        let data = {
            doctor_id: user.ID,
            status: 0,
        }

        //creating new testAssociation array of objects containing the  details off the patient
        var newTestAssociation = [];
        getPendingRequests(data).then((response)=>{
            //getting current requests for association between patient and  doctors still pending
            console.log("*****RESPONSE FROM SERVER",user.ID)
            if (response.status == "success") {
                this.setState({
                    data: response.associations.filter((value)=>{
                        return value.status!=1
                    })
                })
            } else {

                alert(response.message)
            }
        });

    }

    componentDidMount() {
        this.getPatientApiCAll();
       // const intervalRef = setInterval(this.getPatientApiCAll, 1000);
       // this.setState({ intervalRef });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalRef);
    }

    

    render() {
        if (this.props.RegisterIsLoding) {
            return <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }} color={'blue'} size="large" />
        }
        const data = new Date()
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />


                <CustomeHeader
                    backgroundColor={global.secondary}
                    text={"Richieste"}
                    navigation={this.props.navigation}
                />
                <ScrollView style={{ flex: 1, marginBottom: '15%' }} >
                {
                    this.state.data.length!=0 ? (this.state.data.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('doctorReqPro', { "Detail": item }) }} style={styles.typeView}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        <View style={styles.roundIconView} >
                                            <Entypo name="user" size={25} color="white" />
                                        </View>
                                        <TextCommon
                                            text={item.patientDetails ? item.patientDetails.name : ''}
                                            color={"#000000"}
                                            textAlign={"center"}
                                            fontSize={global.fontSize_17}
                                            fontWeight={"600"}
                                            textAlign={"center"}
                                            fontFamily={"Montserrat-Bold"}
                                        />
                                        {console.log(item)}
                                    </View>
                                    <View >
                                        <View style={styles.msgView} >
                                            <Ionicons name="chevron-forward-outline" size={15} color="white" />
                                        </View>
                                    </View>


                                </TouchableOpacity>
                            )

                        })) : (<TextCommon  text="Nessuna richiesta di associazione" color={"#000000"} fontSize={global.fontSize_15} fontWeight={"600"} marginTop={"10%"} textAlign={"center"} fontFamily={"Montserrat-Bold"} />)
                    }
                </ScrollView>

                <View style={styles.bottomView} >
                    <CustomeBottomBar
                        activeIndex={2}
                        navigation={this.props.navigation}
                    />
                </View>



            </SafeAreaView>
        );
    }
}

