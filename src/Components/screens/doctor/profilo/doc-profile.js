import React, { Component } from "react";
import { View, Dimensions, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, ActivityIndicator, ImageBackground } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import TextCommon from "../../../Common/TextCommon";
import global from "../../../Common/global";
import {constant} from './constant'
import RoundedButton from "../../../Common/RoundedButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from "react-native-datepicker";
import CustomeHeader from "../../../Common/CustomeHeader";
import TextinputCommon from "../../../Common/TextinputCommon";
import storage from "../../../../utils/storage";
import { images } from "../../../../Image";
import RNPickerSelect from "react-native-picker-select";
import { submitDoctor } from "../../../../Actions/submitDocPro";
import { getDoctorById } from "../../../../Actions/getDoctorById";
import moment from "moment";

class docProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {},
      date: moment(),
      timeAp: new Date(),
      timeChius: new Date(),
      yearDate: moment(),
      loading: false,
      showDate: false,
      name: null,
      sur_name: null,
      email: null,
      specialization: null,
      specialization_info: null,
      birth_date: null,
      office_address: null,
      opening_time: null,
      closing_time: null,
      office_phone: null,
      mobile_phone: null,
      showTimeAp: null,
      showTimeChius: null,
      edited: false,
    };
    this.swiper;
  }

  getCurrentLoggedUser = async () => {
    //getting the local storage to check if a user is already logged in
    await storage.get("Login").then((loggedUser) => {
      //getting the parsed JSON
      const parsedUser = JSON.parse(loggedUser);
      const doctor = parsedUser.user || parsedUser.doctor;
      console.log("CIAOCIAO", doctor.id);
      let data = {
        id: doctor.id,
      };
      getDoctorById(data).then((doctor) => {
        //checking if the doctor has been accepted as standard
        const resDoctor = doctor.doctor;
        if (resDoctor) {
          this.setState({
            response: resDoctor,
            name: resDoctor.name,
            sur_name: resDoctor.sur_name,
            email: resDoctor.email,
            specialization: resDoctor.specialization,
            specialization_info: resDoctor.specialization_info,
            birth_date: resDoctor.birth_date,
            office_address: resDoctor.office_address,
            opening_time: resDoctor.opening_time,
            closing_time: resDoctor.closing_time,
            office_phone: resDoctor.office_phone,
            mobile_phone: resDoctor.mobile_phone,
          });
        }
      });
    });
  };

  componentDidMount() {
    this.getCurrentLoggedUser();
  }

  validation = () => {
    this.setState({
        isLoading: false,
      });
    if (!this.state.birth_date) {
      alert(constant.errdate);
      return false;
    } else if (!this.state.sur_name) {
      alert(constant.errResidenza);
      return true;
    }
  };

  onNextPress = async () => {
    this.setState({
      isLoading: true,
    });
      console.log("date time",this.state.timeAp.toISOString(),this.state.timeChius.toISOString())

      var data = {
        id: this.state.response.id,
        name: this.state.name,
        sur_name: this.state.sur_name,
        email: this.state.email,
        specialization: this.state.specialization,
        specialization_info: this.state.specialization_info,
        birth_date: this.state.birth_date,
        office_address: this.state.office_address,
        opening_time: this.state.timeAp.toISOString(),
        closing_time: this.state.timeChius.toISOString(),
        office_phone: this.state.office_phone,
        mobile_phone: this.state.mobile_phone,
      };

      console.log("Birth date", );
      const resp1 = await submitDoctor(data);
      console.log("resp1", resp1);
      if (resp1.status === "success") {
        this.setState({
          isLoading: false,
        });
        this.props.navigation.navigate("DoctorDashBoardScreen");
      } else {
        this.setState({
          isLoading: false,
        });
        Alert.alert("Medico", resp1["message"]);
      }

  };

  getUser_Detail = async () => {
    return await storage.get("Login");
  };

  setSpecialist = async (value) => {
    this.setState({
        specialization :  value
    })
  };

  setSpecialization = async (value) => {
    this.setState({
        specialization_info : value
    })
  };

  render() {
    if (this.props.RegisterIsLoding) {
      return <ActivityIndicator style={{ justifyContent: "center", alignSelf: "center", flex: 1 }} color={"blue"} size="large" />;
    }

    //Labels for the input field
    const Label = ({ text }) => {
      return (
        <View style={{ marginBottom: 4 }}>
          <TextCommon text={text} color={global.secondary} fontSize={global.fontSize_14} fontWeight="400" fontFamily="Montserrat-Bold" />
        </View>
      );
    };

    console.log("Birth date", this.state.response);

    return (

      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <CustomeHeader backgroundColor={global.secondary} text="Profilo" navigation={this.props.navigation} />
        <View style={{ marginTop: "8%", alignItems: "center",paddingHorizontal:10 }}>
          <ScrollView>
            <View style={styles.buttonPadding}>
              <Label text="Nome e Cognome" />
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: global.secondary,
                  height: 50,
                  borderRadius: 50 / 2,
                  color: global.secondary,
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <FontAwesome name="user" color={global.secondary} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                <TextinputCommon placeHolder={"NOME"} value={this.state.name} placeholderTextColor={global.secondary} onChangeTxt={(text) => this.setState({name:text})} color={global.secondary} disable={!this.state.loading} style={{ backgroundColor: "black" }} />
              </View>

              <Label text="Data di nascita" />
              <TouchableOpacity
                onPress={() => this.setState({ showDate: true })}
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: global.secondary,
                  height: 50,
                  borderRadius: 50 / 2,
                  color: global.secondary,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <FontAwesome name="calendar" color={global.secondary} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                <TextinputCommon placeHolder={"DATA DI NASCITA*"} value={moment(this.state.birth_date).format("DD MMMM YYYY")} placeholderTextColor={global.secondary} color={global.secondary} disable={false} />
                {this.state.showDate && (
                  <DatePicker
                    style={{ width: "100%", height: 50, position: "absolute", opacity: 0, borderWidth: 0 }}
                    date={this.state.date} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="select date"
                    maxDate={moment()}
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
                      this.setState({ showDate: false,birth_date: date });
                    }}
                  />
                )}
              </TouchableOpacity>

              <Label text="Città" />
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: global.secondary,
                  height: 50,
                  borderRadius: 50 / 2,
                  color: global.secondary,
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <FontAwesome name="building" color={global.secondary} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                <TextinputCommon placeHolder={"CITTA*"} value={this.state.sur_name} placeholderTextColor={global.secondary} onChangeTxt={(text) => this.setState({sur_name:text})} color={global.secondary} disable={!this.state.loading} />
              </View>

              <Label text="Email" />
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: global.secondary,
                  height: 50,
                  borderRadius: 50 / 2,
                  color: global.secondary,
                  alignItems: "center",
                  flex: 1,
                  marginBottom: 10,
                }}
              >
                <FontAwesome name="envelope" color={global.secondary} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                <TextinputCommon placeHolder={"EMAIL*"} value={this.state.email} placeholderTextColor={global.secondary} onChangeTxt={(text) => this.setState({email:text})} color={global.secondary} disable={!this.state.loading} />
              </View>

              <Label text="Professione" />
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: global.secondary,
                  height: 50,
                  borderRadius: 50 / 2,
                  color: global.secondary,
                  alignItems: "center",
                  flex: 1,
                  marginBottom: 10,
                }}
              >
                <FontAwesome name="user-md" color={global.secondary} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                <RNPickerSelect
                  value={this.state.specialization}
                  onValueChange={(value) => this.setSpecialist(value)}
                  placeholder={{}}
                  items={[
                    { label: "La tua professione", value: "" },
                    { label: "Medico di famiglia", value: "Medico di famiglia" },
                    { label: "Specialista", value: "Specialista" },
                  ]}

                  style={{
                    inputIOS: {
                      fontSize: 16,
                      paddingVertical: 15,
                      paddingLeft: 20,
                      paddingRight: 30, // to ensure the text is never behind the icon
                      color: global.secondary,
                      fontWeight: "bold",
                      width: Dimensions.get("screen").width * 0.75,
                    },
                    inputAndroid: {
                      width: Dimensions.get("screen").width * 0.75,
                      fontSize: 16,
                      paddingVertical: 15,
                      paddingLeft: 20,
                      paddingRight: 30, // to ensure the text is never behind the icon
                      color: global.secondary,
                      fontWeight: "bold",
                    },
                  }}
                />
              </View>

              <Label text="Specializzazione" />
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: global.secondary,
                  height: 50,
                  borderRadius: 50 / 2,
                  color: global.secondary,
                  alignItems: "center",
                  flex: 1,
                  marginBottom: 10,
                }}
              >
                <FontAwesome name="user-md" color={global.secondary} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                <RNPickerSelect
                  value={this.state.specialization_info}
                  onValueChange={(value) => this.setSpecialization(value)}
                  placeholder={{}}
                  disabled={this.state.specialization != "Specialista" }
                  items={[
                    { label: "Seleziona una specializzazione", value: "Seleziona una specializzazione" },
                    { label: "Allergologia ed immunologia clinica", value: "Allergologia ed immunologia clinica" },
                    { label: "Angiologia", value: "Angiologia" },
                    { label: "Audiologia e foniatria", value: "Audiologia e foniatria" },
                    { label: "Cardiologia", value: "Cardiologia" },
                    { label: "Chirurgia generale", value: "Chirurgia generale" },
                    { label: "Chirurgia maxillo-facciale", value: "Chirurgia maxillo-facciale" },
                    { label: "Chirurgia pediatrica", value: "Chirurgia pediatrica" },
                    { label: "Chirurgia plastica e ricostruttiva", value: "Chirurgia plastica e ricostruttiva" },
                    { label: "Chirurgia toracica", value: "Chirurgia toracica" },
                    { label: "Chirurgia vascolare", value: "Chirurgia vascolare" },
                    { label: "Continuità assistenziale", value: "Continuità assistenziale" },
                    { label: "Cure palliative", value: "Cure palliative" },
                    { label: "Dermatologia e venereologia", value: "Dermatologia e venereologia" },
                    { label: "Ematologia", value: "Ematologia" },
                    { label: "Endocrinologia", value: "Endocrinologia" },
                    { label: "Farmacologia e tossicologia clinica", value: "Farmacologia e tossicologia clinica" },
                    { label: "Gastroenterologia", value: "Gastroenterologia" },
                    { label: "Genetica medica", value: "Genetica medica" },
                    { label: "Geriatria", value: "Geriatria" },
                    { label: "Ginecologia e ostetricia", value: "Ginecologia e ostetricia" },
                    { label: "Igiene degli alimenti e della nutrizione", value: "Igiene degli alimenti e della nutrizione" },
                    { label: "Igiene, epidemiologia e sanità pubblica", value: "Igiene, epidemiologia e sanità pubblica" },
                    { label: "Malattie dell'apparato respiratorio", value: "Malattie dell'apparato respiratorio" },
                    { label: "Malattie infettive", value: "Malattie infettive" },
                    { label: "Malattie metaboliche e diabetologia", value: "Malattie metaboliche e diabetologia" },
                    { label: "Medicina del lavoro", value: "Medicina del lavoro" },
                    { label: "Medicina dello sport", value: "Medicina dello sport" },
                    { label: "Medicina di comunità", value: "Medicina di comunità" },
                    { label: "Medicina e chirurgia di accettazione e di urgenza", value: "Medicina e chirurgia di accettazione e di urgenza" },
                    { label: "Medicina fisica e riabilitazione", value: "Medicina fisica e riabilitazione" },
                    { label: "Medicina interna", value: "Medicina interna" },
                    { label: "Medicina legale", value: "Medicina legale" },
                    { label: "Medicina nucleare", value: "Medicina nucleare" },
                    { label: "Medicina termale", value: "Medicina termale"},
                    { label: "Medicina trasfusionale", value: "Medicina trasfusionale" },
                    { label: "Microbiologia e virologia", value: "Microbiologia e virologia" },
                    { label: "Nefrologia", value: "Nefrologia" },
                    { label: "Neonatologia", value: "Neonatologia" },
                    { label: "Neurochirurgia", value: "Neurochirurgia" },
                    { label: "Neurologia", value: "Neurologia" },
                    { label: "Neuropsichiatria infantile", value: "Neuropsichiatria infantile" },
                    { label: "Neuroradiologia", value: "Neuroradiologia" },
                    { label: "Oftalmologia", value: "Oftalmologia" },
                    { label: "Ortopedia e traumatologia", value: "Ortopedia e traumatologia" },
                    { label: "Otorinolaringoiatria", value: "Otorinolaringoiatria" },
                    { label: "Patologia clinica", value: "Patologia clinica" },
                    { label: "Pediatria", value: "Pediatria" },
                    { label: "Psichiatria", value: "Psichiatria" },
                    { label: "Psicoterapia", value: "Psicoterapia" },
                    { label: "Radiodiagnostica", value: "Radiodiagnostica" },
                    { label: "Radioterapia", value: "Radioterapia" },
                    { label: "Scienza dell'alimentazione", value: "Scienza dell'alimentazione" },
                    { label: "Urologia", value: "Urologia" },
                  ]}
                  style={{
                    inputIOS: {
                      fontSize: 16,
                      paddingVertical: 15,
                      paddingLeft: 20,
                      paddingRight: 30, // to ensure the text is never behind the icon
                      color: global.secondary,
                      fontWeight: "bold",
                      width: Dimensions.get("screen").width * 0.75,
                    },
                    inputAndroid: {
                      width: Dimensions.get("screen").width * 0.75,
                      fontSize: 16,
                      paddingVertical: 15,
                      paddingLeft: 20,
                      paddingRight: 30, // to ensure the text is never behind the icon
                      color: global.secondary,
                      fontWeight: "bold",
                    },
                  }}
                />
              </View>

              <Label text="Indirizzo ufficio" />
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: global.secondary,
                  height: 50,
                  borderRadius: 50 / 2,
                  color: global.secondary,
                  alignItems: "center",
                  flex: 1,
                  marginBottom: 10,
                }}
              >
                <FontAwesome name="map-marker" color={global.secondary} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                <TextinputCommon placeHolder={"INDIRIZZO UFFICIO*"} value={this.state.office_address} placeholderTextColor={global.secondary} onChangeTxt={(text) => this.setState({office_address:text})} color={global.secondary} disable={!this.state.loading}/>
              </View>

              <Label text="Orario di apertura" />
              <TouchableOpacity
                onPress={()=> this.setState({showTimeAp:true})}
                    style={{
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: global.secondary,
                        height: 50,
                        borderRadius: 50 / 2,
                        color: global.secondary,
                        alignItems: "center",
                        flex: 1,
                        marginBottom: 10,
                        zIndex: 100,
                    }}
                >
                {this.state.showTimeAp && Platform.OS === "android" ? (
                    <DateTimePicker
                    style={{ width: "100%", height: 50, position: "absolute", borderWidth: 0 }}
                    testID="timePicker"
                    value={this.state.timeAp}
                    mode={"time"}
                    timeZoneOffsetInMinutes={-4}
                    is24Hour={true}
                    display="default"
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
                        this.setState({ showTimeAp: false,edited: true, timeAp: selectedDate });
                    }}
                  />) :
                    (
                      <View>
                  <DateTimePickerModal
                    isVisible={this.state.showTimeAp}
                    mode="time"
                    locale="it"
                    date={this.state.timeAp}
                    headerTextIOS={"Scegli un orario"}
                    cancelTextIOS={"Annulla"}
                    confirmTextIOS={"Conferma"}
                        onConfirm={(date) => { this.setState({ showTimeAp: false, edited: true, timeAp: date }) }}
                        onCancel={() => { this.setState({ showTimeAp: false }) }}
                  />
                </View>)}
                    <Ionicons name="time-outline" color={global.secondary} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                <TextinputCommon placeHolder={"ORARIO DI APERTURA"} placeholderTextColor={global.primary} pointerEvents={true} value={this.state.edited ? moment(this.state.timeAp).format("HH:mm") : moment(this.state.opening_time).format("HH:mm")} color={global.secondary} disable={false} style={{ width: "100%", padding: 10, zIndex: 0 }} />
                </TouchableOpacity>


              <Label text="Orario di chiusura" />
              <TouchableOpacity
                onPress={()=> this.setState({showTimeChius:true})}
                    style={{
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: global.secondary,
                        height: 50,
                        borderRadius: 50 / 2,
                        color: global.secondary,
                        alignItems: "center",
                        flex: 1,
                        marginBottom: 10,
                    }}

                >
                {this.state.showTimeChius && Platform.OS === "android" ? (
                    <DateTimePicker
                    style={{ width: "100%", height: 50, position: "absolute", borderWidth: 0, zIndex: 100 }}
                    testID="timePicker"
                    value={this.state.timeChius}
                    mode={"time"}
                    timeZoneOffsetInMinutes={0}
                    is24Hour={true}
                    display="default"
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
                        this.setState({ showTimeChius: false,edited: true, timeChius: selectedDate });
                    }}
                  />) : (
                      <DateTimePickerModal
                        isVisible={this.state.showTimeChius}
                        mode="time"
                        locale="it"
                        date={this.state.timeChius}
                        headerTextIOS={"Scegli un orario"}
                        cancelTextIOS={"Annulla"}
                        confirmTextIOS={"Conferma"}
                        onConfirm={(date) => { this.setState({ showTimeChius: false, edited: true, timeChius: date }) }}
                        onCancel={() => { this.setState({ showTimeChius: false }) }}
                      />
                    )}
                    <Ionicons name="time-outline" color={global.secondary} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                <TextinputCommon placeHolder={"ORARIO DI CHIUSURA"} placeholderTextColor={global.secondary} pointerEvents={true} value={this.state.edited ? moment(this.state.timeChius).format("HH:mm"):moment(this.state.closing_time).format("HH:mm")} color={global.secondary} editable={false} disable={false} style={{ width: "100%", padding: 10}}/>
                </TouchableOpacity>
              <Label text="Telefono ufficio" />
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: global.secondary,
                  height: 50,
                  borderRadius: 50 / 2,
                  color: global.secondary,
                  alignItems: "center",
                  flex: 1,
                  marginBottom: 10,
                }}
              >
                <Ionicons name="call-outline" color={global.secondary} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                <TextinputCommon placeHolder={"TELEFONO AMBULATORIO"} value={this.state.office_phone} placeholderTextColor={global.secondary} onChangeTxt={(text) => this.setState({office_phone:text})} color={global.secondary} disable={!this.state.loading} keyboardType={"numeric"} />
              </View>

              <Label text="Cellulare" />
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: global.secondary,
                  height: 50,
                  borderRadius: 50 / 2,
                  color: global.secondary,
                  alignItems: "center",
                  flex: 1,
                  marginBottom: 10,
                }}
              >
                <Ionicons name="call-outline" color={global.secondary} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                <TextinputCommon placeHolder={"CELLULARE"} value={this.state.mobile_phone} placeholderTextColor={global.secondary} onChangeTxt={(text) => this.setState({mobile_phone:text})} color={global.secondary} disable={!this.state.loading} keyboardType={"numeric"} />
              </View>

              <View style={{ marginTop: 15 }}>
                <RoundedButton
                  btnText={
                    !this.state.loading ? (
                      "CONFERMA"
                    ) : (
                      <ActivityIndicator
                        style={{
                          justifyContent: "center",
                          alignSelf: "center",
                          flex: 1,
                          marginVertical: "auto",
                        }}
                        backgroundColor={global.primary}
                        color={"white"}
                        size="small"
                      />
                    )
                  }
                  backgroundColor={global.secondary}
                  onPress={() => {
                    this.onNextPress();
                  }}
                />
              </View>
              <View style={{ height: 22 }} />
            </View>
          </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(docProfile);
