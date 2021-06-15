/* @flow */

import React, { Component } from "react";
import { View, Text, SafeAreaView, StatusBar, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import global from "../../../../Common/global";
import { registerApi } from "../../../../../Actions/registerAction";
import CustomeHeader from "../../../../Common/CustomeHeader";
import DropDownPicker from "react-native-dropdown-picker";
import RoundedButton from "../../../../Common/RoundedButton";
import { addCallAppointment } from "../../../../../Actions/addCallAppointment";
import { addLiveAppointment } from "../../../../../Actions/addLiveAppointment";
import { getPatientListByDoc } from "../../../../../Actions/getAllPatinentByDoctor";
import storage from "../../../../../utils/storage";
import moment  from "moment";

class patAppoSecond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      date: moment(),
      timePicker: false,
      datePicker: false,
      time: moment(),
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
    const { doctor } = this.props.navigation.state.params;

    let data = {
      doctor_id: doctor.id,
    };
    
    const response = await getPatientListByDoc(data);
    console.log("resp", response.patientsAccepted);
    if (response.status == "success") {
      let modifiedResponse = [];
      response.patientsAccepted.map((item, index) => {
        modifiedResponse.push({
          label: item.name,
          value: item.name,
          patient: item
        });
      });

      this.setState(
        {
          patientsList: [...modifiedResponse],
        },
        function () {
          console.log("Sta", this.state.patientsList);
          console.log("Sta2", modifiedResponse);
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
    
    console.log("televisita",this.state.checkType)

    if(this.state.checkType.value === "televisita"){
      let data = {
        name: this.state.selectedPatient.name,
        description: "",
        date: this.state.date.toISOString(),
        time: this.state.time.toISOString(),
        patient_id: res.user.id ,
        doctor_id: this.state.selectedPatient.patient.id,
        status: false,
      };

      var response = await addCallAppointment(data);
      console.log("re", response);
      if (response.status == "success") {
        this.setState({ isLoading: false });
        alert(response.message);
      } else {
        this.setState({ isLoading: false });
        alert(response.message);
      }
    }else{
      let data = {
        name: this.state.selectedPatient.name,
        description: "",
        date: this.state.date.toISOString(),
        time: this.state.time.toISOString(),
        patient_id: this.state.selectedPatient.patient.id,
        doctor_id: res.user.id,
        status: false,
      };

      var response = await addLiveAppointment(data);
      console.log("re", response);
      if (response.status == "success") {
        this.setState({ isLoading: false });
        alert(response.message);
      } else {
        this.setState({ isLoading: false });
        alert(response.message);
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
    let time = moment(selectedDate).format("HH:mm");
    console.log("appointment time: ",time)
    this.setState({
      time: time.toISOString()
    });
  };

  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    var arr = JSON.stringify(currentDate).split("T");

    this.setState({
      date: currentDate
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
        <StatusBar barStyle="light-content" />

        <CustomeHeader backgroundColor={global.primary} text={"Riciedi appuntamento"} navigation={this.props.navigation} />
        <View style={{flex: 1,flexDirection:'column'}}>
          <View style={{ marginHorizontal: 20,zIndex: 3000 }}>
              <DropDownPicker
                items={[
                  {label:"Televisita",value:"televisita"},{label:"Visita in ambulatorio",value:"visita"}
                ]}
                placeholder="Tipo visita"
                defaultValue={this.state.checkType.value}
                containerStyle={{ height: 100 }}
                itemStyle={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  color: '#000',
                }}
                arrowColor={global.white}
                labelStyle={{
                  fontSize: 14,
                  color: '#000'
                }}
                style={{
                  width: '100%',
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: '#000',
                  alignItems: "center",
                  marginBottom: 20,
                  marginTop: 10,
                }}
                dropDownStyle={{ marginTop: 30,color:'#000',backgroundColor: '#FFF', width: "95%", alignSelf: "center", height: 250}}
                onChangeItem={(item) =>{
                  this.setState({
                  checkType: item
                })}
                }
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 50
                }}
              >
                <Text>Quando</Text>
                <TouchableOpacity onPress={() => this.openDatePicker()}>
                  <Text>{this.state.date ? this.state.date.format('DD MMMM YYYY') : "Data appuntamento"}</Text>
                  {this.state.datePicker && 
                    <DateTimePicker
                      testID="datePicker"
                      value={this.state.date}
                      mode="date"
                      onChange={(event, selectedDate) => {
                        this.onDateChange(event, selectedDate);
                      }}
                    />
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.openTimePicker}}>
                <Text>{this.state.time ? this.state.time.format('HH:mm') : "Orario appuntamento"}</Text>
                {this.state.timePicker && Platform.OS === "android" ? (
                    <DateTimePicker
                      testID="timePicker"
                      value={moment(this.state.time).duration('1:30').asHours()}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={(event, selectedTime) => {
                        this.onTimeChange(event, selectedTime);
                      }}
                  />) :
                    (
                      <View>
                  <DateTimePickerModal
                    isVisible={this.state.timePicker}
                    mode="time"
                    locale="it"
                    headerTextIOS={"Scegli un orario"}
                    cancelTextIOS={"Annulla"}
                    confirmTextIOS={"Conferma"}
                    timeZoneOffsetInMinutes={115}
                        onConfirm={(date) => { this.onTimeChange(date);this.setState({ timePicker: false }) }}
                    onCancel={() => { this.setState({ timePicker: false }) }}
                  />
                </View>)}
                </TouchableOpacity>
              </View>
          </View>

          <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: "10%" }}>
            <RoundedButton
              btnText={this.state.isLoading ? <ActivityIndicator style={{ justifyContent: "center", alignSelf: "center", flex: 1 }} color={"white"} size="small" /> : "INSERISCI"}
              backgroundColor={global.primary}
              onPress={() => {this.state.checkType ?  this.AddAppointment() : Alert.alert("Errore","Scegli la tipologia dell'appuntamento","OK")
              }}
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
export default connect(mapStateToProps, mapDispatchToProps)(patAppoSecond);
