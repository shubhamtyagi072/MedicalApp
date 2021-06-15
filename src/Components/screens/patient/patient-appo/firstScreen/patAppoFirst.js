/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import styles from './styles';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";

import global from "../../../../Common/global"
import { registerApi } from '../../../../../Actions/registerAction'
import CustomeHeader from "../../../../Common/CustomeHeader";
import AntDesign from 'react-native-vector-icons/AntDesign'
import TextinputCommon from "../../../../Common/TextinputCommon";
import TextCommon from "../../../../Common/TextCommon";
import storage from "../../../../../utils/storage";
import { getDocCallAppoListByDoc } from "../../../../../Actions/getDocCallAppoListByDoc";
import { getDocLiveAppoListByDoc } from "../../../../../Actions/getDocLiveAppoListByDoc";
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';



class patAppoFirst extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            date: new Date(),
            doc_id : '',
            showDate: false,
            selectedStartDate: null,
            intervalRef: null
        };
    }

    //getting appointments list
    getInitialData = async() => {
        //TODO Get data to be displayed on the calendar
        const { doctor } = this.props.navigation.state.params

        let data = {
            doctor_id: doctor.id
        }

        let callAppointments = await getDocCallAppoListByDoc(data);
        let liveAppointments = await getDocLiveAppoListByDoc(data);

        //adding the type of the appointment to every element of the object
        let callAppointmentsComplete = callAppointments.appointment.map(function(elem) {
            let newElem = Object.assign({}, elem);
            newElem.type = "call";
            return newElem;
        })

        //adding the type of the appointment to every element of the object
        let liveAppointmentsComplete = liveAppointments.appointment.map(function(elem) {
            let newElem = Object.assign({}, elem);
            newElem.type = "live";
            return newElem;
        })

        let finalArray = callAppointmentsComplete.concat(liveAppointmentsComplete); //unifying the two arrays of apppointments
        
        //Sortig the array of appointments based on the most recent date
        if(Platform.OS === "android"){
            finalArray.sort((a, b) => moment(b.date) - moment(a.date));
        }else{
            finalArray.sort((a, b) => moment(a.date) <= moment(b.date));
        }
        
        let newArray = []
        newArray = finalArray.filter((elem) => (moment().diff(moment(elem.date), 'days') <= 7));

        this.setState({
            appointments: newArray
        })
    }

    componentDidMount() {
        //get call appointment and live appointment lists filtered by doctor_id
        this.getInitialData()

        //TODO unlock timer
        //const intervalRef = setInterval(this.getPatientApiCAll, 5000);
        this.setState({ 
         //   intervalRef : intervalRef
        });
    }

    componentWillUnmount() {
       // clearInterval(this.state.intervalRef);
    }

    getAppointmentByPatientDoc = async () => {
        const {doctor} = this.props.navigation.state.params;
        console.log("SELECTED DOCTOR ", doctor)
        let data = {
            "doctor_id": doctor.id
        }

        const response = await getPatientListByDoc(data)
        console.log("resp", response)

        this.setState({
            data: response.patientsAccepted
        })
    }

    getUser_Detail = async () => {
        return await storage.get('Login')
    }
    render() {
        if (this.props.RegisterIsLoding) {
            return <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }} color={'blue'} size="large" />
        }

        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const { doctor } = this.props.navigation.state.params

        // let currentTime = String(time.getHours()) + ":" + String(time.getMinutes())
        // if(Date.parse(currentTime) > )
        // console.log("das", String(time.getHours()) + ":" + String(time.getMinutes() + " :00"))
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />


                <CustomeHeader
                    backgroundColor={global.primary}
                    text={"Gestione Appuntamenti"}
                    navigation={this.props.navigation}
                />
                <View style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 10 ,height:'79%'}} >
                    <Text style={{color: 'black', fontSize: 18, fontWeight: "bold"}}>Appuntamenti programmati</Text>

                    <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={true} >
                            {this.state.appointments ? (this.state.appointments.map((item, index) => {
                                let dateTime = moment(item.date).format('DD MMMM YYYY');
                                let time = moment(item.time).format('HH:mm');
                                let roomID = `${item.doctor_id} - ${item.patient_id}`;
                                JSHash("message", CONSTANTS.HashAlgorithms.sha256).then(b => roomID = b).catch(er => console.log(er));

                                console.log("roomID", roomID)
                                console.log("item", moment(dateTime).format('DD MMMM YYYY'));
                                return (
                                    <View key={index} style={{ marginHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 15 }}>
                                        <View>
                                            <TextCommon
                                                text={dateTime}
                                                fontSize={global.fontSize_16}
                                                fontFamily={"Poppins-Bold"}
                                                color={"#414141"}
                                            />
                                            {/* <View style={{ marginTop: 5 }} /> */}
                                            <TextCommon
                                                text={time}
                                                textAlign={"center"}
                                                fontSize={12}
                                                fontWeight={"600"}
                                                textAlign={"center"}
                                                fontFamily={"Poppins-Regular"}
                                                lineHeight={16}
                                            />
                                        </View>
                                        <TouchableOpacity   /*onPress={()=>item.type== "call" && this.props.navigation.navigate("VideoRoom" , { type: roomID } )}*/ style={{ height: 40, borderRadius: 5, backgroundColor: item.type === "call"? '#005545' :  '#CCCCCC', paddingHorizontal: 8, justifyContent: 'center', }} >
                                            <TextCommon
                                                //avvia la chaimata
                                                text={item.type== "call"? "Televisita" :  "Appuntamento"}
                                                textAlign={"center"}
                                                fontSize={global.fontSize_10}
                                                fontWeight={"600"}
                                                textAlign={"center"}
                                                fontFamily={"Poppins-Regular"}
                                                color={item.type== "call"? "#FFF" :  "#000"}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                            ) : (
                                <Text style={{ padding: 10 }}>Non hai appuntamenti programmati</Text>
                              )}
                    </ScrollView>
                </View>
                <View style={styles.bottomView}>

                </View>
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state, action) => {
    let RegisterData = ""
    let Registerrror = ""
    let RegisterIsLoding = ""

    if (state && state.Register) {
        RegisterData = state.Register.success
        Registerrror = state.Register.error,
            RegisterIsLoding = state.Register.isLoading
    }

    return {
        RegisterData,
        Registerrror,
        RegisterIsLoding
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerApi: data => {
            dispatch(registerApi(data));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(patAppoFirst);
