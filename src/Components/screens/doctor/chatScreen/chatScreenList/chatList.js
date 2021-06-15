/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import styles from './styles';
import TextCommon from '../../../../Common/TextCommon'

import global from "../../../../Common/global"
import { registerApi } from '../../../../../Actions/registerAction'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import CustomeHeader from "../../../../Common/CustomeHeader";
import CustomeBottomBar from "../../../../Common/CustomeBottomBar";
import { getPatientList } from '../../../../../Actions/getPatientList'
import storage from "../../../../../utils/storage";
import { getPatientListByDoc } from "../../../../../Actions/getAllPatinentByDoctor";

export default class chatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            intervalRef: null,
        };
    }

    componentDidMount() {
        this.getPatientApiCAll();
        const intervalRef = setInterval(this.getPatientApiCAll, 5000);
        this.setState({ intervalRef });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalRef);
    }

    getPatientApiCAll = async () => {
        const res = JSON.parse(await this.getUser_Detail())
        console.log("respo1234 ", res)
        let data = {
            "doctor_id": res.user.id
        }
        const response = await getPatientListByDoc(data)
        console.log("resp", response)

        if (response.patientsAccepted){
            this.setState({
                data: response.patientsAccepted
            })
        }
    }

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
                    text={"Chat List"}
                    navigation={this.props.navigation}
                />
                <ScrollView style={{ flex: 1, marginBottom: '15%' }} >
                    {this.state.data.length !=0 ? ( this.state.data.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => { this.props.navigation.navigate('docChatScreen', { item : item }) }} style={styles.typeView}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        <View style={styles.roundIconView} >
                                            <Entypo name="user" size={25} color="white" />
                                        </View>
                                        <View>
                                            <TextCommon
                                                text={item.name}
                                                color={"#000000"}
                                                textAlign={"center"}
                                                fontSize={global.fontSize_17}
                                                fontWeight={"600"}
                                                textAlign={"center"}
                                                fontFamily={"Montserrat-Bold"}
                                            />
                                            {/* <TextCommon
                                                text={"Hello!"}
                                                color={"#000000"}
                                                fontSize={14}
                                            /> */}
                                        </View>
                                    </View>

                                    <View >


                                        <View style={styles.msgView} >
                                            <Ionicons name="chevron-forward-outline" size={15} color="white" />
                                        </View>



                                        {/* <View style={styles.msgView} >
                                            <TextCommon
                                                text={"35"}
                                                color={"#000000"}
                                                fontSize={10}
                                                color={"white"}
                                            />
                                        </View> */}
                                    </View>
                                </TouchableOpacity>
                            )
                        })) : (<TextCommon  text="Nessuna conversazione presente" color={"#000000"} fontSize={global.fontSize_15} fontWeight={"600"} marginTop={"10%"} textAlign={"center"} fontFamily={"Montserrat-Bold"} />)
                    }
                </ScrollView>

                <View style={styles.bottomView}>
                    <CustomeBottomBar
                        activeIndex={3}
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



