/* @flow */

import React, {Component} from "react";
import {Image, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View} from "react-native";
import styles from './styles';
import TextCommon from '../../../../Common/TextCommon'
import global from "../../../../Common/global";
import storage from "../../../../../utils/storage";
import {images} from "../../../../../Image";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomeHeader from "../../../../Common/CustomeHeader";
import {getPatientTherapies} from "../../../../../Actions/getPatientTherapies";
import {getTherapyByPatientId} from "../../../../../Actions/getTherapyByPatientId";
import moment from "moment";

export default class terapiaMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isEnabled: false,
            dose: "",
            drugname: "",
            date: moment(),
            mode: "time",
            show: false,
            doubleTime: 0.0
        };
    }

    onChange = (e, selectedTime) => {
        //const currentDate = selectedDate || date;
        //time = time.split("T")
        let time = new Date(selectedTime);
        console.log("getting time from date: ", String(time.getHours()) + ":" + String(time.getMinutes()));
        this.setState({
            doubleTime: parseFloat(time.getUTCHours() + "." + time.getUTCMinutes()).toFixed(2),
            show: false,
        });
        console.log("Orario terapia: ", time)
    };

    showMode = () => {
        this.setState({
            show: !this.state.show
        });
    };

    componentDidMount() {
        this.getPatientTestistApiCAll()
    }

    getPatientTestistApiCAll = async () => {
        //getting
        const res = JSON.parse(await this.getUser_Detail())
        let data = {
            "patientId": parseInt(res.patient.id)
        }

        const response = await getTherapyByPatientId(data);
        console.log("EDIT THERAPY", response["therapy"])
        const currentTherapy = response["therapy"];
        if (currentTherapy) {
            this.setState({
                dose:currentTherapy.dosage,
                date: moment(currentTherapy.time)
            })
        }
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

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content"/>
                <CustomeHeader backgroundColor={global.primary} text={"Terapia"} navigation={this.props.navigation}/>
                {!this.state.dose ?
                    ((<TextCommon text="Non hai terapie associate. Chiedi al tuo medico." color={"#000000"}
                                  fontSize={global.fontSize_13} marginTop={'10%'} fontWeight={"600"}
                                  textAlign={"center"} fontFamily={"Montserrat-Bold"}/>)) : (
                        <ScrollView style={{display: 'flex', flex: 1, padding: 10}}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                marginTop: 10
                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    borderWidth: 1,
                                    borderColor: global.primary,
                                    height: 50,
                                    borderRadius: 50 / 2,
                                    color: global.primary,
                                    alignItems: 'center',
                                    flex: 1,
                                    marginTop: 20,
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 20

                                }}>
                                    <View style={{flexDirection: 'row', width: '100%'}}>
                                        <Image source={images.clock}
                                               style={{height: 25, width: 20, resizeMode: 'contain', marginRight: 5}}/>
                                        {this.state.show && (
                                            <DateTimePicker
                                                testID="timePicker"
                                                value={this.state.time}
                                                mode="date"
                                                timeZoneOffsetInMinutes={0}
                                                is24Hour={true}
                                                display="dafault"
                                                onChange={(event, selectedTime) => {
                                                    this.onChange(event, selectedTime);
                                                }}
                                            />
                                        )}
                                        <TextCommon
                                            text={this.state.date ? 'Prescrizione del ' + this.state.date.format('D MMMM YYYY') : "DATA PRESCRIZIONE"}
                                            placeHolder="ORARIO ASSUNZIONI"
                                            color={global.primary}
                                            textAlign={"center"}
                                            fontSize={13}
                                            fontWeight={"600"}
                                            textAlign={"center"}
                                            fontFamily={"Montserrat-Bold"}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                borderWidth: 1,
                                borderColor: global.primary,
                                height: 370,
                                borderRadius: 50 / 2,
                                color: global.primary,
                                alignItems: 'flex-start',
                                paddingVertical: 10,
                                marginTop: 20,
                                justifyContent: 'space-between',
                                paddingHorizontal: 20

                            }}>
                                <View style={{flexDirection: 'row'}}>
                                    <TextCommon
                                        text={this.state.dose ? this.state.dose : "PRESCRIZIONE"}
                                        color={global.primary}
                                        textAlign={"left"}
                                        fontSize={13}
                                        fontWeight={"600"}
                                        fontFamily={"Montserrat-Bold"}
                                    />
                                </View>

                            </TouchableOpacity>
                            <View onPress={() => {
                                this.showMode()
                            }} style={{
                                flexDirection: 'row',
                                height: 50,
                                color: global.primary,
                                alignItems: 'flex-end',
                                flex: 1,
                                marginTop: 20,
                                justifyContent: 'center',
                                paddingHorizontal: 20

                            }}>
                                {/*<View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'center', width: '70%', marginLeft: 20, marginTop: 40 }} >
              <TextinputCommon
                placeHolder={"PROMEMORIA"}
                value={this.state.lugdo}
                placeholderTextColor={global.primary}
                backgroundColor={global.primary}
                color={global.primary}
                disable={false}
              />
              <Switch
                trackColor={{ false: "gray", true: "#159f20" }}
                thumbColor={"white"}
                style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => { this.toggleSwitch() }}
                value={this.state.isEnabled}
              />
            </View>*/}
                            </View>
                        </ScrollView>
                    )
                }

                <View style={styles.commonImageStyle}>
                    <Image source={require("../../../../../Image/common_icon.png",)}/>
                </View>

            </SafeAreaView>
        );
    }
}


