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
import MI from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'

//import vector icons
import DatePicker from 'react-native-datepicker';
import Icon from "react-native-vector-icons/Feather";

class videoCallScreen extends Component {
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
                <StatusBar barStyle="light-content" />

                <View style={{ position: 'absolute', height: '20%', width: '30%', borderRadius: 5, borderWidth: 3, borderColor: 'lightgreen', marginLeft: 10, marginTop: 10, zIndex: 1 }}>
                </View>

                <View style={{ flex: 1, backgroundColor: 'white' }} >
                </View>

                <View style={styles.bottomView}>
                    <View style={styles.phoneView}>
                        <MI name="phone-hangup" size={40} color={global.secondary} />
                    </View>
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
)(videoCallScreen);

