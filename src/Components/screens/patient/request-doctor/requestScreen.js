/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";
import styles from './styles';
import TextCommon from '../../../Common/TextCommon'
import RoundedButton from '../../../Common/RoundedButton'
import global from "../../../Common/global";
import TextinputCommon from "../../../Common/TextinputCommon";
import LoadingScreen from "../../../Common/LoadingScreen";
import { registerApi } from '../../../../Actions/registerAction'
import { bindActionCreators } from 'redux'

import Feather from 'react-native-vector-icons/Feather';
import ActionSheet from 'react-native-actionsheet'

import AntDesign from 'react-native-vector-icons/AntDesign';

//import vector icons
import DatePicker from 'react-native-datepicker';
import CustomeHeader from "../../../Common/CustomeHeader";

class requestScreen extends Component {
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

            showDate: true
        };
    }
    componentDidMount() {

    }
    onNextPress = () => {

    }
    onIndexPress = (index) => {
        if (index == 0) {
            this.props.navigation.navigate('actionSheetFirst')
        }

    }
    render() {
        if (this.props.RegisterIsLoding) {
            return <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }} color={'blue'} size="large" />
        }
        const data = new Date()
        console.log("data", data)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <LoadingScreen loading={false} />
                <View style={styles.topHeaderView}>

                    <Feather name="menu" color="white" size={25} style={{ marginLeft: 10, marginTop: -10 }} onPress={() => { this.props.navigation.openDrawer() }} />
                    {/* Registrazione */}
                    <TextCommon
                        text={"Richieste"}
                        color={"#FFFFFF"}
                        textAlign={"center"}
                        fontSize={global.fontSize_17}
                        fontWeight={"600"}
                        textAlign={"center"}
                        fontFamily={"Montserrat-Bold"}
                    />
                    <AntDesign name="left" color="white" size={25} style={{ marginRight: 10 }} onPress={() => { this.props.navigation.goBack() }} />

                </View>
                <View style={{ marginTop: '20%' }}>

                    <RoundedButton
                        btnText={"I TUOI MEDICI"}
                        backgroundColor={global.secondary}
                        onPress={() => this.props.navigation.navigate("patientYourDoc")}
                    />
                </View>
                <View style={{ marginTop: 40 }}>

                    <RoundedButton
                        btnText={"TROVA IL TUO MEDICO"}
                        backgroundColor={global.primary}
                        onPress={() => this.props.navigation.navigate("requesTypeScreen")}
                    />
                </View>

                <View style={styles.bottomView} />



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
)(requestScreen);

