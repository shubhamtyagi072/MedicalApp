import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, ActivityIndicator, ImageBackground } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import storage from '@react-native-firebase/storage';
var ImagePicker = require('react-native-image-picker')
import * as Progress from 'react-native-progress';
import ImagePreview from 'react-native-image-preview';
import TextCommon from "../../../Common/TextCommon";
import RoundedButton from "../../../Common/RoundedButton";
import global from "../../../Common/global";
import { registerApi } from "../../../../Actions/registerAction";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

import { GiftedChat, Bubble, Send, Actions } from "react-native-gifted-chat";
import { getChatMessage, sendChatMessage } from "../../../../Actions/chatAction";
import CustomeHeader from "../../../Common/CustomeHeader";
import store from "../../../../utils/storage";
import Entypo from 'react-native-vector-icons/Entypo'
import DocumentPicker from 'react-native-document-picker';
var RNFS = require("react-native-fs");
var RNGRP = require('react-native-get-real-path');
import RNFetchBlob from 'react-native-fetch-blob'
//import vector icons
import DatePicker from "react-native-datepicker";
import Icon from "react-native-vector-icons/Feather";
import { images } from "../../../../Image";
import { TextInput } from "react-native-gesture-handler";
import { PermissionsAndroid } from 'react-native';
import {
  check,
  request,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';

class chatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath: {},
      image: null,
      uploading: false,
      transferred: 0,
      fireBaseUrl: '',
      messageType: null,
      currentUserDetails: {},
      isLoading: false,
      docFileName: ''
    }
    this.state = { messages: [] };
    this.onSend = this.onSend.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSend = this.renderSend.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderActions = this.renderActions.bind(this)
    this.selectFile = this.selectFile.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.checkMultiplePermissions = this.checkMultiplePermissions.bind(this);
  }

  refreshChat = () => {
    const msg = this.callChatAPI();
    console.log(msg);
  };

  componentDidMount() {
    //setting up an interval to refresh the chat
    const intervalRef = setInterval(this.refreshChat, 1000);
    this.setState({
      intervalRef: intervalRef,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalRef);
  }

  getUser_Detail = async () => {
    var x = await store.get('Login')
    this.setState({ currentUserDetails: x })
    return await store.get("Login");
  };

  checkMultiplePermissions = async () => {
    let isPermissionGranted = false;
    try {
      if (Platform.OS === 'android') {
        const permissions = [PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE];
        const statuses = await requestMultiple(permissions);
        for (var index in permissions) {
          if (statuses[permissions[index]] === RESULTS.GRANTED) {
            isPermissionGranted = true;
          } else {
            isPermissionGranted = false;
            break;
          }
        }
      } else {
        return true;
      }
    } catch (err) {
      alert(err);
      return false;
    }
    return isPermissionGranted;
  };

  async callChatAPI() {
    const item = this.props.navigation.getParam("item");
    console.log("Doc_data", item);

    const userData = JSON.parse(await this.getUser_Detail());
    console.log("userData", item);

    let data = {
      doctor_id: parseInt(item.ID),
      patient_id: parseInt(userData.patient.id),
    };

    // sender is 1 and receiver is 2.

    var response = await getChatMessage(data);
    console.log("func", response);
    if (response && response["status"] == "success") {
      const msg = response["messageItem"];

      let newMsgArr = msg.map((res) => {
        res.date = res.date === "some date" ? 1234567890 : res.date;
        console.log("res date", res.date);
        const chatID = res.sender_id === userData.patient.id ? "1" : "2";
        const image = res.sender_id === userData.patient.id ? images.chatPat : images.chatDoc;

        // if you are doctor
        let data = {
          _id: res.id,
          text: res.type == 2 ? res.imageUrl : res.message_content,
          createdAt: new Date(parseInt(res.date)),
          user: {
            _id: parseInt(chatID),
            //name: 'React Native',
            //avatar: 'https://facebook.github.io/react/img/logo_og.png',
            avatar: image
          },
          image: res.type == 1 ? res.imageUrl : '',
          //pdf:res.type==2?res.imageUrl:''
        }
        return data
      })

      if (newMsgArr.length > 0) {
        this.setState({
          messages: newMsgArr.reverse(),
        });
      }
    }
  }


  async onSend(messages = []) {
    const time = this.timeMil();
    const item = this.props.navigation.getParam("item");
    console.log("itemss", item);
    const res = JSON.parse(await this.getUser_Detail());

    let data = {
      "type": 0,
      "imageUrl": '',
      "message_content": messages[0].text,
      "doctor_id": parseInt(item.ID),
      "patient_id": parseInt(res.patient.id),
      "date": `${time}`,
      "sender_id": parseInt(res.patient.id)
    }
    /*let data = {
      message_content: messages[0].text,
      doctor_id: parseInt(item.ID),
      patient_id: parseInt(res.patient.id),
      date: `${time}`,
      sender_id: parseInt(res.patient.id),
    };*/

    var response = sendChatMessage(data);
    if (response) {
      this.setState({ fireBaseUrl: '' });
    }
    console.log("text", messages[0].text);

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  selectFile = async () => {
    var checkPermission = await this.checkMultiplePermissions();
    if (checkPermission) {
      var options = {
        title: 'Select Image',
        noData: false,
        customButtons: [
          {
            name: 'customOptionKey',
            title: 'Choose file from Custom Option'
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchImageLibrary(options, res => {
        if (res.didCancel) {
          alert('Cancelled');
        } else if (res.error) {
          alert('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          alert('User tapped', res.customButton);
          alert(res.customButton);
        } else {
          let source = res.uri
          this.setState({
            image: res.uri,
            resourcePath: res,
          }, () => {
            const result = this.uploadImage()

          });
        }
      });
    }
  };

  selectDocument = async () => {
    const checkPermission = await this.checkMultiplePermissions();
    if (checkPermission) {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf],
        });
        if (res) {
          this.setState({ image: res.uri, docFileName: res.name }, () => {
            const result = this.uploadDoc()
          })
        }
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size
        );
        //alert(res.uri)
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
    }
  };

  renderActions(props) {
    return (
      <Actions
        {...props}
        containerStyle={{
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 4,
          marginRight: 4,
          marginBottom: 0,
        }}
        icon={() => (
          <AntDesign name="pluscircle" color={global.green} size={32} />
        )}
        options={{
          'Choose From Gallery': () => {
            const x = this.selectFile()
            console.log('Choose From Library');
          },
          'Choose Document': () => {
            const x = this.selectDocument()
            console.log('Choose From Library');
          },
          Cancel: () => {
            console.log('Cancel');
          },
        }}
        optionTintColor="#222B45"
      />
    )
  };

  renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Ionicons name="send" size={32} color={global.green} />
          {/* <IconButton icon='send-circle' size={32} color='#6646ee' /> */}
        </View>
      </Send>
    );
  }

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  renderBubble(props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: global.green,
          },
          left: {
            backgroundColor: global.skyBlue,
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
          left: {
            color: "#fff",
          },
        }}
      />
    );
  }

  timeMil() {
    var date = new Date();
    var timeMil = date.getTime();

    return timeMil;
  }

  uploadImage = async () => {
         const time = this.timeMil()
         this.setState({ isLoading: true })
       
            var task;
            try {
                task = storage()
                    .ref(`${time}`)
                    .putFile(this.state.image)
        // set progress state
        task.on('state_changed', snapshot => {
          this.setState({
            transferred: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
          }, () => [
            //alert('tesing in the task---------------------------')
          ]);
        },
          null,
          () => {
            const ref = storage().ref('/' + `${time}`);
            ref.getDownloadURL()
              .then(url => {
                this.setState({ image: null });
                const item = this.props.navigation.getParam('item');
                const res = JSON.parse(this.state.currentUserDetails)
                let data = {
                  "type": 1,
                  "imageUrl": url,
                  "message_content": '',
                  "doctor_id": parseInt(item.ID),
                  "patient_id": parseInt(res.patient.id),
                  "date": `${time}`,
                  "sender_id": parseInt(res.patient.id)
                }
                var response = sendChatMessage(data)
                if (response) {
                  this.setState({ fireBaseUrl: '' });
                }
                var messages = [];
                this.setState((previousState) => {
                  this.setState({ isLoading: false })
                  return {
                    messages: GiftedChat.append(previousState.messages, messages),
                  };
                });
              })
              .catch(e => {
                console.log(e);
                this.setState({ isLoading: false })
              })
          })
      }
      catch (e) {
        this.setState({ isLoading: false })
        console.log(e)
      }
    
    return true;
  };


  uploadDoc = async () => {
    this.setState({ isLoading: true })
       
                    const time = this.timeMil()
                    //const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                    var task;
                    try {
                        task = storage()
                            .ref(`${time}`)
                            .putFile(this.state.image)
          // set progress state
          task.on('state_changed', snapshot => {
            this.setState({
              transferred: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            }, () => [
              //alert('tesing in the task---------------------------')
            ]);
          },
            null,
            () => {
              const ref = storage().ref('/' + `${time}`);
              ref.getDownloadURL()
                .then(url => {
                  this.setState({ image: null });
                  const time = this.timeMil()
                  const item = this.props.navigation.getParam('item');
                  const res = JSON.parse(this.state.currentUserDetails)
                  let data = {
                    "type": 2,
                    "imageUrl": url,
                    "message_content": '',
                    "doctor_id": parseInt(item.ID),
                    "patient_id": parseInt(res.patient.id),
                    "date": `${time}`,
                    "sender_id": parseInt(res.patient.id)
                  }
                  var response = sendChatMessage(data)
                  if (response) {
                    this.setState({ docFileName: '' })
                    this.setState({ fireBaseUrl: '' });
                  }
                  var messages = [];
                  this.setState((previousState) => {
                    this.setState({ isLoading: false })
                    return {
                      messages: GiftedChat.append(previousState.messages, messages),
                    };
                  });

                })
                .catch(e => {
                  this.setState({ isLoading: false })
                  onsole.log(e);
                })
            })
        }
        catch (e) {
          this.setState({ isLoading: false })
          console.log(e)
        }
  
    return true;
  };

  render() {
    if (this.props.RegisterIsLoding) {
      return <ActivityIndicator style={{ justifyContent: "center", alignSelf: "center", flex: 1 }} color={"blue"} size="large" />;
    }

    const { messages } = this.state;
    const item = this.props.navigation.getParam("item");
    const data = new Date();
    console.log("data", data);
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <CustomeHeader backgroundColor={global.primary} text={`${item.name}`} navigation={this.props.navigation} />

        <ImageBackground style={{ flex: 1 }} source={images.chatBg}>
          <GiftedChat
            messages={messages}
            onSend={this.onSend}
            user={{
              _id: 1,
              avatar: images.chatPat,
            }}
            renderBubble={this.renderBubble}
            renderSend={this.renderSend}
            renderLoading={this.renderLoading}
            renderActions={this.renderActions}
            showUserAvatar
            alwaysShowSend
          // placeholder='Type your message here...'
          />
        </ImageBackground>
        {this.state.isLoading && <View style={styles.loading}>
          <ActivityIndicator color='white' size="large" /></View>}
        {/* <View style={styles.bottomView} >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 20 }}>
                        <TextInput style={{ width: '70%', marginLeft: 30 }} />
                        <Ionicons name="send" size={25} color={global.secondary} />
                    </View>
                </View> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(chatScreen);
