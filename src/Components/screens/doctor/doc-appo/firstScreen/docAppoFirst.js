/* @flow */

import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { connect } from "react-redux";
import styles from './styles';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";

import global from "../../../../Common/global"
import { registerApi } from '../../../../../Actions/registerAction'
import { getProfile } from '../../../../../Actions/getPatientProfile';
import CustomeBottomBar from "../../../../Common/CustomeBottomBar";
import CustomeHeader from "../../../../Common/CustomeHeader";
import AntDesign from 'react-native-vector-icons/AntDesign'
import TextinputCommon from "../../../../Common/TextinputCommon";
import TextCommon from "../../../../Common/TextCommon";
import storage from "../../../../../utils/storage";
import { getDocCallAppoListByDoc } from "../../../../../Actions/getDocCallAppoListByDoc";
import { getDocLiveAppoListByDoc } from "../../../../../Actions/getDocLiveAppoListByDoc";
import CalendarPicker from 'react-native-calendar-picker';
import moment from "moment";

moment.locale('it');


class docAppFirst extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            date: new Date(),
            doc_id : '',
            showDate: false,
            selectedStartDate: null,
            intervalRef: '',
            callAppointments: null,
            liveAppointments: null,
            appointments: null,
            roomNumber: null,
        };
    }    

    componentDidMount = async () => {
        //get call appointment and live appointment lists filtered by doctor_id
        this.getInitialData();
        const intervalRef = setInterval(this.getInitialData, 5000);
        this.setState({ intervalRef });
    }

    //getting appointments list
    getInitialData = async () => {
        //TODO Get data to be displayed on the calendar
        const userData = JSON.parse(await storage.get("Login"));
        const doctor = userData.user || userData.doctor;

        let data = {
            doctor_id: doctor.id
        }

        let callAppointments = await getDocCallAppoListByDoc(data);
        let liveAppointments = await getDocLiveAppoListByDoc(data);

        //adding the type of the appointment to every element of the object
        let finalArray = [];
        await Promise.all(callAppointments.appointment.map(async(elem) => {
            let newElem = Object.assign({}, elem);
            newElem.type = "call";
            let respPatient = await this.getUserProfile(elem)
            newElem.patient = respPatient.patient;
            return newElem;
        })).then((newElem)=>{
            //Sortig the array of appointments based on the most recent date
            if(Platform.OS === "android"){
                newElem.sort((a, b) => moment(b.date) - moment(a.date));
            }else{
                newElem.sort((a, b) => a.date < b.date);
            }

            let newArray = [];
            finalArray = newElem.filter((elem) => (moment().diff(moment(elem.date), 'days') <= 7));

            
        })

        //adding the type of the appointment to every element of the object
        await Promise.all(liveAppointments.appointment.map( async (elem) => {
            let newElem = Object.assign({}, elem);
            newElem.type = "live";
            let respPatient = await this.getUserProfile(elem)
            newElem.patient = respPatient.patient;
            return newElem;
        })).then((newElem)=>{
            newElem.push(...finalArray)
            //Sortig the array of appointments based on the most recent date
            if(Platform.OS === "android"){
                newElem.sort((a, b) => moment(b.date) - moment(a.date));
            }else{
                newElem.sort((a, b) => a.date < b.date);
            }
            
            
            let newAppointments = newElem.filter((elem) => (moment().diff(moment(elem.date), 'days') <= 7));

            this.setState({
                appointments: [...newAppointments]
            })
        })
    }

    componentWillUnmount = async () => {
       clearInterval(this.state.intervalRef);
    }

    getAppointmentByPatientDoc = async () => {
        const res = JSON.parse(await this.getUser_Detail())
        let data = {
            "doctor_id": res.user.id
        }
        this.state.doc_id = res.user.id
        const response = await getPatientListByDoc(data)

        this.setState({
            data: response.patientsAccepted
        })
    }

    getUser_Detail = async () => {
        return await storage.get('Login')
    }

    getUserProfile = async (elem) => {
        let data = {
            id: elem.patient_id
        }
        result = await getProfile(data);
        return result;
    }

    render() {
        if (this.props.RegisterIsLoding) {
            return <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }} color={'blue'} size="large" />
        }

        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';

        // let currentTime = String(time.getHours()) + ":" + String(time.getMinutes())
        // if(Date.parse(currentTime) > )
        // console.log("das", String(time.getHours()) + ":" + String(time.getMinutes() + " :00"))
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />


                <CustomeHeader
                    backgroundColor={global.secondary}
                    text={"Gestione Appuntamenti"}
                    navigation={this.props.navigation}
                />
                <View style={{ marginHorizontal: 20, marginTop: 10,flexDirection:'column',justifyContent:'space-evenly' }} >
                    <View style={{ alignSelf: 'flex-end', maxHeight: '5%',height:'4%' }} >
                        <AntDesign name="plus" onPress={() => { this.props.navigation.navigate('docAppoSecond',{"dateChoosen": this.state.date}) }} color={global.secondary} size={25} style={{ marginLeft: 20 }} />
                    </View>
                    <View style={{ marginBottom: '10%',marginTop: '2%',height: ((Dimensions.get('screen').height * 35) / 100), maxHeight: ((Dimensions.get('screen').height * 35) / 100) }}>
                        <CalendarPicker
                            weekdays={['Dom','Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']}
                            months={['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']}
                            previousTitle="Precedente"
                            nextTitle="Prossimo"
                            height={330}
                            dayShape={'circle'}
                            disabledDates={()=>{return }}
                            selectedDayColor={global.primary}
                            onDateChange={this.onDateChange}/>
                    </View>
                    <Text style={{color: 'black', fontSize: 18, fontWeight: "bold"}}>Appuntamenti programmati</Text>
                    <View style={{ maxHeight: ((Dimensions.get('screen').height * 30) / 100), height: ((Dimensions.get('screen').height * 29) / 100)}}>
                    <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={true} >
                            {
                            this.state.appointments && this.state.appointments.length > 0 ? this.state.appointments.map((item, index) => {
                                let dateTime = moment(item.date).format('DD MMM YYYY');
                                let time = item.time && moment(item.time).format('HH:mm');
                                let roomID = `${item.doctor_id} - ${item.patient_id}`;
                                JSHash("message", CONSTANTS.HashAlgorithms.sha256).then(b => roomID = b).catch(er => console.log(er));
                                 return (
                                    <View key={index} style={{ marginHorizontal: 5, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 15 }}>
                                        <View style={{width: '25%',maxWidth: '29%',justifyContent:'flex-start'}}>
                                            <TextCommon
                                                text={dateTime}
                                                fontSize={12}
                                                fontFamily={"Poppins-Bold"}
                                                color={"#414141"}
                                            />
                                            {/* <View style={{ marginTop: 5 }} /> */}
                                            <TextCommon
                                                text={time}
                                                textAlign={"left"}
                                                fontSize={12}
                                                fontWeight={"600"}
                                                fontFamily={"Poppins-Regular"}
                                                lineHeight={16}
                                            />
                                        </View>
                                        <View style={{width: '51%',alignItems:'flex-start'}}>
                                            <TextCommon
                                                text={item.patient && item.patient.name}
                                                fontSize={13}
                                                justifyContent={'flex-start'}
                                                textAlign={"left"}
                                                fontFamily={"Poppins-Bold"}
                                                color={"#414141"}
                                            />
                                        </View>
                                        <TouchableOpacity   onPress={()=>item.type== "call" && this.props.navigation.navigate("VideoRoom" , { type: roomID,patient_id: item.patient_id } )} style={{maxWidth: '23%',width: '23%', height: 40, borderRadius: 5, backgroundColor: item.type === "call"? '#005545' :  '#CCCCCC', paddingHorizontal: 0, justifyContent: 'center', }} >
                                            <TextCommon
                                                //avvia la chaimata
                                                text={item.type== "call"? "Televisita" :  "Visita"}
                                                textAlign={"center"}
                                                fontSize={9}
                                                color={item.type === "call"? '#FFF' :  '#000'}
                                                fontWeight={"600"}
                                                textAlign={"center"}
                                                fontFamily={"Poppins-Regular"}

                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }):(<Text style={{ paddingTop: 10 }}>Non hai ancora fissato nessun appuntamento</Text>)}
                    </ScrollView>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <CustomeBottomBar
                        activeIndex={1}
                        navigation={this.props.navigation}
                    />
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
)(docAppFirst);
