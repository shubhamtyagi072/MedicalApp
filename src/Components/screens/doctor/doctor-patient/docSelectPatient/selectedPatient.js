/* @flow */

import React, { Component } from "react";
import { ActivityIndicator, Alert, Image, Modal, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import TextCommon from "../../../../Common/TextCommon";
import global from "../../../../Common/global";
import { registerApi } from "../../../../../Actions/registerAction";
import Entypo from "react-native-vector-icons/Entypo";
import CustomeHeader from "../../../../Common/CustomeHeader";
import DatePicker from 'react-native-datepicker/datepicker';
import RoundedButton from "../../../../Common/RoundedButton";
import TextinputCommon from "../../../../Common/TextinputCommon";
import { getDrugList } from "../../../../../Actions/getDrugList";
import { getPatTestList } from "../../../../../Actions/getPatTestList";
import { getTherapyByPatientId } from "../../../../../Actions/getTherapyByPatientId";
import { editTherapiById } from "../../../../../Actions/editTherapiById";
import { submitTherapi } from "../../../../../Actions/submitTherapi";
import storage from "../../../../../utils/storage";
import { submitTest } from "../../../../../Actions/submitTest";
import { removeTest } from "../../../../../Actions/removeTest";
import { images } from "../../../../../Image";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { editTestById } from "../../../../../Actions/editTestById";

class selectedPateint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      therapy: null,
      dosage: "",
      time: "",
      modalVisiable: false,
      therapiModalVisiable: false,
      testModalVisiable: false,
      isEnabled: false,
      isLoading: false,
      isTestLoading: false,
      date: new Date(),
      selectedDrug: "",
      currentPatient: this.props.navigation.state.params,
      testData: [
        { test: "ANMCO TEST", isSelected: false },
        { test: "CAT TEST", isSelected: false },
      ],
      drugList: [
        {
          label: "Dummy",
          value: "dummy",
          id: "dummy",
          drug_name: "dummy",
          description: "dummy",
          therapy_id: "dummy",
          time_dose: "dummy",
          dosage: "dummy",
          createdAt: "dummy",
          updatedAt: "dummy",
        },
      ],
    };
  }

  onDosageChange = (value) => {
    console.log(value);
    this.setState({
      dosage: value,
    });
  };
  onDateChange = (value) => {
    this.setState({
      time: value,
    });
  };

  clearInputs = () => {
    this.setState({
      dosage: "",
    });
  };

  toggleSwitch = () => {
    this.setState({
      isEnabled: !this.state.isEnabled,
    });
  };

  getCurrentTherapy = async () => {
    //get current therapy associated
    const userData = JSON.parse(await storage.get("Login"));
    const doctor = userData.user || userData.doctor;

    let data = {
      patientId: this.state.currentPatient.details.id,
    };
    const response = await getTherapyByPatientId(data);
    console.log("EDIT THERAPY", response["therapy"]);
    const currentTherapy = response["therapy"];
    if (currentTherapy) {
      this.setState({
        therapy: currentTherapy,
        dosage: currentTherapy.dosage,
      });
    }
  };

  componentDidMount = () => {
    this.getDrugListApiCAll();
    //function to get what tests are already assigned to a patient
    this.getPatientTestListAPI();
    this.getCurrentTherapy();
  };

  getPatientTestListAPI = async () => {
    console.log("ciaopciao", this.state.currentPatient.details.id);
    let response;
    try {
      response = await getPatTestList({ patient_id: this.state.currentPatient.details.id });
    } catch (error) {
      console.log("error fectching TEST", error);
    }

    if (response.status === "success") {
      //preparing a new array to get the updated values from the server
      let updatedTestStatus = this.state.testData;
      updatedTestStatus.map((item, index) => {
        let indexTestServer = response.testAssociation.findIndex((test) => {
          return test.test_assigned == item.test && test.is_completed != true;
        });
        console.log("passato ", indexTestServer);
        indexTestServer >= 0 && (updatedTestStatus[index].isSelected = true);
      });

      this.setState(
        {
          testData: updatedTestStatus,
        },
        function () {
          console.log("Test's values from the server **", this.state.testData);
        }
      );
    }
  };

  getDrugListApiCAll = async () => {
    const response = await getDrugList();

    if (response.status === "success") {
      var modifyResponse = response.drug.map((item, index) => {
        item.label = item.drug_name;
        item.value = item.drug_name;
        return item;
      });

      this.setState(
        {
          drugList: modifyResponse,
        },
        function () {
          console.log("Sta", this.state.drugList);
        }
      );
    }
  };

  onSubmitTherpy = async (patient) => {
    this.setState({ isLoading: true });

    const userData = JSON.parse(await storage.get("Login"));
    const doctor = userData.user || userData.doctor;

    console.log("PATIENT", patient.id);
    console.log("THERAPY", this.state.therapy);

    // new therapy
    if (this.state.therapy === null) {
      console.log("NEW THERAPY");
      const data = {
        doctor_id: doctor.id,
        patient_id: patient.id,
        drug_id: 0,
        dosage: this.state.dosage,
        time: this.state.date.toISOString(),
        reminder: "",
        timePicker: false,
      };
      const response = await submitTherapi(data).catch((error) => console.error("SUBMIT THERAPY", error));

      if (response.status === "success") {
        this.setState({ isLoading: false });
        Alert.alert("", response["message"], [
          {
            text: "OK",
            onPress: () => {
              this.setState({ therapiModalVisiable: false, dosage: "" });
            },
          },
        ]);
      } else {
        this.setState({ isLoading: false });
        alert(response.message);
      }
    }
    // edit therapy
    else {
      const therapy = this.state.therapy;

      therapy.dosage = this.state.dosage;
      therapy.time = this.state.date.toISOString();

      const response = await editTherapiById(therapy).catch((error) => console.error("EDIT THERAPY", error));

      if (response.status === "success") {
        this.setState({ isLoading: false });
        Alert.alert("", response["message"], [
          {
            text: "OK",
            onPress: () => {
              this.setState({ therapiModalVisiable: false, dosage: "" });
            },
          },
        ]);
      } else {
        this.setState({ isLoading: false });
        alert(response.message);
      }
    }

    this.getCurrentTherapy().catch((error) => console.error("GET THERAPIES", error));

    // const response = await getTherapiByDocPat(data);
    //
    // console.log("RISPOST22***", response.therapy)
    // console.log("data***", data)
    // if (response && response.status === "success" && response.therapy) {
    //
    //     console.log("Edit pathology", response["therapy"])
    //     let currentTherapy = response["therapy"];
    //     if (currentTherapy.id) {
    //         console.log("Edit pathology2", currentTherapy)
    //         data = {
    //             "id": currentTherapy.id,
    //             "doctor_id": currentTherapy.doctor_id,
    //             "patient_id": currentTherapy.patient_id,
    //             "drug_id": 1,//this.state.selectedDrug.id,
    //             "dosage": this.state.dosage,
    //             "time": this.state.date.toISOString(),
    //             "reminder": "",
    //             timePicker: false
    //         }
    //         console.log("id", data)
    //         const response = await editTherapiById(data)
    //         console.log("response", response)
    //         if (response.status == "success") {
    //             this.setState({isLoading: false})
    //             Alert.alert(
    //                 '',
    //                 response["message"],
    //                 [
    //
    //                     {
    //                         text: 'OK', onPress: () => {
    //                             this.setState({therapiModalVisiable: false, dosage: ''})
    //                         }
    //                     },
    //
    //
    //                 ]
    //             );
    //
    //         } else {
    //             this.setState({isLoading: false})
    //             alert("RISPOSTA***", response)
    //         }
    //     }
    //     this.getCurrentTherapy();
    // } else {
    //     console.log("Create new pathology")
    //     data = {
    //         "doctor_id": doctor.id,
    //         "patient_id": details.id,
    //         "drug_id": 1,//this.state.selectedDrug.id,
    //         "dosage": this.state.dosage,
    //         "time": this.state.date.toISOString(),
    //         "reminder": "",
    //         timePicker: false
    //     }
    //     console.log("id", data)
    //     const response = await submitTherapi(data)
    //     console.log("response", response)
    //     if (response.status == "success") {
    //
    //         this.setState({isLoading: false})
    //         Alert.alert(
    //             '',
    //             response["message"],
    //             [
    //
    //                 {
    //                     text: 'OK', onPress: () => {
    //                         this.setState({therapiModalVisiable: false, dosage: ''})
    //                     }
    //                 },
    //
    //
    //             ]
    //         );
    //
    //     } else {
    //         this.setState({isLoading: false})
    //         alert(response.message)
    //     }
    // }
  };

  validationTest = () => {
    var isValidate = false;
    for (var i = 0; i < this.state.testData.length; i++) {
      if (this.state.testData[i].isSelected) {
        console.log("Call");
        isValidate = true;
        break;
      } else {
        isValidate = false;
      }
    }
    console.log("isVali", isValidate);
    return isValidate;
  };

  onSubmitTest = async (details) => {
    if (this.validationTest() && this.state.testData.length > 0) {
      this.setState({ isTestLoading: true });
      const res = JSON.parse(await this.getUser_Detail());

      const doctor = res.user || res.doctor;


      var apibodyObjc = {
        doctor_id: parseInt(doctor.id),
        patient_id: parseInt(details.id),
        test_assigned: "",
        is_completed: false,
      };
      let finalData = [];
      let finalDataToRemove = [];
      var testData = [...this.state.testData];

      testData.map((value) => {
        if (value.isSelected == true) {
          let Temp = {
            doctor_id: parseInt(doctor.id),
            patient_id: parseInt(details.id),
            test_assigned: value.test,
            is_completed: false,
          };
          finalData.push(Temp);
          console.log("selected to be removed***23*", finalData);
        } else {
          //creating the array with the element to be removed
          var Temp = apibodyObjc;
          Temp.test_assigned = "";
          Temp.test_assigned = value.test;
          finalDataToRemove.push(Temp);
        }
      })

      var data = {
        data: [...finalData],
      };

      console.log("Data to be edited", data);
      const response = await editTestById(data);
      console.log("response", response);
      if (response.status == "success") {
        this.setState({ isTestLoading: false });
        Alert.alert("", "Test aggiornati correttamente", [
          {
            text: "OK",
            onPress: () => {
              this.setState({ testModalVisiable: false });
            },
          },
        ]);
      } else {
        this.setState({ isTestLoading: false });
        alert(response.message);
      }

      //Removing data
      var dataToRemove = {
        data: finalDataToRemove,
      };

      if (dataToRemove.data.length > 0) {
        const responseRemove = await removeTest(dataToRemove);
        if (response.status == "success") {
          this.setState({ isTestLoading: false });
        } else {
          this.setState({ isTestLoading: false });
          alert(response.message);
        }
      }
    } else {
      alert("Seleziona almeno un test");
    }
  };

  getUser_Detail = async () => {
    return await storage.get("Login");
  };

  onSelectTest = (index) => {
    var selectedTest = [...this.state.testData];
    selectedTest[index].isSelected = !selectedTest[index].isSelected;

    this.setState({
      testData: [...selectedTest],
    });
  };
  openTimePicker = () => {
    this.setState({ timePicker: true });
  };
  onDateChange = (event, selectedDate) => {
    let time = new Date(selectedDate);
    this.setState({
      time: String(time.getHours()) + ":" + String(time.getMinutes()),
      timePicker: false,
    });
  };

  render() {
    const { details } = this.props.navigation.state.params;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Modal animationType="slide" transparent={true} visible={this.state.modalVisiable}>
          <View style={styles.modalMainView}>
            <View style={styles.insideMainView}>
              <View style={styles.profileview}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: "center",
                    width: "85%"
                  }}
                >
                  <View style={styles.roundIconView1}>
                    <Entypo name="user" size={40} color={global.secondary} />
                  </View>
                  <TextCommon text={details.name} color={global.white} textAlign={"center"} fontSize={global.fontSize_17} fontWeight={"600"} textAlign={"center"} fontFamily={"Montserrat-Bold"} />
                </View>
                <View style={{ marginLeft: '12%' }}>
                  <Entypo
                    name="cross"
                    onPress={() => {
                      this.setState({ modalVisiable: false });
                    }}
                    size={40}
                    color={global.white}
                  />
                </View>
              </View>

              <ScrollView style={{ marginBottom: '2%', height: "100%" }}>
                <View style={styles.buttonPadding}>
                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      color: global.primary,
                      alignItems: "center",
                      marginLeft: "5%",
                      width: "90%",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <Image source={images.gendeWr} style={{ height: 25, width: 25, resizeMode: "contain", marginLeft: 10 }} />
                    <TextinputCommon placeHolder={"GENERE"} value={details && details.gender ? details.gender : ""} placeholderTextColor={global.white} backgroundColor={global.primary} color={global.white} disable={false} />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      color: global.primary,
                      alignItems: "center",
                      marginLeft: "5%",
                      width: "90%",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <Image source={images.calenderW} style={{ height: 25, width: 25, resizeMode: "contain", marginLeft: 10 }} />
                    <TextinputCommon placeHolder={"DATA DI NASCITA"} value={details && details.birth_date ? details.birth_date : ""} placeholderTextColor={global.white} backgroundColor={global.primary} color={global.white} disable={false} />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      color: global.primary,
                      alignItems: "center",
                      marginLeft: "5%",
                      width: "90%",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <Image source={images.locationW} style={{ height: 25, width: 25, resizeMode: "contain", marginLeft: 10 }} />
                    <TextinputCommon placeHolder={"LUOGO DI NASCITA"} value={details && details.address ? details.address : ""} placeholderTextColor={global.white} backgroundColor={global.primary} color={global.white} disable={false} />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      marginLeft: "5%",
                      width: "90%",
                      color: global.primary,
                      alignItems: "center",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <Image source={images.cityW} style={{ height: 25, width: 25, resizeMode: "contain", marginLeft: 10 }} />
                    <TextinputCommon placeHolder={"CITTA"} value={details && details.city ? details.city : ""} placeholderTextColor={global.white} backgroundColor={global.primary} color={global.white} disable={false} />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      color: global.primary,
                      alignItems: "center",
                      marginLeft: "5%",
                      width: "90%",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <Image source={images.listW} style={{ height: 25, width: 25, resizeMode: "contain", marginLeft: 10 }} />
                    <TextinputCommon placeHolder={"ALTEZZA"} value={details && details.height ? JSON.stringify(details.height) : ""} placeholderTextColor={global.white} backgroundColor={global.primary} color={global.white} disable={false} />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      color: global.primary,
                      alignItems: "center",
                      marginLeft: "5%",
                      width: "90%",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <Image source={images.pesoW} style={{ height: 25, width: 25, resizeMode: "contain", marginLeft: 10 }} />
                    <TextinputCommon placeHolder={"PESO CORPOREO"} value={details && details.weight ? JSON.stringify(details.weight) : ""} placeholderTextColor={global.white} backgroundColor={global.primary} color={global.white} disable={false} />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      color: global.primary,
                      alignItems: "center",
                      marginLeft: "5%",
                      width: "90%",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <Image source={images.lifestyleW} style={{ height: 25, width: 25, resizeMode: "contain", marginLeft: 10 }} />
                    <TextinputCommon placeHolder={"STILE DI VITA"} value={details && details.life_style ? details.life_style : ""} placeholderTextColor={global.primary} placeholderTextColor={global.white} backgroundColor={global.primary} color={global.white} disable={false} />
                  </View>

                  <View style={{ height: 22 }} />
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={this.state.therapiModalVisiable}> 
        <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>            
         <View style={styles.modalMainView}>
            <View style={styles.insideMainView}>
              <View style={styles.profileview}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "85%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "5%",
                  }}
                  
                >
                  <View style={styles.roundIconView1}>
                    <Entypo name="user" size={40} color={global.secondary} />
                  </View>
                  <TextCommon text={details.name} color={global.white} fontSize={global.fontSize_17} fontWeight={"600"} textAlign={"center"} fontFamily={"Montserrat-Bold"} />
                </View>
                <View style={{ marginLeft: '12%' }}>
                  <Entypo
                    name="cross"
                    onPress={() => {
                      this.setState({ therapiModalVisiable: false });
                    }}
                    size={40}
                    color={global.white}
                  />
                </View>
              </View>
              <View
                style={{
                  height: 300,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "5%",
                }}
              >
                <ScrollView>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: global.primary,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        height: 50,
                        color: global.primary,
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        marginBottom: 10,
                        marginRight: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.openTimePicker();
                        }}
                        style={{
                          flexDirection: "row",
                          borderWidth: 1,
                          borderColor: global.white,
                          width: "62%",
                          height: 50,
                          borderRadius: 50 / 2,
                          color: global.primary,
                          alignItems: "center",
                          marginLeft: 10,
                        }}
                      >
                        <Image
                          source={images.clockW}
                          style={{
                            height: 25,
                            width: 25,
                            resizeMode: "contain",
                            marginLeft: 10,
                          }}
                        />

                        {this.state.timePicker && (
                          <DatePicker
                            style={{ width: "100%", height: 50, position: "absolute", borderWidth: 0, zIndex: 1000 }}
                            date={this.state.date}
                            mode="date"
                            locale="it"
                            placeholder="seleziona la data"
                            format="DD-MM-YYYY"
                            confirmBtnText="Conferma"
                            cancelBtnText="Annulla"
                            customStyles={{
                              dateIcon: {
                                position: "absolute",
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                                opacity: 0,
                              },
                              dateInput: {
                                marginLeft: 36,
                                borderWidth: 0,
                                opacity: 0,
                              },
                            }}
                            onDateChange={(date) => {
                              this.setState({ datePicker: false, date: moment(date, "DD-MM-YYYY") });
                            }}
                          />
                        )}
                        <TextinputCommon placeHolder={"DATA"} value={moment(this.state.date).format("DD/MM/YYYY")} placeholderTextColor={global.white} backgroundColor={global.primary} color={global.white} disable={false} />
                      </TouchableOpacity>
                      <View
                        style={{
                          flexDirection: "row",
                          width: "35%",
                          alignItems: "flex-start",
                          justifyContent: "flex-end",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.clearInputs();
                          }}
                          style={{
                            flexDirection: "row",
                            borderWidth: 1,
                            borderColor: global.white,
                            width: "80%",
                            height: 50,
                            borderRadius: 50 / 2,
                            backgroundColor: global.white,
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 10,
                            color: global.darkred,
                          }}
                        >
                          <Text style={{ color: "#910729" }}>NUOVO</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 220,
                        padding: 10,
                        borderRadius: 50 / 2,
                        borderWidth: 1,
                        borderColor: "#FFF",
                        marginBottom: 12,
                        marginLeft: 10,
                        marginRight: 10,
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <TextInput
                        placeholder={"PRESCRIZIONE"}
                        placeholderTextColor={global.white}
                        value={this.state.dosage}
                        style={{
                          height: '100%',
                          width: '100%',
                          flexDirection: "row",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          textAlignVertical: 'top',
                          color: global.white,
                          fontSize: global.fontSize_17,
                        }}
                        multiline={true}
                        numberOfLines={10}
                        onChangeText={(value) => {
                          this.onDosageChange(value);
                        }}
                      />
                    </View>
                  </View>
                </ScrollView>
              </View>

              <View
                style={{
                  width: 250,
                  alignSelf: "center",
                  marginTop: "2%",
                  marginBottom: "2%",
                  color: global.darkred,
                }}
              >
                {this.state.isTestLoading ? (
                  <ActivityIndicator style={{ justifyContent: "center", alignSelf: "center", flex: 1 }} color={global.secondary} size="large" />
                ) : (
                    <RoundedButton
                      btnText={"CONFERMA"}
                      backgroundColor={global.white}
                      btntextColor={global.darkred}
                      onPress={() => {
                        this.onSubmitTherpy(details);
                      }}
                      fontFamily={"Poppins-Regular"}
                    />
                  )}
              </View>
            </View>
          </View>
          </ScrollView> 
        </Modal>

        <Modal animationType="slide" transparent={true} visible={this.state.testModalVisiable}>
          <View style={styles.modalMainView}>
            <View style={styles.insideMainView}>
              <View style={styles.profileview}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "5%",
                    width: "85%",
                  }}
                >
                  <View style={styles.roundIconView1}>
                    <Entypo name="user" size={40} color={global.secondary} />
                  </View>
                  <TextCommon text={details.name} color={global.white} textAlign={"center"} fontSize={global.fontSize_17} fontWeight={"600"} textAlign={"center"} fontFamily={"Montserrat-Bold"} />
                </View>
                <View style={{ marginLeft: '12%' }}>
                  <Entypo
                    name="cross"
                    onPress={() => {
                      this.setState({ testModalVisiable: false });
                    }}
                    size={40}
                    color={global.white}
                  />
                </View>
              </View>
              <ScrollView style={{ height: 250, marginBottom: 30, paddingTop: "15%" }}>
                {this.state.testData.map((item, index) => {
                  return (
                    <View key={index}>
                      <View
                        key={index}
                        style={{
                          marginHorizontal: "10%",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "65%",
                        }}
                      >
                        <View style={{ flexGrow: 1 }}>
                          <TextCommon text={item.test} color={global.white} textAlign={"left"} fontSize={global.fontSize_17} fontFamily={"Montserrat-Regular"} />
                        </View>
                        <TouchableOpacity
                          disabled={this.state.isLoading ? true : false}
                          onPress={() => {
                            this.onSelectTest(index);
                          }}
                          style={{
                            height: 20,
                            width: 20,
                            borderWidth: 0.5,
                            borderColor: "white",
                            backgroundColor: "rgba(0,0,0,0)",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{
                              height: 15,
                              width: 15,
                              backgroundColor: this.state.testData[index].isSelected ? global.white : "rgba(0,0,0,0)",
                            }}
                          ></View>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          height: 1,
                          width: "90%",
                          alignSelf: "center",
                          backgroundColor: "gray",
                          marginBottom: "6%",
                          marginTop: "3%",
                        }}
                      />
                    </View>
                  );
                })}
                <View style={{ width: "50%", alignSelf: "flex-start", marginTop: "8%", height: 80 }}>
                  <RoundedButton
                    btnText={this.state.isTestLoading ? <ActivityIndicator style={{ justifyContent: "center", alignSelf: "center", flex: 1 }} color={"white"} size="small" /> : "SALVA"}
                    backgroundColor={global.secondary}
                    onPress={() => {
                      this.onSubmitTest(details);
                    }}
                    fontFamily={"Poppins-Regular"}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <CustomeHeader backgroundColor={global.secondary} text={details.name} navigation={this.props.navigation} />
        <View>
          <View style={styles.typeView}>
            <View style={styles.roundIconView}>
              <Entypo name="user" size={40} color="white" />
            </View>
            <TextCommon text={details.name} color={"#000000"} textAlign={"center"} fontSize={global.fontSize_17} fontWeight={"600"} textAlign={"center"} fontFamily={"Montserrat-Bold"} />
          </View>
          <View style={{ marginTop: 50 }}>
            <RoundedButton
              btnText={"PROFILO"}
              backgroundColor={global.primary}
              onPress={() => {
                this.setState({ modalVisiable: true });
              }}
              fontFamily={"Poppins-Regular"}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <RoundedButton
              btnText={"DIARIO CLINICO"}
              backgroundColor={global.primary}
              onPress={() => {
                this.props.navigation.navigate('docPatClinicFirst', { patient: this.state.currentPatient.details })
              }}
              fontFamily={"Poppins-Regular"}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <RoundedButton
              btnText={"TERAPIA"}
              backgroundColor={global.primary}
              onPress={() => {
                this.getDrugListApiCAll();
                //function to get what tests are already assigned to a patient
                this.getPatientTestListAPI();
                console.log('test in patient test ListAPI--------------',this.getPatientTestListAPI())
                this.getCurrentTherapy();
                this.setState({ therapiModalVisiable: true });
              }}
              fontFamily={"Poppins-Regular"}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <RoundedButton
              btnText={"TEST"}
              backgroundColor={global.primary}
              onPress={() => {
                this.setState({ testModalVisiable: true });
              }}
              fontFamily={"Poppins-Regular"}
            />
          </View>
          {/**code for test result-------------------- */}
          <View style={{ marginTop: 15 }}>
            <RoundedButton
              btnText={"RISULTATI DEI TEST"}
              backgroundColor={global.primary}
              onPress={() => { 
                this.props.navigation.navigate('patientTestList',{ patient: this.state.currentPatient.details.id })
               }}
              fontFamily={"Poppins-Regular"}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, action) => {
  let RegisterData = "";
  let Registerrror = "";
  let RegisterIsLoding = "";

  if (state && state.Register) {
    RegisterData = state.Register.success;
    (Registerrror = state.Register.error), (RegisterIsLoding = state.Register.isLoading);
  }

  return {
    RegisterData,
    Registerrror,
    RegisterIsLoding,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerApi: (data) => {
      dispatch(registerApi(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(selectedPateint);
