/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, Switch, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from './styles';
import TextCommon from '../../../../Common/TextCommon'
import global from "../../../../Common/global";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextinputCommon from "../../../../Common/TextinputCommon";
import storage from "../../../../../utils/storage";
import { getPatTestList } from "../../../../../Actions/getPatTestList";
import { question } from "./questionFile";
import RoundedButton from "../../../../Common/RoundedButton";


export default class questionAns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      data: [],
      questions: [],
      answer: [1, 2, 3, 4, 5],
      currentIndex: 0,
      render: false,
      totalQuestion: {
        cat: [
          //{ question_one: "Esempio: Sono molto contento", question_two: "Sono molto triste", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }] },
          {
            question_one: "Non tossisco mai", question_two: "Tossisco sempre", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }]
          },
          {
            question_one: "Il mio petto è completamente libero da catarro (muco)", question_two: "Il mio petto è tutto pieno di catarro (muco)", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }]
          },
          {
            question_one: "Non avverto alcuna sensazione di costrizione al petto", question_two: "Avverto una forte sensazione di costrizione al petto", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }]
          },
          {
            question_one: "Quando cammino in salita o salgo una rampa di scale non avverto mancanza di fiato", question_two: "Quando cammino in salita o salgo una rampa di scale avverto una forte mancanza di fiato", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }]
          },
          { question_one: "Non avverto limitazioni nello svolgere qualsiasi attività in  casa", question_two: "Avverto gravi limitazioni nello svolgere qualsiasi attività in casa", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }] },
          {
            question_one: "Mi sento tranquillo ad uscire di casa nonostante la mia malattia polmonare", question_two: "Non mi sento affatto tranquillo ad uscire di casa a causa della mia malattia polmonare", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }]
          },
          {
            question_one: "Dormo profondamente", question_two: "Non riesco a dormire profondamente a causa della mia malattia polmonare", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }]
          },
          { question_one: "Ho molta energia ", question_two: "Non ho nessuna energia", user_ans: "", answer: [{ option: "0", isSelected: false }, { option: "1", isSelected: false }, { option: "2", isSelected: false }, { option: "3", isSelected: false }, { option: "4", isSelected: false }, { option: "5", isSelected: false }] },
        ],
        ANMCO: [

          {
            description: "1. Nel corso delle sue abituali attività, le è mai capitato di avere negli ultimi 3 mesi una sensazione di oppressione al torace, dolore al petto o affanno:",
            questions: [
              {
                question: "Quando si vestiva o faceva il bagno", options: [{ value: "NO", isSelected: false, point: 0 }, { value: "SI", isSelected: false, point: 3 }]
              },
              {
                question: "Mentre camminava o faceva piccole attività domestiche ", options: [{ value: "NO", isSelected: false, point: 0 }, { value: "SI", isSelected: false, point: 2 }]
              },
              {
                question: "Solo se saliva le scale, o portava pesi, o camminava a passo veloce", options: [{ value: "NO", isSelected: false, point: 0 }, { value: "SI", isSelected: false, point: 1 }]
              }
            ]
          },
          {
            description: "2. Nell’ultimo mese la sensazione di oppressione al torace, dolore al petto o affanno:",
            questions: [
              {
                question: "Sono state più frequenti che in passato", options: [{ value: "NO", isSelected: false, point: 0 }, { value: "SI", isSelected: false, point: 2 }]
              },
              {
                question: "I disturbi si sono presentati più volte nelle ultime due settimane", options: [{ value: "NO", isSelected: false, point: 0 }, { value: "SI", isSelected: false, point: 3 }]
              }
            ]
          },
          {
            description: "3.",
            questions: [
              {
                question: "Ha dovuto assumere le medicine sotto la lingua a causa di questi disturbi?", options: [{ value: "NO", isSelected: false, point: 0 }, { value: "SI", isSelected: false, point: 2 }]
              }
            ]
          },
          {
            description: "4.",
            questions: [
              {
                question: "Ha avuto necessità di assumere queste medicine nelle ultime due settimane?", options: [{ value: "NO", isSelected: false, point: 0 }, { value: "SI", isSelected: false, point: 3 }]
              }
            ]
          }

        ]
      }
    };
    console.log("Call")
  }

  componentDidMount() {
    const { detailsObjc } = this.props.navigation.state.params

    this.setState({
      questions: detailsObjc.test_assigned == "CAT TEST" ? this.state.totalQuestion.cat : this.state.totalQuestion.ANMCO,
      render: !this.state.render
    })

  }
  componentWillUnmount = () => {

  }
  getPatientTestistApiCAll = async () => {

    const res = JSON.parse(await this.getUser_Detail())
    let data = {
      "patient_id": parseInt(res.patient.id)
    }
    const response = await getPatTestList(data)


    this.setState({
      data: response.testAssociation
    })
  }
  toggleSwitch = () => {
    this.setState({
      isEnabled: !this.state.isEnabled
    })
  }
  getUser_Detail = async () => {
    return await storage.get('Login')
  }
  onOptionPress = (index) => {
    var questions = this.state.questions

    var oneQuestion = questions[this.state.currentIndex]
    for (var i = 0; i < oneQuestion.answer.length; i++) {

      if (index == i) {
        oneQuestion.answer[i].isSelected = !oneQuestion.answer[i].isSelected
      } else {
        oneQuestion.answer[i].isSelected = false
      }
    }

    questions[this.state.currentIndex] = oneQuestion

    this.setState({
      questions: questions
    })

  }
  onButtonPress = (detailsObjc) => {
    if (this.state.currentIndex < (this.state.questions.length - 1)) {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      })
    } else {
      var totalScore = 0
      var questions = this.state.questions

      var QuestionsArray = questions
      for (var i = 0; i < QuestionsArray.length; i++) {
        for (var j = 0; j < QuestionsArray[i].answer.length; j++) {

          if (QuestionsArray[i].answer[j].isSelected) {

            totalScore = totalScore + parseInt(QuestionsArray[i].answer[j].option)
          }
        }

      }

      this.props.navigation.navigate("score", { "score": totalScore, "detailsObjc": detailsObjc })
    }

  }
  onButtonBackPress = () => {
    if (this.state.currentIndex != 0) {
      this.setState({
        currentIndex: this.state.currentIndex - 1
      })
    }

  }
  onOptionPressType2 = (mainIndex, subIndex, ansIndex) => {
    var questions = this.state.questions

    var arrayQuestion = questions[mainIndex].questions

    var selectedQus = arrayQuestion[subIndex]

    for (var i = 0; i < selectedQus.options.length; i++) {

      if (ansIndex == i) {
        selectedQus.options[i].isSelected = !selectedQus.options[i].isSelected
      } else {
        selectedQus.options[i].isSelected = false
      }
    }
    arrayQuestion[subIndex] = selectedQus
    questions[mainIndex].questions = arrayQuestion
    console.log("qF", questions)
    this.setState({
      questions: questions
    })


  }
  onFineBtnPress = (detailsObjc) => {
    var totalScore = 0
    var questions = this.state.questions

    var QuestionsArray = questions
    for (var k = 0; k < QuestionsArray.length; k++) {
      console.log("1", QuestionsArray[k].questions)
      for (var i = 0; i < QuestionsArray[k].questions.length; i++) {
        console.log("2")
        for (var j = 0; j < QuestionsArray[k].questions[i].options.length; j++) {
          console.log("3")
          if (QuestionsArray[k].questions[i].options[j].isSelected) {
            console.log("123", QuestionsArray[k].questions[i].options[j].point)
            totalScore = totalScore + parseInt(QuestionsArray[k].questions[i].options[j].point)
          }
        }
      }
    }
    console.log("score", totalScore)
    this.props.navigation.navigate("score", { "score": totalScore, "detailsObjc": detailsObjc })
  }


  render() {
    const { detailsObjc } = this.props.navigation.state.params
    console.log("obj", detailsObjc.test_assigned)
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />


        <View style={styles.topHeaderView}>

          <Feather name="menu" color="white" size={25} style={{ marginTop: -10, marginLeft: 10 }} onPress={() => { this.props.navigation.openDrawer() }} />
          {/* Registrazione */}
          <TextCommon
            text={detailsObjc.test_assigned}
            color={"#FFFFFF"}
            textAlign={"center"}
            fontSize={global.fontSize_17}
            fontWeight={"600"}
            textAlign={"center"}
            fontFamily={"Montserrat-Bold"}
          />
          <AntDesign onPress={() => { this.props.navigation.goBack() }} name="left" color="white" size={25} style={{ marginRight: 10 }} />

        </View>
        <View style={{ height: 16 }} />
        <ScrollView style={{ flex: 1, marginBottom: 10 }} >
          {
            detailsObjc && detailsObjc.test_assigned ? detailsObjc.test_assigned == "CAT TEST" ? <View style={{ flex: 1, marginHorizontal: 20, marginTop: 15 }} >
              <TextCommon
                text={this.state.questions && this.state.questions[this.state.currentIndex] ? this.state.questions[this.state.currentIndex].question_one : ""}
                fontSize={global.fontSize_17}
                textAlign={"center"}
                fontFamily={"Montserrat-Regular"}
              />
              <View style={{
                marginVertical: 20, justifyContent: 'center',
                alignItems: 'center'
              }} >
                {
                  this.state.questions && this.state.questions[this.state.currentIndex] && this.state.questions[this.state.currentIndex].answer && this.state.questions[this.state.currentIndex].answer.map((item, index) => {
                    return (
                      <TouchableOpacity onPress={() => { this.onOptionPress(index) }} key={index} style={{ width: '50%', height: 40, borderRadius: 20, borderWidth: 1, borderColor: global.primary, marginVertical: 5, justifyContent: 'center', backgroundColor: item.isSelected ? global.primary : "white" }} >
                        <TextCommon
                          text={item.option}
                          fontSize={global.fontSize_17}
                          textAlign={"center"}
                          fontFamily={"Montserrat-Regular"}
                          color={item.isSelected ? "white" : global.primary}
                        />
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
              <TextCommon
                text={this.state.questions && this.state.questions[this.state.currentIndex] ? this.state.questions[this.state.currentIndex].question_two : ""}
                fontSize={global.fontSize_17}
                textAlign={"center"}
                fontFamily={"Montserrat-Regular"}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, marginTop: 30 }} >

                {
                  this.state.currentIndex != 0 ?
                    <View style={{ width: '60%' }}>
                      <RoundedButton
                        btnText={"INDIETRO"}
                        backgroundColor={global.green}
                        onPress={() => { this.onButtonBackPress() }}
                      />
                    </View> : <></>
                }
                <View style={{ width: '60%' }}>
                  <RoundedButton
                    btnText={this.state.currentIndex == (this.state.questions.length - 1) ? "CHIUDI" : "AVANTI"}
                    backgroundColor={global.green}
                    onPress={() => { this.onButtonPress(detailsObjc) }}
                  />
                </View>

              </View>
            </View> : <View>
                <ScrollView>
                  {
                    this.state.questions.map((question, index) => {
                      return (
                        <View style={{ marginHorizontal: 20 }} key={index} >
                          <View style={{ marginTop: 15 }} />
                          <TextCommon
                            text={question.description}
                            fontSize={global.fontSize_17}

                            fontFamily={"Montserrat-Bold"}
                          />
                          {
                            question.questions.map((questionObjc, insideIndex) => {
                              return (
                                <View key={insideIndex} style={{ marginTop: 25 }} >
                                  <TextCommon
                                    text={questionObjc.question}
                                    fontSize={global.fontSize_17}

                                    fontFamily={"Montserrat-Regular"}
                                  />
                                  <View style={{ flexDirection: 'row' }} >


                                    {
                                      questionObjc.options.map((answerObjc, ansIndex) => {
                                        return (
                                          <View style={{ justifyContent: 'space-around', flex: 1, marginTop: 5 }} key={ansIndex} >
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                              <TextCommon
                                                text={answerObjc.value}
                                                fontSize={global.fontSize_17}
                                                textAlign={"center"}
                                                fontFamily={"Montserrat-Regular"}
                                              />
                                              <TouchableOpacity onPress={() => { this.onOptionPressType2(index, insideIndex, ansIndex) }} style={{ height: 30, width: 30, borderRadius: 5, borderWidth: 1, borderColor: global.primary, marginLeft: 5, alignItems: 'center', justifyContent: 'center' }} >
                                                <View style={{ height: 20, width: 20, backgroundColor: answerObjc.isSelected ? global.primary : 'rgba(1,1,1,0)', borderRadius: 5 }} >

                                                </View>
                                              </TouchableOpacity>
                                            </View>
                                          </View>
                                        )

                                      })
                                    }
                                  </View>
                                </View>
                              )
                            })
                          }

                        </View>
                      )
                    })
                  }
                  <View style={{ marginTop: 20 }} >
                    <RoundedButton
                      btnText={"FINE"}
                      backgroundColor={global.green}
                      onPress={() => { this.onFineBtnPress(detailsObjc) }}
                    />
                  </View>
                </ScrollView>
              </View>
              : <></>
          }
        </ScrollView>


      </SafeAreaView >
    );
  }
}


