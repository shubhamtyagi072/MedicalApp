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

class pateintAssignDocListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ name: "doctor 10" }, { name: "doctor 1" }, { name: "doctor 1" }, { name: "doctor 1" }, { name: "doctor 1" }, { name: "doctor 1" }, { name: "doctor 1" }, { name: "doctor 1" }, { name: "doctor 1" }]
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
                    <AntDesign name="left" color="white" size={25} onPress={() => { this.props.navigation.goBack() }} style={{ marginRight: 10 }} />

                </View>
                <ScrollView style={{ flex: 1, marginBottom: '15%' }} >
                    {
                        this.state.data.map((item, index) => {
                            return (
                                <View style={styles.typeView}>
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('videoCall') }} style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        <View style={styles.roundIconView} >
                                            <Entypo name="user" size={25} color="white" />
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
                                    </TouchableOpacity>
                                    <View >
                                        <View style={styles.msgView} >
                                            <Entypo onPress={() => { this.props.navigation.navigate('chatScreen', {item : item}) }} name="chat" size={20} color="white" />
                                        </View>
                                    </View>


                                </View>
                            )

                        })
                    }
                </ScrollView>

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
)(pateintAssignDocListScreen);
