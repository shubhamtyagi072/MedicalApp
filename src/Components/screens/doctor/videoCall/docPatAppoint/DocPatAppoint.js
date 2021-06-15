/* @flow */

import React, { Component } from "react";
import { View, Text, Dimensions,StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import styles from './styles';
import TextCommon from '../../../../Common/TextCommon'
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";

import global from "../../../../Common/global"
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomeHeader from "../../../../Common/CustomeHeader";
import CustomeBottomBar from "../../../../Common/CustomeBottomBar";
import CalendarPicker from "react-native-calendar-picker";
import { getPatientListByDoc } from "../../../../../Actions/getAllPatinentByDoctor";
import { getDocCallAppoListByDocPat } from "../../../../../Actions/getDocCallAppoListByDocPat";
import { getDocLiveAppoListByDocPat } from "../../../../../Actions/getDocLiveAppoListByDocPat";
import storage from "../../../../../utils/storage";
import moment from "moment";
var patientId;
export default class DocPatAppoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: null,
            doc_id : '',
            intervalRef: null,
            currentPatient: '',
        };
    }

    componentDidMount() {
        //get call appointment and live appointment lists filtered by patient_id

        const { patient } = this.props.navigation.state.params;
        patientId=patient.id;
        console.log('testing in appointment for patient params===;;;;;;;;;;;;;;;;;;;;;;;',patientId)
        this.getInitialData(patient)

        //TODO unlock timer
        //const intervalRef = setInterval(this.getPatientApiCAll, 5000);
        this.setState({
            //intervalRef,
            currentPatient: patient
        });
        const intervalRef = setInterval(this.getInitialData, 5000);
        this.setState({ intervalRef });
    }

    componentWillUnmount = async () => {
        clearInterval(this.state.intervalRef);
    }

    //getting appointments list
    getInitialData = async(patient) => {
        //TODO Get data to be displayed on the calendar
        const userData = JSON.parse(await storage.get("Login"));
        const doctor = userData.user || userData.doctor;

        let data = {
            doctor_id: doctor.id,
            patient_id: patient.id
        }

        let callAppointments = await getDocCallAppoListByDocPat(data);
        let liveAppointments = await getDocLiveAppoListByDocPat(data);

        //adding the type of the appointment to every element of the object
        let finalArray = [];
        await Promise.all(callAppointments.appointment.map( (elem) => {
            let newElem = Object.assign({}, elem);
            newElem.type = "call";
            return newElem;
        })).then((newElem) => {
            //Sortig the array of appointments based on the most recent date
            if (Platform.OS === "android") {
                newElem.sort((a, b) => moment(b.date) - moment(a.date));
            } else {
                newElem.sort((a, b) => a.date < b.date);
            }

            let newArray = [];
            finalArray = newElem.filter((elem) => (moment().diff(moment(elem.date), 'days') <= 7));


        })

        //adding the type of the appointment to every element of the object
        await Promise.all(liveAppointments.appointment.map( (elem) => {
            let newElem = Object.assign({}, elem);
            newElem.type = "live";
            return newElem;
        })).then((newElem) => {
            newElem.push(...finalArray)
            //Sortig the array of appointments based on the most recent date
            if (Platform.OS === "android") {
                newElem.sort((a, b) => moment(b.date) - moment(a.date));
            } else {
                newElem.sort((a, b) => a.date < b.date);
            }


            let newAppointments = newElem.filter((elem) => (moment().diff(moment(elem.date), 'days') <= 7));

            this.setState({
                appointments: [...newAppointments]
            })
        })
    }


    componentWillUnmount() {
        //clearInterval(this.state.intervalRef);
    }

    getAppointmentByPatientDoc = async () => {
        const res = JSON.parse(await this.getUser_Detail())
        console.log("respo1234 ", res)
        let data = {
            "doctor_id": res.user.id
        }
        this.state.doc_id = res.user.id
        const response = await getPatientListByDoc(data)
        console.log("resp", response)

        this.setState({
            data: response.patientsAccepted
        })
    }

    //TODO add adding method for the appointments
    addAppointment = ()=>{}

    getUser_Detail = async () => {
        return await storage.get('Login')
    }

    render() {
        if (this.props.RegisterIsLoding) {
            return <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }} color={'blue'} size="large" />
        }

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />


                <CustomeHeader
                    backgroundColor={global.secondary}
                    text={"Televisita"}
                    navigation={this.props.navigation}
                />
                <View style={{ marginHorizontal: 20, marginTop: 10, flex: 1 }} >
                    <View style={{ alignSelf: 'flex-end' }} >
                        <AntDesign name="plus" onPress={() => { this.props.navigation.navigate('docAppoSecond') }} color={global.secondary} size={25} style={{ marginLeft: 20 }} />
                    </View>


                    <View style={{ marginBottom: '10%',marginTop: '2%',height: ((Dimensions.get('screen').height * 30) / 100), maxHeight: ((Dimensions.get('screen').height * 30) / 100) }}>
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
                    <Text style={{color: 'black', fontSize: 18, fontWeight: "bold", marginTop:25}}>Appuntamenti programmati</Text>

                    <ScrollView style={{ maxHeight: '32%' }} scrollEnabled={true} showsVerticalScrollIndicator={true} >
                            {console.log("this.state.appointments", this.state.appointments),
                            this.state.appointments && this.state.appointments.map((item, index) => {
                                let dateTime = moment(item.date).format('DD MMMM YYYY');
                                let time = item.time && moment(item.time).format('HH:mm');
                                let roomID = `${item.doctor_id} - ${item.patient_id}`;
                                JSHash("message", CONSTANTS.HashAlgorithms.sha256).then(b => roomID = b).catch(er => console.log(er));

                                console.log("roomID", roomID)
                                console.log("item", moment(dateTime).format('DD MMMM YYYY'));
                                return (
                                    <View key={index} style={{ marginHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 15 }}>
                                        <View style={{width: '70%',maxWidth: '70%',justifyContent:'flex-start'}}>
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
                                        <TouchableOpacity   onPress={()=>item.type== "call" && this.props.navigation.navigate("VideoRoom" , { type: roomID ,patient_id:patientId} )} style={{maxWidth: '30%',width: '30%', height: 40, borderRadius: 5, backgroundColor: item.type === "call"? '#005545' :  '#CCCCCC', paddingHorizontal: 0, justifyContent: 'center', }} >
                                            <TextCommon
                                                //avvia la chaimata
                                                text={item.type== "call"? "Televisita" :  "Visita"}
                                                textAlign={"center"}
                                                fontSize={10}
                                                color={item.type === "call"? '#FFF' :  '#000'}
                                                fontWeight={"600"}
                                                textAlign={"center"}
                                                fontFamily={"Poppins-Regular"}

                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                    </ScrollView>
                </View>
                <View style={styles.bottomView}>
                    <CustomeBottomBar
                        activeIndex={4}
                        navigation={this.props.navigation}
                    />
                </View>



            </SafeAreaView>
        );
    }
}
