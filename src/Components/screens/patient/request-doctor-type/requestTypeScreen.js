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

//import vector icons
import DatePicker from 'react-native-datepicker';
import Icon from "react-native-vector-icons/Feather";

class requestTypeScreen extends Component {
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



    render() {
        if (this.props.RegisterIsLoding) {
            return <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }} color={'blue'} size="large" />
        }
        const data = new Date()
        console.log("data", data)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />


                <View style={styles.topHeaderView}>

                    <Feather name="menu" color="white" size={25} style={{ marginLeft: 10, marginTop: -10 }} onPress={() => { this.props.navigation.openDrawer() }} />
                    {/* Registrazione */}
                    <TextCommon
                        text={"Trova il tuo medico"}
                        color={"#FFFFFF"}
                        textAlign={"center"}
                        fontSize={global.fontSize_17}
                        fontWeight={"600"}
                        textAlign={"center"}
                        fontFamily={"Montserrat-Bold"}
                    />
                    <AntDesign onPress={() => { this.props.navigation.goBack() }} name="left" color="white" size={25} style={{ marginRight: 10 }} />

                </View>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('requestDocListScreen', { "type": "basic" }) }} style={styles.typeView}>
                    <View style={styles.roundIconView} >
                        <Entypo name="user" size={30} color="white" />
                    </View>
                    <TextCommon
                        text={"Medico di famiglia"}
                        color={"#000000"}
                        textAlign={"center"}
                        fontSize={global.fontSize_17}
                        fontWeight={"600"}
                        textAlign={"center"}
                        fontFamily={"Montserrat-Bold"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('requestDocListScreen', { "type": "special" }) }} style={styles.typeView}>
                    <View style={styles.roundIconView} >
                        <Entypo name="user" size={30} color="white" />
                    </View>
                    <TextCommon
                        text={"Medico specialista"}
                        color={"#000000"}
                        textAlign={"center"}
                        fontSize={global.fontSize_17}
                        fontWeight={"600"}
                        textAlign={"center"}
                        fontFamily={"Montserrat-Bold"}
                    />
                </TouchableOpacity>

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
)(requestTypeScreen);

