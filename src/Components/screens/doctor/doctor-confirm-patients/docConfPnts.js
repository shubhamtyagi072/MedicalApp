/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, Modal, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import styles from './styles';
import TextCommon from '../../../Common/TextCommon'
import RoundedButton from '../../../Common/RoundedButton'
import global from "../../../Common/global"
import { registerApi } from '../../../../Actions/registerAction'
import TextinputCommon from "../../../Common/TextinputCommon";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
//import vector icons
import DatePicker from 'react-native-datepicker';
import Icon from "react-native-vector-icons/Feather";
import CustomeHeader from "../../../Common/CustomeHeader";
import CustomeBottomBar from "../../../Common/CustomeBottomBar";

class docConfPnts extends Component {
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
            modalVisiable: false
        };
    }



    render() {

        const { status } = this.props.navigation.state.params
        // const { Detail } = this.props.navigation.state.params.patientDetails
        const item = this.props.navigation.getParam('item');
        console.log("passed info", item)


        console.log("sta", status)
        if (this.props.RegisterIsLoding) {
            return <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }} color={'blue'} size="large" />
        }
        const data = new Date()
        console.log("data", data)
        return (
            <SafeAreaView style={styles.container}>

                <StatusBar barStyle="dark-content" />



                <CustomeHeader
                    backgroundColor={global.secondary}
                    text={"Richieste"}
                    navigation={this.props.navigation}
                />
                <View style={styles.typeView}>
                    <View style={styles.roundIconView} >
                        <Entypo name="user" size={40} color="white" />
                    </View>
                    <TextCommon
                        text={item.name}
                        color={"#000000"}
                        textAlign={"center"}
                        fontSize={global.fontSize_17}
                        fontWeight={"600"}
                        textAlign={"center"}
                        fontFamily={"Montserrat-Bold"}
                    />
                </View>

                <View style={status ? styles.roundBtnView : [styles.roundBtnView, { backgroundColor: global.secondary }]} >
                    <TextCommon
                        text={status ? item.name : "La richiesta di"}
                        color={global.white}
                        textAlign={"center"}
                        fontSize={23}
                        fontWeight={"600"}
                        textAlign={"center"}
                        fontFamily={"Montserrat-Medium"}
                    />
                    <TextCommon
                        text={status ? "è un tuo" : item.name}
                        color={global.white}
                        textAlign={"center"}
                        fontSize={23}
                        fontWeight={"600"}
                        textAlign={"center"}
                        fontFamily={"Montserrat-Medium"}
                    />
                    <TextCommon
                        text={status ? "nuovo paziente" : "è stata rifiutata"}
                        color={global.white}
                        textAlign={"center"}
                        fontSize={23}
                        fontWeight={"600"}
                        textAlign={"center"}
                        fontFamily={"Montserrat-Medium"}
                    />
                </View>
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
)(docConfPnts);

