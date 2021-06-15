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
import { rejectReq } from "../../../../Actions/submitRejectReq";
import storage from "../../../../utils/storage";
import { images } from "../../../../Image";
import { acceptReq } from "../../../../Actions/acceptReqOfPateint";

class docRequestProfilo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acceptTerms: false,
            gener: "",
            date: null,
            lugdo: "",
            citta: "",
            altezza: "",
            stilo: "",
            peso: "",
            showDate: true,
            modalVisiable: false,
            isLodingReject: false,
            isLodingSucess: false
        };
    }



    onConfirmRequest = async (Detail) => {
        this.setState({ isLodingSucess: true })
        console.log("respo1234")
        const res = JSON.parse(await this.getUser_Detail())
        let data = {

            "patient_id": Detail.id,
            "doctor_id": (res.user || res.doctor).id,
            "status": true

        }
        const respo = await acceptReq(data)
        console.log('repo', respo)
        if (respo.status = "success") {

            this.setState({ isLodingSucess: false })

            this.props.navigation.navigate('docConfPnts', {item : Detail, "status": true })

        } else {
            this.setState({ isLodingSucess: false })
            alert(respo.message)
        }
    }


    onRejectRequest = async (Detail) => {
        this.setState({ isLodingSucess: true })
        console.log("respo1234")
        const res = JSON.parse(await this.getUser_Detail())
        let data = {
            "patient_id": Detail.id,
            "doctor_id": res.user.ID
        }
        const respo = await rejectReq(data)
        console.log('repo', respo)
        if (respo.status = "success") {
            this.setState({ isLodingReject: false })

            this.props.navigation.navigate('docConfPnts', {item : Detail, "status": false })

        } else {
            this.setState({ isLodingReject: false })
            alert(respo.message)
        }

    }

    getUser_Detail = async () => {
        return await storage.get('Login')
    }

    render() {

        const {Detail} = this.props.navigation.state.params;
        console.log("Dettagli",Detail.patientDetails.weight.toString())
        return (
            <SafeAreaView style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisiable}

                >
                    <View style={styles.modalMainView}>
                        <View style={styles.insideMainView} >
                            <View style={styles.profileview} >
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                                    <View style={styles.roundIconView1} >
                                        <Entypo name="user" size={40} color={global.primary} />
                                    </View>
                                    <TextCommon
                                        text={Detail.patientDetails.name}
                                        color={global.white}
                                        textAlign={"center"}
                                        fontSize={global.fontSize_17}
                                        fontWeight={"600"}
                                        textAlign={"center"}
                                        fontFamily={"Montserrat-Bold"}
                                    />
                                </View>
                                <Entypo name="cross" onPress={() => { this.setState({ modalVisiable: false }) }} size={40} color={global.white} />

                            </View>
                            <ScrollView style={{ marginBottom: 30 }} >
                                <View style={styles.buttonPadding}>
                                    <View style={{
                                        flexDirection: 'row',
                                        borderWidth: 1,
                                        borderColor: global.white,
                                        height: 50,
                                        borderRadius: 50 / 2,
                                        color: global.primary,
                                        alignItems: 'center',
                                        flex: 1,
                                        marginTop: 20
                                    }}>
                                        <Image source={images.gendeWr} style={{ height: 25, width: 25, resizeMode: 'contain', marginLeft: 10 }} />
                                        <TextinputCommon
                                            placeHolder={"GENERE"}
                                            value={Detail.patientDetails.gender}
                                            placeholderTextColor={global.white}
                                            backgroundColor={global.primary}
                                            color={global.white}
                                        />
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        borderWidth: 1,
                                        borderColor: global.white,
                                        height: 50,
                                        borderRadius: 50 / 2,
                                        color: global.primary,
                                        alignItems: 'center',
                                        flex: 1,
                                        marginTop: 20
                                    }}>
                                        <Image source={images.calenderW} style={{ height: 25, width: 25, resizeMode: 'contain', marginLeft: 10 }} />
                                        <TextinputCommon
                                            placeHolder={"DATA DI NASCITA"}
                                            value={Detail.patientDetails.birth_date}
                                            placeholderTextColor={global.white}
                                            backgroundColor={global.primary}
                                            color={global.white}
                                            disable={false}
                                        />

                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        borderWidth: 1,
                                        borderColor: global.white,
                                        height: 50,
                                        borderRadius: 50 / 2,
                                        color: global.primary,
                                        alignItems: 'center',
                                        flex: 1,
                                        marginTop: 20
                                    }}>
                                        <Image source={images.locationW} style={{ height: 25, width: 25, resizeMode: 'contain', marginLeft: 10 }} />
                                        <TextinputCommon
                                            placeHolder={"LUOGO DI NASCITA"}
                                            value={Detail.patientDetails.address}
                                            placeholderTextColor={global.white}
                                            backgroundColor={global.primary}
                                            color={global.white}
                                            disable={false}
                                        />
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        borderWidth: 1,
                                        borderColor: global.white,
                                        height: 50,
                                        borderRadius: 50 / 2,
                                        color: global.primary,
                                        alignItems: 'center',
                                        flex: 1,
                                        marginTop: 20
                                    }}>
                                        <Image source={images.cityW} style={{ height: 25, width: 25, resizeMode: 'contain', marginLeft: 10 }} />
                                        <TextinputCommon
                                            placeHolder={"CITTA"}
                                            value={Detail.patientDetails.city}
                                            placeholderTextColor={global.white}
                                            backgroundColor={global.primary}
                                            color={global.white}
                                            disable={false}
                                        />
                                    </View>


                                    <View style={{
                                        flexDirection: 'row',
                                        borderWidth: 1,
                                        borderColor: global.white,
                                        height: 50,
                                        borderRadius: 50 / 2,
                                        color: global.primary,
                                        alignItems: 'center',
                                        flex: 1,
                                        marginTop: 20
                                    }}>
                                        <Image source={images.listW} style={{ height: 25, width: 25, resizeMode: 'contain', marginLeft: 10 }} />
                                        <TextinputCommon
                                            placeHolder={"ALTEZZA"}
                                            value={Detail.patientDetails.height.toString()}
                                            placeholderTextColor={global.white}
                                            backgroundColor={global.primary}
                                            color={global.white}
                                            disable={false}
                                        />
                                    </View>


                                    <View style={{
                                        flexDirection: 'row',
                                        borderWidth: 1,
                                        borderColor: global.white,
                                        height: 50,
                                        borderRadius: 50 / 2,
                                        color: global.primary,
                                        alignItems: 'center',
                                        flex: 1,
                                        marginTop: 20
                                    }}>
                                        <Image source={images.pesoW} style={{ height: 25, width: 25, resizeMode: 'contain', marginLeft: 10 }} />
                                        <TextinputCommon
                                            placeHolder={"PESO CORPOREO"}
                                            value={Detail.patientDetails.weight.toString()}
                                            placeholderTextColor={global.white}
                                            backgroundColor={global.primary}
                                            color={global.white}
                                            disable={false}
                                        />
                                    </View>


                                    <View style={{
                                        flexDirection: 'row',
                                        borderWidth: 1,
                                        borderColor: global.white,
                                        height: 50,
                                        borderRadius: 50 / 2,
                                        color: global.primary,
                                        alignItems: 'center',
                                        flex: 1,
                                        marginTop: 20
                                    }}>
                                        <Image source={images.lifestyleW} style={{ height: 25, width: 25, resizeMode: 'contain', marginLeft: 10 }} />
                                        <TextinputCommon
                                            placeHolder={"STILE DI VITA"}
                                            value={Detail.patientDetails.life_style}
                                            placeholderTextColor={global.primary}
                                            placeholderTextColor={global.white}
                                            backgroundColor={global.primary}
                                            color={global.white}
                                            disable={false}
                                        />
                                    </View>

                                    <View style={{ height: 22 }} />
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <StatusBar barStyle="light-content" />



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
                        text={Detail.patientDetails.name}
                        color={"#000000"}
                        textAlign={"center"}
                        fontSize={global.fontSize_17}
                        fontWeight={"600"}
                        textAlign={"center"}
                        fontFamily={"Montserrat-Bold"}
                    />
                </View>
                <View style={{ marginTop: 50 }} >
                    <RoundedButton
                        btnText={"PROFILO"}
                        backgroundColor={global.primary}
                        onPress={() => { this.setState({ modalVisiable: true }) }}
                        fontFamily={"Poppins-Regular"}

                    />
                </View>
                <View style={styles.roundBtnView} >
                    <TouchableOpacity onPress={() => { this.onConfirmRequest(Detail.patientDetails) }} style={styles.insideRoundView} >
                        {
                            this.state.isLodingSucess ? <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }} color={'white'} size="large" />
                                : <TextCommon
                                    text={"CONFERMA"}
                                    color={"white"}
                                    textAlign={"center"}
                                    fontSize={10}
                                    fontWeight={"600"}
                                    textAlign={"center"}
                                    fontFamily={"Montserrat-Regular"}
                                />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.onRejectRequest(Detail.patientDetails) }} style={[styles.insideRoundView, { backgroundColor: global.secondary }]} >
                        {
                            this.state.isLodingReject ? <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }} color={'white'} size="large" />
                                : <TextCommon
                                    text={"RIFIUTA"}
                                    color={"white"}
                                    textAlign={"center"}
                                    fontSize={10}
                                    fontWeight={"600"}
                                    textAlign={"center"}
                                    fontFamily={"Montserrat-Regular"}
                                />}
                    </TouchableOpacity>
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
)(docRequestProfilo);

