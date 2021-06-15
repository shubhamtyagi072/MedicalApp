/* @flow */

import React, { Component } from "react";
import { View, Text, SafeAreaView, StatusBar, Alert, TouchableOpacity, ActivityIndicator,Drop } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from "react-native-datepicker/datepicker";
import TextinputCommon from "../../../../Common/TextinputCommon";
import global from "../../../../Common/global";
import { registerApi } from "../../../../../Actions/registerAction";
import CustomeHeader from "../../../../Common/CustomeHeader";
import CustomeBottomBar from "../../../../Common/CustomeBottomBar";
import DropDownPicker from "react-native-dropdown-picker";
import RoundedButton from "../../../../Common/RoundedButton";
import { addCallAppointment } from "../../../../../Actions/addCallAppointment";
import { addLiveAppointment } from "../../../../../Actions/addLiveAppointment";
import { getPatientListByDoc } from "../../../../../Actions/getAllPatinentByDoctor";
import storage from "../../../../../utils/storage";
import moment from 'moment';
import 'moment/locale/it'
moment.locale('it')

class docAppoSecond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      date: moment(),
      timePicker: false,
      datePicker: false,
      time: new Date(),
      patientsList: [],
      selectedPatient: "",
      isLoading: false,
      tipoVisita: "",
      isSwitchEnabled: false,
      checkType: "",
    };
  }

  componentDidMount() {
    this.getAllAppo();
    //getting data passed in the  props from the  precedent screen
  }
  getAllAppo = async () => {
    const res = JSON.parse(await this.getUser_Detail());
    let data = {
      doctor_id: res.user.id,
    };
    const response = await getPatientListByDoc(data);

    if (response.status == "success") {
      let modifiedResponse = [];
      response.patientsAccepted.map((item, index) => {
        modifiedResponse.push({
          label: item.name,
          value: item.name,
          patient: item,
        });
      });

      this.setState(
        {
          patientsList: [...modifiedResponse],
        },
        function () {
        }
      );
    }
  };

  getUser_Detail = async () => {
    return await storage.get("Login");
  };

  AddAppointment = () => {
    this.setState({ isLoading: true });
    this.addApointmentApiCall();
  };

  addApointmentApiCall = async () => {
    const res = JSON.parse(await this.getUser_Detail());

    if (this.state.checkType.value === "televisita") {
      let data = {
        name: this.state.selectedPatient.name,
        description: "",
        date: this.state.date.toISOString(),
        time: this.state.time.toISOString(),
        patient_id: this.state.selectedPatient.patient.id,
        doctor_id: res.user.id,
        status: false,
      };

      var response = await addCallAppointment(data);
      console.log("re", response);
      if (response && response.status === "success") {
        this.setState({ isLoading: false });
        alert(response.message);
      } else {
        this.setState({ isLoading: false });
        alert(response.message);
      }
    } else {
      let data = {
        name: this.state.selectedPatient.patient.name,
        description: "",
        date: this.state.date.toISOString(),
        time: this.state.time.toISOString(),
        patient_id: this.state.selectedPatient.patient.id,
        doctor_id: res.user.id,
        status: false,
      };

      console.log(data)
      var response = await addLiveAppointment(data);
      console.log("re", response);
      if (response){
        if (response.status === "success") {
          this.setState({ isLoading: false });
          alert(response.message);
        } else {
          this.setState({ isLoading: false });
          alert(response.message);
        }
      }
    }
  };

  openTimePicker = () => {
    this.setState({ timePicker: true });
  };

  openDatePicker = () => {
    this.setState({ datePicker: true });
  };

  onTimeChange = (event, selectedDate) => {
    
    this.setState({
      time: selectedDate,
    });
  };

  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    var arr = JSON.stringify(currentDate).split("T");

    this.setState({
      date: currentDate,
    });
  };

  toggleSwitch = () => {
    this.setState({
      isSwitchEnabled: !this.state.isSwitchEnabled,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <CustomeHeader backgroundColor={global.secondary} text={"Pazienti"} navigation={this.props.navigation} />
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ marginHorizontal: 20 }}>
              <DropDownPicker
                zIndex={4000}
                items={this.state.patientsList}
                placeholder="Paziente"
                defaultValue={this.state.selectedPatient.value}
                itemStyle={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  color: "#000"
                }}
                activeLabelStyle={{ color: "#000" }}
                arrowColor={global.white}
                labelStyle={{
                  fontSize: 14,
                  color: "#000",
                }}
                style={{
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#000",
                  alignItems: "center",
                  marginBottom: 20,
                  marginTop: 12
                }}
                dropDownStyle={{ color: "#000", backgroundColor: "#FFF",width:'100%', height: 250, marginTop: 15}}
                containerStyle={{height:80}}
                onChangeItem={(item) =>
                  this.setState({
                    selectedPatient: item,
                  })
                }
              />
            <DropDownPicker
              
              zIndex={3000}
              items={[
                { label: "Televisita", value: "televisita" },
                { label: "Visita in ambulatorio", value: "visita" },
              ]}
              placeholder="Tipo visita"
              defaultValue={this.state.checkType.value}
              itemStyle={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                color: "#000",
                height:50
              }}
              arrowColor={global.white}
              labelStyle={{
                fontSize: 14,
                color: "#000",
              }}
                style={{
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#000",
                  alignItems: "center",
                  marginBottom: 20,
                  marginTop: 12,
                  height:50
                }}
                dropDownStyle={{ color: "#000",  height: 250, marginTop: 15 }}
                containerStyle={{height:80}}
              onChangeItem={(item) => {
                this.setState({
                  checkType: item,
                });
              }}
            />
            <View
              style={{
                display: "flex",
                width: '100%',
                marginHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                height: 50,
                zIndex: 2000,
                fontSize: 20
              }}
            > 
            <View style={{ height: 50,width: "18%",alignItems: "center",flexDirection: "row",paddingBottom:"2%"}}><Text style={{fontSize: 16}}>Quando</Text></View>
              <View style={{
                width: "60%",
                maxWidth:"55%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
              }}>
                <TouchableOpacity
                  onPress={() => this.setState({ datePicker: true })}
                  style={{
                    height: 50,
                    minHeight: 50,
                  }}
                >
                  {this.state.datePicker && (
                    <DatePicker
                      style={{ width: "100%", height: 50, position: "absolute", borderWidth: 0,zIndex:1000 }}
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
                  <Text style={{color:"#000",fontSize:14,paddingTop:"6%",fontSize: 16}} accessible={false}>{moment(this.state.date).format("DD MMMM YYYY")}</Text>
                </TouchableOpacity>
              </View>
              <View style={{
                display: "flex",
                flexDirection: "row",
                width: "25%",
                maxWidth: "25%",
                alignItems: "center",
                justifyContent: "center",
                height: 50,
              }}>
              <TouchableOpacity
                onPress={() => this.setState({ timePicker: true })}
                style={{
                  height: 50,
                  minHeight: 50,
                  paddingBottom: '6%',
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                {this.state.timePicker && Platform.OS === "android" ? (
                  <DateTimePicker
                    style={{ position:'absolute',top:0,left:-100,backgroundColor:'white',opacity:3,zIndex:200, width: '400%',height: '150%', borderWidth: 1 }}
                    testID="timePicke"
                    value={this.state.time}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    useNativeDriver={true}
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
                    onChange={(event, selectedDate) => {
                      this.setState({ timePicker: false, time: selectedDate });
                    }}
                    />) :
                    (
                      <View>
                    <DateTimePickerModal
                      isVisible={this.state.timePicker}
                      date={this.state.time}
                      mode="time"
                      locale="it"
                      headerTextIOS={"Scegli un orario"}
                      cancelTextIOS={"Annulla"}
                      confirmTextIOS={"Conferma"}
                      onConfirm={(date) => { this.setState({ timePicker: false, time: date }) }}
                      onCancel={() => { this.setState({ timePicker: false }) }}
                    />
                  </View>
                )}
                <Text style={{color:"#000",fontSize:16}} accessible={false}>{moment(this.state.time).format("HH:mm")}</Text>
              </TouchableOpacity>
              </View>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: "15%" }}>
            <RoundedButton
              btnText={this.state.isLoading ? <ActivityIndicator style={{ justifyContent: "center", alignSelf: "center", flex: 1 }} color={"white"} size="small" /> : "INSERISCI"}
              backgroundColor={global.secondary}
              onPress={() => {
                this.state.checkType ? this.AddAppointment() : Alert.alert("Errore", "Scegli la tipologia dell'appuntamento", "OK");
              }}
            />
          </View>
        <View style={styles.bottomView}>
          <CustomeBottomBar
            activeIndex={1}
            navigation={this.props.navigation}
          />
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
export default connect(mapStateToProps, mapDispatchToProps)(docAppoSecond);
