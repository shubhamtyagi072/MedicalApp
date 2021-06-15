/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import TextCommon from "../../../Common/TextCommon";
import RoundedButton from "../../../Common/RoundedButton";
import global from "../../../Common/global";
import { registerApi } from "../../../../Actions/registerAction";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import CustomeHeader from "../../../Common/CustomeHeader";
import storage from "../../../../utils/storage";
import { getYourDocList } from "../../../../Actions/getYourDocList";
import { images } from "../../../../Image";
import TextinputCommon from "../../../Common/TextinputCommon";
import moment from "moment";

class patientYourDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      patient_id: null,
      doctorDetailsModal: false,
      currentDoctor: "",
    };
  }

  componentDidMount() {
    this.getYourDocListApiCAll();
  }

  getYourDocListApiCAll = async () => {
    console.log("respo1234 ");
    const res = JSON.parse(await this.getUser_Detail());
    let data = {
      patient_id: res.patient.id,
    };
    console.log("data", data);
    const response = await getYourDocList(data);

    console.log("respo1234  ", response);
    this.setState({
      data: response.doctorList,
      patient_id: res.patient.id,
    });
  };

  getUser_Detail = async () => {
    return await storage.get("Login");
  };

  render() {
    if (this.props.RegisterIsLoding) {
      return <ActivityIndicator style={{ justifyContent: "center", alignSelf: "center", flex: 1 }} color={"blue"} size="large" />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <CustomeHeader backgroundColor={global.primary} text={"I tuoi medici"} navigation={this.props.navigation} />

        <Modal animationType="slide" transparent={true} visible={this.state.doctorDetailsModal}>
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
                    <Entypo name="user" size={40} color={global.primary} />
                  </View>
                  <TextCommon text={this.state.currentDoctor.name} color={global.white} fontSize={global.fontSize_17} fontWeight={"600"} textAlign={"center"} fontFamily={"Montserrat-Bold"} />
                </View>
                <Entypo
                  name="cross"
                  onPress={() => {
                    this.setState({ doctorDetailsModal: false });
                  }}
                  size={40}
                  color={global.white}
                />
              </View>

              <ScrollView style={{ marginBottom: 10, height: "80%",width:'100%' }}>
                <View style={styles.buttonPadding}>
                <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      width: "100%",
                      color: global.primary,
                      alignItems: "center",
                      justifyContent: "flex-start",
                      marginTop: 20,
                    }}
                  >
                    <FontAwesome name="envelope" width={10} color={'#FFF'} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                    <Text style={{ resizeMode: "contain", marginLeft: 14,color:'#FFF',backgroundColor:global.primary, fontSize:14,fontFamily: "Poppins-Medium" }} disable={false}>{this.state.currentDoctor && this.state.currentDoctor.email ? this.state.currentDoctor.email : ""}</Text> 
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      width: "100%",
                      color: global.primary,
                      alignItems: "center",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <FontAwesome name="user-md" color={'#FFF'} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                    <Text style={{ resizeMode: "contain", marginLeft: 14,color:'#FFF',backgroundColor:global.primary, fontSize:14,fontFamily: "Poppins-Medium" }} disable={false}>{this.state.currentDoctor && this.state.currentDoctor.specialization ? this.state.currentDoctor.specialization : ""}</Text> 
</View>

                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      width: "100%",
                      color: global.primary,
                      alignItems: "center",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <FontAwesome name="user-md" color={'#FFF'} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                    <Text style={{ resizeMode: "contain", marginLeft: 14,color:'#FFF',backgroundColor:global.primary, fontSize:14,fontFamily: "Poppins-Medium" }} disable={false}>{this.state.currentDoctor && this.state.currentDoctor.specialization_info ? this.state.currentDoctor.specialization_info : ""}</Text> 

                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      width: "100%",
                      color: global.primary,
                      alignItems: "center",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <FontAwesome name="map-marker" color={'#FFF'} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                    <Text style={{ resizeMode: "contain", marginLeft: 14,color:'#FFF',backgroundColor:global.primary, fontSize:14,fontFamily: "Poppins-Medium" }} disable={false}>{this.state.currentDoctor && this.state.currentDoctor.sur_name ? this.state.currentDoctor.sur_name : ""}</Text> 

                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      width: "100%",
                      color: global.primary,
                      alignItems: "center",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <FontAwesome name="map-marker" color={'#FFF'} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                    <Text style={{ resizeMode: "contain", marginLeft: 14,color:'#FFF',backgroundColor:global.primary, fontSize:14,fontFamily: "Poppins-Medium" }} disable={false}>{this.state.currentDoctor && this.state.currentDoctor.office_address ? this.state.currentDoctor.office_address : ""}</Text> 

                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      width: "100%",
                      color: global.primary,
                      alignItems: "center",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <FontAwesome5 name="clock" color={'#FFF'} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                    <Text style={{ resizeMode: "contain", marginLeft: 14,color:'#FFF',backgroundColor:global.primary, fontSize:14,fontFamily: "Poppins-Medium" }} disable={false}>{this.state.currentDoctor && this.state.currentDoctor.opening_time ? moment(this.state.currentDoctor.opening_time).format('HH:mm') : ""}</Text> 

                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      width: "100%",
                      color: global.primary,
                      alignItems: "center",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <FontAwesome5 name="clock" color={'#FFF'} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                    <Text style={{ resizeMode: "contain", marginLeft: 14,color:'#FFF',backgroundColor:global.primary, fontSize:14,fontFamily: "Poppins-Medium" }} disable={false}>{this.state.currentDoctor && this.state.currentDoctor.closing_time ? moment(this.state.currentDoctor.closing_time).format('HH:mm') : ""}</Text> 

                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      width: "100%",
                      color: global.primary,
                      alignItems: "center",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <Ionicons name="call-outline" color={'#FFF'} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                    <Text style={{ resizeMode: "contain", marginLeft: 14,color:'#FFF',backgroundColor:global.primary, fontSize:14,fontFamily: "Poppins-Medium" }} disable={false}>{this.state.currentDoctor && this.state.currentDoctor.office_phone ? this.state.currentDoctor.office_phone : ""}</Text> 

                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: global.white,
                      height: 50,
                      borderRadius: 50 / 2,
                      width: "100%",
                      color: global.primary,
                      alignItems: "center",
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <Ionicons name="call-outline" color={'#FFF'} style={{ resizeMode: "contain", marginLeft: 14 }} size={20} />
                    <Text style={{ resizeMode: "contain", marginLeft: 14,color:'#FFF',backgroundColor:global.primary, fontSize:14,fontFamily: "Poppins-Medium" }} disable={false}>{this.state.currentDoctor && this.state.currentDoctor.mobile_phone ? this.state.currentDoctor.mobile_phone : ""}</Text> 

                  </View>

                  <View style={{ height: 22 }} />
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <ScrollView style={{ flex: 1, marginBottom: "15%" }}>
          <View>
            {/*Printing out the list of doctor associated with the current patient*/}
            {this.state.data.length != 0 ? (
              this.state.data.map((item, index) => {
                var roomID = `${item.id}-${this.state.patient_id}`;
                return (
                  <View key={index} style={styles.typeView}>
                    <View style={{ flexDirection: "row",maxWidth: '60%',width: '60%', alignItems: "center" }}>
                      <View style={styles.roundIconView}>
                        <Entypo name="user" size={25} color="white" />
                      </View>
                      <TextCommon text={item.name} color={"#000000"} fontSize={global.fontSize_17} fontWeight={"600"} textAlign={"left"} maxWidth={'60%'} fontFamily={"Montserrat-Bold"} />
                    </View>

                    <View style={{ flexDirection: "row",maxWidth: '28%',width: '30%',justifyContent:'space-between',alignItems:'flex-end',marginLeft:0 }}>
                      <TouchableOpacity
                        style={styles.msgView}
                        onPress={() => {
                          this.setState({ currentDoctor: item, doctorDetailsModal: true });
                        }}
                      >
                        <FontAwesome5 name="address-card" size={20} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.msgView}
                        onPress={() => {
                          this.props.navigation.navigate("patAppoFirst",{doctor: item});
                        }}
                      >
                        <FontAwesome5 name="calendar-alt" size={20} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.msgView}
                        onPress={() => {
                          this.props.navigation.navigate("chatScreen", { item: item });
                        }}
                      >
                        <Ionicons name="chatbox" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={{paddingTop:10}}><TextCommon text="Nessun medico ancora associato" color={"#000000"} fontSize={global.fontSize_17} fontWeight={"600"} textAlign={"center"} fontFamily={"Montserrat-Bold"} /></View>
            )}
          </View>
        </ScrollView>

        <View style={styles.bottomView} />
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
export default connect(mapStateToProps, mapDispatchToProps)(patientYourDoc);
