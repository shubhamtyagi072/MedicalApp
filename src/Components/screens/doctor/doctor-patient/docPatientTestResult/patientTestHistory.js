/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, Switch, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from './styles';
import TextCommon from '../../../../Common/TextCommon'
import global from "../../../../Common/global";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
import RoundedButton from "../../../../Common/RoundedButton";
import storage from "../../../../../utils/storage";
import CustomeHeader from "../../../../Common/CustomeHeader";
import { getResultListByTest } from "../../../../../Actions/getResultByTest";
import DateTimePicker from '@react-native-community/datetimepicker';
var PushNotification = require("react-native-push-notification");
import moment from 'moment';
moment.locale('it');


export default class patientTestHistory extends Component {
    constructor(props) {
        super(props);

        const now = new Date();

        this.state = {
            isEnabled: false,
            resultData: [],
            frequency: { label: "Giornaliera", value: "day" },
            time: new Date(),
            timeDisplayed: now,
            show: false,
            doubleTime: parseFloat(now.getUTCHours() + "." + now.getUTCMinutes()).toFixed(2),
            intervalRef: null,
        };
    }

    componentDidMount() {
        this.getPatientTestistApiCAll()
        const intervalRef = setInterval(() => {
            this.getPatientTestistApiCAll()
        }, 1000);
        this.setState({ intervalRef });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalRef);
    }

    onChange = (e, selectedTime) => {
        let time = new Date(selectedTime);
        this.setState({
            doubleTime: parseFloat(time.getUTCHours() + "." + time.getUTCMinutes()).toFixed(2),
            time,
            show: false,
        });
    };

    showMode = () => {
        this.setState({
            show: !this.state.show
        });
    };

    getPatientTestistApiCAll = async () => {
        const { detailsObjc } = this.props.navigation.state.params
        let data = {
            patient_id: detailsObjc.patient_id
        }
        const response = await getResultListByTest(data)
        const newFilteredArray = response.testAssociation.filter((elem) => elem.questionary_identifier === detailsObjc.test_assigned);

        //Sortig the array of appointments based on the most recent date
        if (Platform.OS === "android") {
            newFilteredArray.sort((a, b) => moment(b.createdAt.split(" ")) - moment(a.createdAt.split(" ")));
        } else {
            newFilteredArray.sort((a, b) => a.createdAt.split(" ") < b.createdAt.split(" "));
        }
        this.setState({
            resultData: newFilteredArray
        })
    }

    toggleSwitch = () => {
        const { detailsObjc } = this.props.navigation.state.params
        if (!this.state.isEnabled) {
            PushNotification.localNotificationSchedule({
                //... You can use all the options from localNotifications
                title: `Promemoria ${detailsObjc.test_assigned}`,
                message: `Ricordati di eseguire il test ${detailsObjc.test_assigned}`, // (required)
                date: this.state.time, // in 60 secs
                allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
                repeatType: this.state.frequency.value,
                channelId: "channel-id",
                id: 0 // change to notification id
            });
        }
        else {
            PushNotification.cancelAllLocalNotifications();
        }
        this.setState({
            isEnabled: !this.state.isEnabled
        })
    }
    /*getUser_Detail = async () => {
      return await storage.get('Login')
    }*/
    render() {
        const { detailsObjc } = this.props.navigation.state.params
        console.log('detailsObjc', detailsObjc)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <CustomeHeader backgroundColor={global.secondary} text={"Storico test"} navigation={this.props.navigation} />
                <View style={{ marginTop: '15%', flex: 1, marginBottom: 10 }} >
                    <TextCommon
                        text={"Risultati"}
                        fontSize={16}
                        fontFamily={"Montserrat-Regular"}
                        style={{ align: "center" }}
                    />

                    <ScrollView style={{ marginTop: 15 }}>
                        {
                            this.state.resultData && this.state.resultData.map((item, index) => {

                                let date = item.createdAt.split(" ")
                                return (
                                    <View key={index} style={{ width: '100%', flexDirection: 'row', backgroundColor: global.secondary, borderRadius: 5, justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingHorizontal: 20, paddingVertical: 5 }} >
                                        <TextCommon
                                            text={moment(date[0]).format("DD MMM YYYY")}
                                            fontSize={16}
                                            fontFamily={"Montserrat-Regular"}
                                            color={'white'}
                                        />
                                        <TextCommon
                                            text={item.score}
                                            fontSize={16}
                                            fontFamily={"Montserrat-Regular"}
                                            color={'white'}
                                        />
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </SafeAreaView >
        );
    }
}
