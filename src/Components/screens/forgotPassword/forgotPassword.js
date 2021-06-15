import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Switch,
    Alert,
    ActivityIndicator
} from "react-native";
import {connect} from "react-redux";
import {StackActions, NavigationActions} from "react-navigation";
import styles from './styles';
import TextCommon from '../../Common/TextCommon'
import RoundedButton from '../../Common/RoundedButton'
import global from "../../Common/global";
import TextinputCommon from "../../Common/TextinputCommon";
import LoadingScreen from "../../Common/LoadingScreen";

import {constant} from './constant'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {images} from '../../../Image'
import storage from '../../../utils/storage'
import {forgotPasswordApi} from '../../../Actions/forgotPasswordAction'
import AntDesign from 'react-native-vector-icons/AntDesign';
import initIO from "../../../Actions/initIO";
import BackButton from "../../../common/BackButton";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isEnabled: false,
            radioButtonDoc: true,  // 0 = patient, 1 = Doctor
            radioButtonPat: false,  // 0 = patient, 1 = Doctor
            isLoading: false
        };
    }

    onNextPress = async (type) => {
        if (this.validation()) {
            let data = {
                "email": this.state.userName
            };

            let type1;
            if (type === "MEDICO") type1 = "doctor";
            else type1 = "patient";
            this.setState({isLoading: true})
            var response = await forgotPasswordApi(data, type1)
            console.log("func", response)

            if (response && response["status"] === "success") {

                this.setState({isLoading: false})

                console.log('');
                console.log(`User is ${type1} with payload ${JSON.stringify(response)}`);
                console.log('');

                const navigation = this.props.navigation;
                if (type=== "MEDICO") {
                    alert('Password ripristinata correttamente. La nuova password è stata inviata alla tua email.');
                    navigation.navigate("Login",{type:"MEDICO"})
                } else {
                    alert('Password ripristinata correttamente. La nuova password è stata inviata alla tua email.');
                    navigation.navigate("Login", {type: "PAZIENTE"});
                }

            } else {
                this.setState({isLoading: false})
                response && response["errors"][0]["msg"] ? alert(response["errors"][0]["msg"]) : alert("credenziali errate")
            }
        }
    }

    validation = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.userName.length) {
            alert(constant.errName)
            return false
        } else if (reg.test(this.state.userName) === false) {
            alert(constant.errValidEmail)
            return false
        } else {
            return true
        }
    }

    onNameChangeTxt = (value) => {

        this.setState({
            userName: value
        })

    }

    render() {
        const type = this.props.navigation.state.params.type;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content"/>

                <BackButton navigation={this.props.navigation}/>

                <LoadingScreen loading={false}/>

                <View
                    style={type === "MEDICO" ? styles.topHeaderView : [styles.topHeaderView, {backgroundColor: global.primary}]}>
                    <View style={{marginTop: '15%'}}>
                        <TextCommon
                            text="Password dimenticata"
                            color={"#FFFFFF"}
                            textAlign="center"
                            fontSize={global.fontSize_17}
                            fontWeight={"600"}
                            fontFamily="Montserrat-Bold"
                        />

                    </View>

                    <View style={styles.imageMainView}>
                        <Image source={require("../../../Image/splash_logo.png")}
                               style={{height: 150, width: 150, resizeMode: 'contain'}}/>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.buttonPadding}>

                        <View style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderColor: type === "MEDICO" ? global.secondary : global.primary,
                            height: 50,
                            borderRadius: 50 / 2,
                            color: type === "MEDICO" ? global.secondary : global.primary,
                            alignItems: 'center',
                            flex: 1,
                            marginTop: 40
                        }}>
                            <FontAwesome name="user" color={type === "MEDICO" ? global.secondary : global.primary}
                                         size={20} style={{marginLeft: 20}}/>
                            <TextinputCommon
                                placeHolder={"EMAIL"}
                                placeholderTextColor={type === "MEDICO" ? global.secondary : global.primary}
                                secureTextEntry={false}
                                value={this.state.userName}
                                color={type === "MEDICO" ? global.secondary : global.primary}
                                onChangeTxt={(e) => {
                                    this.onNameChangeTxt(e)
                                }}
                                editable={!this.state.isLoading}
                            />
                        </View>

                    </View>

                </ScrollView>

                <View style={styles.commonImageStyle}>
                    <TouchableOpacity
                        style={type === "MEDICO" ? styles.buttonStyle : [styles.buttonStyle, {backgroundColor: global.primary}]}
                        onPress={() => {
                            this.onNextPress(type)
                        }}>
                        {this.state.isLoading ?
                            <ActivityIndicator style={{justifyContent: 'center', alignSelf: 'center', flex: 1,}}
                                               color={"white"} size="small"/>
                            : <AntDesign size={20} name="right" color="white"/>}
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        );
    }
}
export default ForgotPassword;
