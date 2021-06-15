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
import { getpateintListByDoc } from '../../../../../Actions/getPatientListByDoc'
import storage from '../../../../../utils/storage'

class docPatinetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            doctor: '',
            intervalRef: null,
        };
    }

    componentDidMount() {
        this.getCurrentLoggedDoctor();
        const intervalRef = setInterval(this.getCurrentLoggedDoctor, 5000);
        this.setState({ intervalRef });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalRef);
    }

    //action call to send data to the backend
    getPatientApiCAll = async (doctor_id) => {
        console.log("resp", doctor_id)
        await getpateintListByDoc(doctor_id).then((response)=>{
            console.log("resp", response)
            this.setState({
                data: response.patientsAccepted
            })
        })
    }


    getCurrentLoggedDoctor = async () => {
        //getting the local storage to check if a user is already logged in

        await storage.get("Login").then((value)=>{
        let returnedValue = JSON.parse(value);
        const doctor = (returnedValue.user || returnedValue.doctor);
        console.log("Doctor user data",returnedValue)

        //getting the parsed JSON
        if(value){
            this.setState({
                doctor: doctor
            })
            let postData = {
                "doctor_id": parseInt(doctor.id)
            }
            console.log(postData)
            this.getPatientApiCAll(postData)
          }
        });
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
                    text={"Pazienti"}
                    navigation={this.props.navigation}
                />
                <ScrollView style={{display:'flex', flex:1 , marginBottom: '15%' }} >
                    {
                        this.state.data.length !=0 ? (this.state.data.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => { this.props.navigation.navigate('selectedPateint', { "details": item }) }} style={styles.typeView}>
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
                        })) : (<TextCommon  text="Ancora nessun paziente associato al suo account" color={"#000000"} fontSize={global.fontSize_15} fontWeight={"600"} marginTop={"10%"} textAlign={"center"} fontFamily={"Montserrat-Bold"} />)
                    }
                </ScrollView>
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
)(docPatinetList);

