/* @flow */

import React, { Component } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import global from "../../../../../Common/global";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import styles from "./styles";
import { getSymptomsByPathologyId } from "../../../../../../Actions/getSymptomsByPathologyId";
import moment from "moment";
import "moment/locale/it";
import CustomeHeader from "../../../../../Common/CustomeHeader";


moment.locale("it");

export default class docPatClinicThird extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathology: null,
      current: null,
      from: null,
      showDate: false,
      showDateModal: false,
      date: moment(),
      yearDate: moment(),
      showDate1: false,
      notes: "",
      isLoading: false,
      symptomsList: [],
      showFirstSinthompsModal: false,
      firstPathologiesDate: moment(),
    };
  }

  getAllSymptoms = async (pathology, current) => {
    //get the symptoms associted to a specific pathology 
    if(current){
      console.log("data  to be sent",current)
      //data to be sent to the backend
      let data = {
        pathology_id: current.pathology_id
      }
      const response = await getSymptomsByPathologyId(data);

      if (response.status === "success") {
        let finalArray = response.symptoms;
        //setting symptoms list from the server
        //Sortig the array of appointments based on the most recent date
        if (Platform.OS === "android") {
          finalArray.sort((a, b) => moment(b.regDate) - moment(a.regDate));
        } else {
          finalArray.sort((a, b) => moment(a.regDate) <= moment(b.regDate));
        }
        //setting symptoms list from the server
        this.setState(
          {
            symptomsList: finalArray,
         }
        )
      }
    }
  }

  componentDidMount = async () => {
    
    const { pathology, current, from } = this.props.navigation.state.params;
    console.log("PATHOLOGY",pathology)
    console.log("PATHOLOGY",current)
    this.getAllSymptoms(pathology,current);
    this.setState({
      pathology,
      current,
      from,
      date: current ? moment(current.recent_pathology_date) : moment(),
      notes: current ? current.description : "",
    });
  };

  onChangeNote = (value) => {
    this.setState({
      notes: value,
    });
  };

  render() {
    const { pathology, current, from } = this.state;
    console.log(pathology, current, from);

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <CustomeHeader backgroundColor={global.secondary}
                               text={"Sintomi e Segni"}
                               navigation={this.props.navigation}/>
        
        <View style={{display:"flex",flex:1,flexDirection:"column",marginHorizontal: 10,marginVertical: 10, justifyContent: "center",alignItems: "flex-start", padding: 10, marginHorizontal:10}}>
        <ScrollView style={{flexDirection:"column", width: '100%'}}>
            {this.state.symptomsList.length > 0 ? this.state.symptomsList.map((symptom) => (
              <View style={{ flex: 1, color: '#FFFF', flexDirection: 'row', height: 80, marginTop: 15, backgroundColor: global.secondary, borderRadius: 25, paddingTop: "1%", }}>
                <TextInput
                  placeholderTextColor={"#b1b1b1"}
                  placeholder={"Data"}
                  style={{
                    width: '50%',
                    maxWidth: '50%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: "center",
                    paddingHorizontal: "5%",
                    paddingTop: "8%",
                    color: '#FFFF',
                  }}
                  numberOfLines={10}
                  multiline={true}
                  editable={false}
                  value={moment(symptom.createdAt).format('DD MMMM YYYY')}
                />
                <TextInput
                  placeholderTextColor={"#b1b1b1"}
                  placeholder={"Descrizione"}
                  style={{
                    width: '50%',
                    maxWidth: '50%',
                    justifyContent: "center",
                    alignItems: "flex-start",
                    textAlignVertical: "top",
                    color: '#FFFF',
                  }}
                  numberOfLines={10}
                  multiline={true}
                  editable={false}
                  value={symptom.description}
                />
            </View>
            )) : <Text style={{padding: 10}}>Il paziente non ha ancora aggiunto sintomi per questa patologia</Text>}
          </ScrollView>
          </View>
      </SafeAreaView>
    );
  }
}
