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
import { sendRequestToDoc } from "../../../../Actions/sendReqToDoc";
import storage from "../../../../utils/storage";

class requestFinalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acceptTerms: false,
            gener: "",
            date: null,
            lugdo: "",
            citta: "",
            alteza: "",
            stilo: "",
            peso: "",
            showDate: true,
            patientData: {},
            resCondtion:false
        };
    }

    getUser_Detail = async () => {
        return await storage.get('Login')
    }

    componentDidMount(){
        this.pushWork();
    }

    onRequestSent = async (docObj) => {
        console.log("Data",this.state.patientData.id,docObj.ID)
        let data = {
            "patient_id": this.state.patientData.id,
            "doctor_id": parseInt(docObj.ID),
        }
        const reponse = await sendRequestToDoc(data)


        if (reponse.status == "success") {
          this.setState({resCondtion:true});
            alert("La tua richiesta e' stata inviata")
        } else {
            alert(reponse.message)
        }
    }

    pushWork = async () => {
        const res = JSON.parse(await this.getUser_Detail())

        this.setState({
            patientData:  res.patient
        })
    }

    render() {
        const { params } = this.props.navigation.state
        const docObjc = params && params.docObjc ? params.docObjc : ""
        console.log("docObjc", docObjc)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />

                <View style={styles.topHeaderView}>
                    <Feather name="menu" color="white" size={25} style={{ marginLeft: 10, marginTop: -10 }} onPress={() => { this.props.navigation.openDrawer() }} />
                    {/* Registrazione */}
                    <TextCommon
                        text={"Medico"}
                        color={"#FFFFFF"}
                        textAlign={"center"}
                        fontSize={global.fontSize_17}
                        fontWeight={"600"}
                        maxWidth={"80%"}
                        textAlign={"center"}
                        fontFamily={"Montserrat-Bold"}
                    />
                    <AntDesign onPress={() => { this.props.navigation.goBack() }} name="left" color="white" size={25} style={{ marginRight: 10 }} />

                </View>
                <View style={styles.typeView}>
                    <View style={styles.roundIconView} >
                        <Entypo name="user" size={50} color="white" />
                    </View>
                    <View style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                        <TextCommon
                            text={docObjc.name}
                            color={"#000000"}
                            textAlign={"center"}
                            maxWidth={"96%"}
                            fontSize={global.fontSize_15}
                            fontWeight={"600"}
                            textAlign={"left"}
                            fontFamily={"Montserrat-Bold"}
                        />
                        <TextCommon
                            text={docObjc.specialization}
                            color={"#000000"}
                            maxWidth={"98%"}
                            textAlign={"left"}
                            fontSize={global.fontSize_15}
                            fontWeight={"600"}
                            fontFamily={"Montserrat-Bold"}
                        />
                    </View>
                </View>
                {docObjc.status==0 || this.state.resCondtion==true?
                  <View style={{ marginTop: 50 }} >
                      <TouchableOpacity  disabled={docObjc.status==0 || this.state.resCondtion} onPress={() => { this.onRequestSent(docObjc) }} activeOpacity={0.8} style={{ height: 50, width: '76.8%', backgroundColor: global.secondary, borderRadius: 50 / 2, borderWidth: 1, borderColor: global.grey, justifyContent: "center", alignItems: "center", alignSelf: "center" }}  >
                          <TextCommon
                              text={"RICHIESTA INVIATA"}
                              color={global.white}
                              textAlign={"center"}
                              fontSize={global.fontSize_17}
                              fontFamily={"Poppins-Regular"}
                              height={50}
                          />
                      </TouchableOpacity>
                  </View>
                  :
                <View style={{ marginTop: 50 }} >
                    <TouchableOpacity  disabled={docObjc.status==1} onPress={() => { this.onRequestSent(docObjc) }} activeOpacity={0.8} style={{ height: 50, width: '76.8%', backgroundColor: global.secondary, borderRadius: 50 / 2, borderWidth: 1, borderColor: global.grey, justifyContent: "center", alignItems: "center", alignSelf: "center" }}  >
                        <TextCommon
                            text={docObjc.status==2 ? "INVIA RICHIESTA" : "Connected"}
                            color={global.white}
                            textAlign={"center"}
                            fontSize={global.fontSize_17}
                            fontFamily={"Poppins-Regular"}
                            height={50}
                        />
                    </TouchableOpacity>
                </View>
              }
                <View style={styles.bottomView} />
            </SafeAreaView>
        );
    }
}

export default requestFinalScreen;
