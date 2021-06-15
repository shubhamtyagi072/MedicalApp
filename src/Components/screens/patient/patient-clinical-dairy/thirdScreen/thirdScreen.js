/* @flow */

import React, { Component } from "react";
import { ActivityIndicator, SafeAreaView, StatusBar, Text, Modal, TouchableOpacity, View,Platform, Dimensions } from "react-native";
import TextCommon from "../../../../Common/TextCommon";
import global from "../../../../Common/global";
import { addCurrentPathology } from "../../../../../Actions/addCurrentPathology";
import { editCurrentPathology } from "../../../../../Actions/editCurrentPathology";
import { addSymptoms } from "../../../../../Actions/addSymptoms";
import { getSymptomsByPathologyId } from "../../../../../Actions/getSymptomsByPathologyId";;
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import styles from "./styles";
import storage from "../../../../../utils/storage";

import moment from "moment";
import "moment/locale/it";

moment.locale("it");

export default class thirdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathology: null,
      current: null,
      from: null,
      showDate: false,
      showModalDate: false,
      date: new Date(),
      date2: new Date(),
      time: new Date(),
      yearDate: moment(),
      refInterval: null,
      showDate1: false,
      showTime:false,
      notes: "",
      isLoading: false,
      symptomsList: [],
      showFirstSinthompsModal: false,
      firstPathologiesDate: new Date(),
      pathologyCreated: false,
    };
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.getAllSymptoms = this.getAllSymptoms.bind(this);
  }

  

  getAllSymptoms = async (pathology, current) => {
    //get the symptoms associted to a specific pathology
      //data to be sent to the backend
      let data = {
        pathology_id: current ? current.pathology_id : pathology.id,
      };

    console.log("pathology", data)

      const response = await getSymptomsByPathologyId(data);

      if (response && response.status === "success") {
        let finalArray = [];
        finalArray = response.symptom ? [...response.symptom] : [...response.symptoms];
        console.log("pathology", finalArray)

        //setting symptoms list from the server based on the most recent date
        if(Platform.OS === "android"){
          finalArray.sort((a, b) => moment(b.regDate) - moment(a.regDate));
        }else{
          finalArray.sort((a, b) => a.regDate <= b.regDate);
        }
        

        this.setState(
          {
            symptomsList: finalArray,
          }
        );
      }
  };

  getUser_Detail = async () => {
    const response = await storage.get("Login");
    return JSON.parse(response);
  };

  componentDidMount = async () => {
    const { pathology, current, from } = this.props.navigation.state.params;
    //setting the data in the from
    this.getAllSymptoms(pathology, current);
    const refInterval = setInterval(() => {
      this.getAllSymptoms(pathology, current);
    }, 1000);

    this.setState({
      pathology,
      current,
      refInterval,
      from,
      notes: "",
      firstPathologiesDate: current ? current.past_pathology_date : new Date()
    });
  };

  componentWillUnmount = () => {
    clearInterval(this.state.refInterval)
  }

  onPressConfirm = async (pathology, current, from) => {
    const userResponse = await this.getUser_Detail().catch((error) => console.error("getUserDetail", error));

    // this add new current pathology by the input pathology object retrieved
    // from props navigation state
    if (pathology != null) {
      if (!this.state.pathologyCreated) { //Add pathology only if not already created
        this.setState({ isLoading: true });
        await addCurrentPathology({
          patient_id: userResponse.patient.id,
          pathology_id: pathology.id,
          recent_pathology_date: moment(this.state.date).toISOString(),
          past_pathology_date: moment(this.state.firstPathologiesDate).toISOString(),
          description: this.state.notes,
        }).then(()=>{this.setState({pathologyCreated: true})}).catch((error) => {console.error("Action addCurrentPathology", error),this.setState({isLoading: false})});
      }
      //add symptoms create method
      await addSymptoms({
        pathology_id: pathology.id,
        description: this.state.notes,
        regDate: moment(this.state.date).toISOString(),
        regTime: moment(this.state.time).toISOString(),
      }).then(()=>{this.setState({isLoading: false})}).catch((error) => {console.error("Action addSymptomsToPathology", error);this.setState({isLoading: false})});
    }

    // this update the current pathology retrieved from props navigation state
    if (current != null) {
    this.setState({ isLoading: true })
      try {
        await editCurrentPathology({
          id: current.id,
          patient_id: current.patient_id,
          pathology_id: current.pathology_id,
          recent_pathology_date: '',
          past_pathology_date: current.recent_pathology_date || this.state.firstPathologiesDate.toISOString(),
          description: this.state.notes,
        }).then(()=>{this.setState({ isLoading: false })}).catch((error) => {console.error("Action editCurrentPathology", error),this.setState({isLoading: false})});
      } catch (error) {
        console.log("editPathology error",error)
      }  
    
    try {
      this.setState({ isLoading: true })
      //add symptoms create method
      await addSymptoms({
        pathology_id: current.pathology_id,
        description: this.state.notes,
        regDate: this.state.date.toISOString(),
        regTime: this.state.time,
      }).then(() => { this.setState({ isLoading: false }); this.getAllSymptoms(pathology, current)}).catch((error) => {console.error("Action addSymptomsToPathology", error);this.setState({isLoading: false})});
    }catch(error){
      console.log("editSymptoms error",error)
    }
    }
  };

  onChangeNote = (value) => {
    this.setState({
      notes: value,
    });
  };

  updateFirstPathologyDate = async (pathology, current) => {
    const userResponse = await this.getUser_Detail().catch((error) => console.error("getUserDetail", error));
    console.log("ciao",userResponse)

    if(userResponse){
      if (pathology != null && !this.state.pathologyCreated) { //Add pathology only if not already created
          this.setState({ isLoading: true });
          await addCurrentPathology({
            patient_id: userResponse.patient.id,
            pathology_id: pathology.id,
            recent_pathology_date: moment(this.state.date).toISOString(),
            past_pathology_date: moment(this.state.firstPathologiesDate).toISOString(),
            description: this.state.notes,
          }).then(() => { this.setState({ pathologyCreated: true, isLoading: false }) }).catch((error) => {this.setState({ isLoading: false });console.error("Action addCurrentPathology", error)});
      }
      // this update the current pathology retrieved from props navigation state
      if (current != null) {
        this.setState({isLoading:true});
        await editCurrentPathology({
          id: current.id,
          patient_id: current.patient_id,
          pathology_id: current.pathology_id,
          recent_pathology_date: moment(this.state.date).toISOString(),
          past_pathology_date: moment(this.state.firstPathologiesDate).toISOString(),
          description: this.state.notes,
        }).then((responseJson) => { this.setState({ isLoading: false }) }).catch((error) => {this.setState({ isLoading: false });console.error("Action editCurrentPathology", error)});
      }
    }
  }

  render() {
    const { pathology, current, from } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.topHeaderView}>
          <Feather
            name="menu"
            color="white"
            size={25}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          {/* Registrazione */}
          <TextCommon text={"Sintomi e Segni"} color={"#FFFFFF"} fontSize={global.fontSize_17} fontWeight={"600"} textAlign={"center"} fontFamily={"Montserrat-Bold"} />
          <AntDesign
            name="setting"
            color="white"
            size={25}
            onPress={() => {
              this.setState({ showFirstSinthompsModal: true });
            }}
          />

          {this.state.showFirstSinthompsModal && (
            <Modal animationType="slide" transparent={true} visible={this.state.addNewPathologyModal}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: global.primary,
                  borderRadius: 20,
                  backgroundColor: global.white,
                  marginTop: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "90%",
                  minHeight: 220,
                  maxHeight: 220,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showFirstSinthompsModal: !this.state.showFirstSinthompsModal });
                    this.updateFirstPathologyDate(pathology,current)
                  }}
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    height: "20%",
                    marginBottom: 10,
                  }}
                >
                  <FontAwesome name="times" color={global.primary} size={20} style={{ marginTop: 20, marginRight: 20 }} />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "90%",
                    padding: 20,
                  }}
                >
                  <Text style={{ textAlign: "justify", color: global.primary, fontSize: 19 }}>Quando si è manifestata la patologia la prima volta?</Text>

                  <TouchableOpacity
                    onPress={()=>this.setState({showModalDate:true})}
                    style={{
                      height: 50,
                      width: "100%",
                      borderRadius: 25,
                      borderWidth: 2,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      borderColor: global.primary,
                      marginTop: 20,
                    }}
                  >
                    {this.state.showModalDate && (
                      <DatePicker
                            style={{ width: "100%", height: 50, position: "absolute", borderWidth: 0, zIndex: 1000 }}
                            date={this.state.firstPathologiesDate}
                            mode="date"
                            placeholder="Seleziona la data"
                            locale="it"
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
                              this.setState({ showModalDate: false, firstPathologiesDate: date });
                            }}
                          />
                    )}
                    <Text style={{ color: global.primary, fontSize: 16 }} accessible={false}>{moment(this.state.firstPathologiesDate).format("DD MMMM YYYY")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", height: 50, marginHorizontal: 15 }}>
          <View style={{
              maxWidth: '60%',
              height: 50,
              borderRadius: 25,
              borderWidth: 2,
              display:'flex',
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-start",
              textAlign:'center',
              borderColor: global.primary,
              marginTop: 20,
              paddingTop:5,
            }}>
          <TouchableOpacity
            onPress={()=>this.setState({showDate:true})}
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
          >
              {this.state.showDate && Platform.OS === "android" ? (
                <DatePicker
                style={{ width: "100%", height: 50, position: "absolute", borderWidth: 0, zIndex: 1000 }}
                date={this.state.date}
                mode="date"
                placeholder="Seleziona la data"
                locale="it"
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
                  this.setState({ showModalDate: false, date: date });
                }}
              />
                ):(
                  <DateTimePickerModal
                    isVisible={this.state.showDate}
                    date={this.state.date}
                    mode="date"
                    locale="it"
                    headerTextIOS={"Scegli un orario"}
                    cancelTextIOS={"Annulla"}
                    confirmTextIOS={"Conferma"}
                    onConfirm={(date) => { this.setState({ showDate: false, date: date }) }}
                    onCancel={() => { this.setState({ showDate: false }) }}
                />
                  
                )}
              <Text style={{ color: global.primary, fontSize: 16 }} accessible={false}>{moment(this.state.date).format("DD MMMM YYYY")}</Text>
          </TouchableOpacity>
          </View>
          <View style={{
              height: 50,
              maxWidth: "30%",
              borderRadius: 25,
              borderWidth: 2,
              display: 'flex',
              alignItems: "flex-end",
              justifyContent: 'center',
              flexDirection: "row",
              marginHorizontal: '3%',
              borderColor: global.primary,
              marginTop: 20,
              paddingTop:5,
            }}>
          <TouchableOpacity
            onPress={()=> this.setState({showTime:true})}
            style={{
              width:'100%',
              height:'100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {this.state.showTime && Platform.OS === "android" ? (
            <DateTimePickerModal
            isVisible={this.state.showTime}
            date={this.state.time}
            mode="time"
            locale="it"
            headerTextIOS={"Scegli un orario"}
            cancelTextIOS={"Annulla"}
            confirmTextIOS={"Conferma"}
            onConfirm={(date) => { this.setState({ showTime: false, time: date })}}
            onCancel={() => { this.setState({ showTime: false }) }}
          />) :
                (
                <DateTimePickerModal
                  isVisible={this.state.showTime}
                  date={this.state.time}
                  mode="time"
                  locale="it"
                  headerTextIOS={"Scegli un orario"}
                  cancelTextIOS={"Annulla"}
                  confirmTextIOS={"Conferma"}
                  onConfirm={(date) => { this.setState({ showTime: false, time: date })}}
                  onCancel={() => { this.setState({ showTime: false }) }}
                />)}
              <Text style={{ color: global.primary, fontSize: 16 }} accessible={false}>{moment(this.state.time).format("HH:mm")}</Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 100, marginTop: 30, marginHorizontal: 15, borderColor: "#168F6A", borderWidth: 0.5 }}>
          <TextInput
            placeholderTextColor={"#b1b1b1"}
            placeholder={"Descrizione sintomo"}
            style={{
              height: 100,
              flex: 1,
              justifyContent: "flex-start",
              textAlignVertical: "top",
              paddingHorizontal: "5%",
            }}
            numberOfLines={5}
            multiline={true}
            value={this.state.notes}
            onChangeText={(e) => {
              this.onChangeNote(e);
            }}
          />
        </View>
        <View
          style={{
            height: 100,
            alignSelf: "flex-end",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 25,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{
              height: 50,
              width: 140,
              borderRadius: 25,
              backgroundColor: "#5c837c",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 14 }}>ANNULLA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onPressConfirm(pathology, current, from)}
            style={{
              height: 50,
              width: 140,
              borderRadius: 25,
              backgroundColor: global.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.state.isLoading ? (
              <ActivityIndicator style={{ justifyContent: "center", alignSelf: "center", flex: 1 }} color={"white"} size="large" />
            ) : (
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                }}
              >
                AGGIUNGI
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ display: "flex",height: '100%', maxHeight: 500, flexDirection: "column", paddingLeft: 10, paddingRight: 10, marginHorizontal: 10 }}>
          <Text style={{ fontSize: 15, color: "#505050", fontWeight: "bold", maxHeight: 100,paddingBottom:6 }}>Sintomi registrati</Text>
          <ScrollView style={{ flex: 1, flexDirection: "column", width: "100%", maxHeight: Dimensions.get("screen").height > 700 ? 450 : 270}}>
            {this.state.symptomsList.length > 0 ? (
              this.state.symptomsList.map((symptom, index) => (
                <View key={index} style={{ flex: 1, color: "#FFFF", minHeight: 50, maxHeight: 80, flexDirection: "row", marginTop: 5,paddingLeft: 15, justifyContent: "center", alignItems: "center", backgroundColor: global.green, borderRadius: 25 }}>
                  <View style={{justifyContent: 'center',alignItems:'center'}}>
                  <TextInput
                    placeholderTextColor={"#b1b1b1"}
                    placeholder={"Data"}
                    style={{
                      width: "100%",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      textAlignVertical: "top",
                      paddingHorizontal: "5%",
                      color: "#FFFF",
                      flex: 1,
                    }}
                    numberOfLines={10}
                    multiline={true}
                    editable={false}
                    value={moment(symptom.regDate).format("DD MMM YYYY")}
                  />
                  <TextInput
                    placeholderTextColor={"#b1b1b1"}
                    placeholder={"Orario"}
                    style={{
                      width: "50%",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      textAlignVertical: "top",
                      paddingHorizontal: "5%",
                      color: "#FFFF",
                      flex: 1,
                    }}
                    numberOfLines={10}
                    multiline={true}
                    editable={false}
                    value={moment(symptom.regTime).format("HH:mm")}
                  />
                  </View>
                  <TextInput
                    placeholderTextColor={"#b1b1b1"}
                    placeholder={"Descrizione"}
                    style={{
                      width: "50%",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      textAlignVertical: "top",
                      paddingHorizontal: "5%",
                      color: "#FFFF",
                      flex: 1,
                    }}
                    numberOfLines={10}
                    multiline={true}
                    editable={false}
                    value={symptom.description}
                  />
                </View>
              ))
            ) : (
              <Text style={{ padding: 10 }}>Non hai ancora aggiunto sintomi per questa patologia</Text>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
