/* @flow */

import React, {Component} from "react";
import {Image, Modal, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import TextCommon from "../../../../../Common/TextCommon";
import global from "../../../../../Common/global";
import TextinputCommon from "../../../../../Common/TextinputCommon";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {TextInput} from "react-native-gesture-handler";
import {
    getCurrentPathologyByPatient,
    getPastPathologyByPatient
} from "../../../../../../Actions/getCurrentPathologyByPatient";
import {addPathology} from "../../../../../../Actions/addPathology";
import {getPathologiesList} from "../../../../../../Actions/getPathologiesList";
import {addPastPathology} from "../../../../../../Actions/addPastPathology";
import styles from "./styles";
import CustomeHeader from "../../../../../Common/CustomeHeader";
import storage from "../../../../../../utils/storage";

export default class docPatClinicSecond extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            render: false,
            searchTxt: "",
            from: "",
            intervalRef: null,
            addNewPathologyModal: false,
            newPathologyName: '',
            modalAddPathologyBtn: true
        };
    }

    componentDidMount() {
        const {from, patient} = this.props.navigation.state.params;
        console.log("PATIENT**********************************",patient)
        this.setState({
            from: from,
            currentPatitent: patient,
        });
        this.getAllPathologiesApiCall().catch(error => console.error(error));
        const intervalRef = setInterval(() => {
            this.getAllPathologiesApiCall().catch(error => console.error(error));
        }, 1000);
        this.setState({intervalRef});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalRef);
    }

    getUser_Detail = async () => {
        return await storage.get("Login");
    };

    onAddedPathologyChangeTxt = (value) => {
        this.state.modalAddPathologyBtn = value.length === 0;
        this.setState({
            newPathologyName: value
        })
    }

    onPressConfirm = async () => {
        //getting the  patient from the  data passed
        const userResponse = this.props.navigation.state.params.patient;
        const pathologyResponse = await addPathology({
            "name": this.state.newPathologyName,
            "description": null,
        }).catch(error => console.error('addPathology', error));
        // handle pathology creation
        if (this.state.from === 'current') {
            this.handleCurrentPathology(pathologyResponse.pathology).catch(error => console.error(error));
        } else {
            this.handlePastPathology(userResponse, pathologyResponse.pathology)
                .catch(error => console.error(error));
        }
    }

    // this function doesn't store data into pathology table
    // just navigate to the next screen
    handleCurrentPathology = async (pathology) => {
        this.setState({addNewPathologyModal: false, newPathologyName: ''});
        this.props.navigation.navigate("docPatClinicThird", {pathology, current: null, from: this.state.from});
    }

    // this function stores data into pathology table
    // and than create a record into past-pathologies table
    handlePastPathology = async (user, pathology) => {
        await addPastPathology({
            "patient_id": user.id,
            "pathology_id": pathology.id,
            "recent_pathology_date": new Date().toISOString(),
            "past_pathology_date": new Date().toISOString(),
            "description": ""
        }).catch(error => console.error('Action addPastPathology', error));
        await this.getAllPathologiesApiCall();
        this.setState({addNewPathologyModal: false, newPathologyName: ''});
    }

    rowClicked(pathology) {
        if (this.state.from === "current") {
            this.props.navigation.navigate("docPatClinicThird", {pathology: null, current: pathology, from: this.state.from});
        }
    }

    getAllPathologiesApiCall = async () => {
        const user = this.props.navigation.state.params.patient;

        // All the pathologies
        const pathologiesResponse = await getPathologiesList();
        const pathologies = pathologiesResponse.pathologies;

        let currentPathologies, pastPathologies, results = [];
        if (this.state.from === "current") {
            const currentPathologiesResponse = await getCurrentPathologyByPatient({patient_id: user.id});
            currentPathologies = currentPathologiesResponse.currentPathologies;
            results = currentPathologies;
        } else {
            const pastPathologiesResponse = await getPastPathologyByPatient({patient_id: user.id});
            pastPathologies = pastPathologiesResponse.pastPathologies;
            results = pastPathologies
        }

        results.forEach(item => {
            const pathology = pathologies.find(element => element.id === item.pathology_id);
            Object.assign(item, {name: pathology.name});
        });


        this.setState({data: results, render: !this.state.render});
    };

    searchText = (searchTxt) => {
        this.setState({
            searchTxt: searchTxt,
        });
    };

    render() {
        return (
            <SafeAreaView style={{
                backgroundColor: global.white,
                flex: 1
            }}>

                <StatusBar barStyle="dark-content"/>

                <Modal style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}} animationType="slide" transparent={true} visible={this.state.addNewPathologyModal}>
                    <View style={{
                        flexDirection: "column",
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: global.secondary,
                        borderRadius: 20,
                        backgroundColor: global.white,
                        marginTop: '30%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '90%',
                        minHeight:320,
                        maxHeight:320,
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({addNewPathologyModal: !this.state.addNewPathologyModal})
                        }} style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: "flex-start",
                            justifyContent: "flex-end",
                            height: '20%',
                            marginBottom: 10,
                        }}>
                            <FontAwesome name="times" color={global.secondary} size={20} style={{marginTop: 20,marginRight:20}}/>
                        </TouchableOpacity>
                        <View
                            style={{
                                fontSize: global.fontSize_17,
                                color: global.secondary,
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: '20%',
                                marginBottom: 30,
                                paddingLeft:20,
                                paddingRight:20,
                            }}
                        >
                            <Text style={{ textAlign: 'justify', color: global.secondary, fontSize: 19}}>
                                {this.state.from === "current" ? "Aggiungi le tue patologie" : "Malattie che hai avuto in passato e che ora non hai più"}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                height: '40%'
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    borderWidth: 1,
                                    borderColor: global.secondary,
                                    height: 40,
                                    borderRadius: 50 / 2,
                                    color: global.secondary,
                                    alignItems: "center",
                                    width: '80%',
                                    maxWidth: '80%',
                                    height: 50,
                                    marginBottom: 30
                                }}
                            >
                                <FontAwesome name="user" color={global.secondary} size={20} style={{marginLeft: 20}}/>
                                <TextinputCommon
                                    placeHolder={"INSERISCI PATOLOGIA"}
                                    value={this.state.newPathologyName}
                                    placeholderTextColor={global.secondary}
                                    onChangeTxt={(e) => {
                                        this.onAddedPathologyChangeTxt(e);
                                    }}
                                    color={global.secondary}
                                />
                            </View>
                            <TouchableOpacity
                                disabled={this.state.modalAddPathologyBtn}
                                onPress={() => {
                                    this.onPressConfirm().catch(error => console.error(error))
                                }}
                                style={{
                                    margin: 3,
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "80%",
                                    height: 40,
                                    borderRadius: 10,
                                    backgroundColor: global.green,
                                }}>
                                <Text
                                    style={{flex: 1, color: "#FFF", textAlign: "center", fontSize: global.fontSize_14}}>
                                    Aggiungi patologia
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <CustomeHeader backgroundColor={global.secondary}
                               text={this.state.from === "current" ? "Patologie in corso" : "Patologie passate"}
                               navigation={this.props.navigation}/>

                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    height: 50,
                    backgroundColor: "#c7c7cc",
                }}>
                    <View style={{
                        height: 40,
                        flex: 1,
                        margin: 5,
                        backgroundColor: "white",
                        borderRadius: 15,
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        flexDirection: "row",
                    }}>
                        <Feather name="search" size={20} style={{alignSelf: "center"}}/>
                        <TextInput
                            style={{height: 40, width: "80%", marginLeft: 10}}
                            autoCapitalize={false}
                            onChangeText={(value) => {
                                this.searchText(value);
                            }}
                            value={this.state.searchTxt}
                        />
                    </View>
                </View>
                <ScrollView>
                    {Object.entries(this.state.data).filter((entry) => entry[1].name.toLowerCase().includes(this.state.searchTxt.toLowerCase())).length !== 0 ? (
                        Object.entries(this.state.data).filter((entry) => entry[1].name.toLowerCase().includes(this.state.searchTxt.toLowerCase()))
                            .map((value) => {
                                return (
                                    value.map((pathology, index) => {
                                        return (<TouchableOpacity
                                            key={index}
                                            onPress={() => this.rowClicked(pathology)}
                                            style={{
                                                marginLeft: 10,
                                                padding: '1%'
                                            }}>
                                            <Text style={{
                                                fontSize: 14,
                                                fontWeight: "bold"
                                            }}>{pathology.name}</Text>
                                        </TouchableOpacity>);
                                    })
                                );
                            })
                    ) : (
                        <TextCommon
                            text={this.state.searchTxt.length === 0 ? `Il paziente non ha ancora inserito patologie ${this.state.from === "current" ? "in corso" : "passate"}.` : `Il paziente non ha ancora inserito patologie ${this.state.from === "current" ? "in corso" : "passate"} per la tua ricerca.`}
                            color={"#000000"} fontSize={global.fontSize_13} paddingHorizontal={20} marginTop={"10%"}
                            fontWeight={"600"} textAlign={"center"} fontFamily={"Montserrat-Bold"}/>
                    )}
                </ScrollView>

                <View style={styles.commonImageStyle}>
                    <Image source={require("../../../../../../Image/common_icon.png")}/>
                </View>
            </SafeAreaView>
        );
    }
}
