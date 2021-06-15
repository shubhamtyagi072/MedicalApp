/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, Switch, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from './styles';
import TextCommon from '../../../../Common/TextCommon'
import global from "../../../../Common/global";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import storage from "../../../../../utils/storage";
import { getPatTestList } from "../../../../../Actions/getPatTestList";
import CustomeHeader from "../../../../Common/CustomeHeader";



export default class patientTestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false,
            data: [],
        };
    }
    componentDidMount() {
        this.getPatientTestistApiCAll();
    }

    getPatientTestistApiCAll = async () => {
        let patientIdObj = {
            "patient_id": this.props.navigation.state.params.patient
        }
        const response = await getPatTestList(patientIdObj)
        this.setState({
            data: response.testAssociation
        })
    }
    toggleSwitch = () => {
        this.setState({
            isEnabled: !this.state.isEnabled
        })
    }
    getUser_Detail = async () => {
        return await storage.get('Login')
    }
    render() {
        const { patient } = this.props.navigation.state.params;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />

                <CustomeHeader backgroundColor={global.secondary} text={"Test eseguit"} navigation={this.props.navigation} />

                <View style={{ height: 16 }} />
                <ScrollView>
                    {
                        this.state.data.length != 0 ? this.state.data.map((item, index) => {
                            return (
                                <View key={index} style={styles.buttonPadding}>
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('patientTestHsitory', { "detailsObjc": item }) }} style={{
                                        flexDirection: 'row',
                                        borderWidth: 1,
                                        borderColor: global.secondary,
                                        height: 50,
                                        borderRadius: 50 / 2,
                                        color: global.secondary,
                                        alignItems: 'center',
                                        flex: 1,
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 20

                                    }}>
                                        <View style={{ flexDirection: 'row' }}>

                                            <TextCommon
                                                text={item.test_assigned}
                                                color={global.secondary}
                                                textAlign={"center"}
                                                fontSize={13}
                                                fontWeight={"600"}
                                                textAlign={"center"}
                                                fontFamily={"Montserrat-Bold"}
                                            />
                                        </View>
                                        <Ionicons name="chevron-forward" color={global.secondary} size={22} />
                                    </TouchableOpacity>

                                </View>
                            )
                        }) : (<TextCommon text="Nessun test disponibile. Chiedi al tuo medico" color={"#000000"} fontSize={global.fontSize_16} fontWeight={"600"} textAlign={"center"} fontFamily={"Montserrat-Bold"} />)
                    }

                </ScrollView>

                <View style={styles.bottomView} />

            </SafeAreaView >
        );
    }
}
