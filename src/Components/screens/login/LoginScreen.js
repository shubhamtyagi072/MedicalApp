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
import {loginApi} from '../../../Actions/loginAction'
import AntDesign from 'react-native-vector-icons/AntDesign';
import initIO from "../../../Actions/initIO";
import BackButton from "../../../common/BackButton";

class LoginScreen extends Component {
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
                "email": this.state.userName,
                "password": this.state.password,
            };

            let type1;

            if (type === "MEDICO") type1 = "doctor";
            else type1 = "patient";
            this.setState({isLoading: true})
            var response = await loginApi(data, type1)
            console.log("func", response)
            if (response && response["status"] === "success") {

                this.setState({isLoading: false})

                console.log('');
                console.log('LOGIN SUCCESSFUL');
                console.log(`User is ${type1} with payload ${JSON.stringify(response)}`);
                console.log('');

                const payload = JSON.stringify(response);
                const patient = response.patient;
                const doctor = response.doctor || response.user;

                const navigation = this.props.navigation;

                if (type1 === "doctor") {
                    await storage.set("Login", payload)
                    this.props.initIO({id: doctor.id, isDoctor: true}, navigation);
                    navigation.navigate("DoctorDashBoardScreen")
                } else {
                    await storage.set("Login", payload)
                    this.props.initIO({id: patient.id, isDoctor: false}, navigation);
                    navigation.navigate("PatientDashBoardScreen");
                }

            } else {
                this.setState({isLoading: false})
                response && response["errors"][0]["msg"] ? alert(response["errors"][0]["msg"]) : alert("Accesso non riuscito, credenziali errate")
            }
        }
    }

    onForgotPress = async (type) => {
      console.log('testing in the login----------------')
      const navigation = this.props.navigation;
        navigation.navigate("ForgotPassword",{type: type});
    }

    validation = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.userName.length) {
            alert(constant.errName)
            return false
        } else if (reg.test(this.state.userName) === false) {
            alert(constant.errValidEmail)
            return false
        } else if (!this.state.password) {
            alert(constant.errPassword)
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
    onPassChangeTxt = (value) => {

        this.setState({
            password: value
        })

    }

    onDoctorClick = () => {
        this.setState({
            radioButtonDoc: !this.state.radioButtonDoc,
            radioButtonPat: false
        })
    }
    onPateintClick = () => {
        this.setState({
            radioButtonPat: !this.state.radioButtonPat,
            radioButtonDoc: false
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
                            text="Login"
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

                        <View style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderColor: type === "MEDICO" ? global.secondary : global.primary,
                            height: 50,
                            borderRadius: 50 / 2,
                            color: type === "MEDICO" ? global.secondary : global.primary,
                            alignItems: 'center',
                            flex: 1,
                            marginTop: 20
                        }}>
                            <Entypo name="lock" color={type === "MEDICO" ? global.secondary : global.primary} size={20}
                                    style={{marginLeft: 20}}/>
                            <TextinputCommon
                                placeHolder={"PASSWORD"}
                                placeholderTextColor={type === "MEDICO" ? global.secondary : global.primary}
                                isPasswordType={true}
                                value={this.state.password}
                                color={type === "MEDICO" ? global.secondary : global.primary}
                                onChangeTxt={(e) => {
                                    this.onPassChangeTxt(e)
                                }}
                                editable={!this.state.isLoading}
                            />
                        </View>

                        <View style={styles.forgotPasswordStyle}>
                    <TouchableOpacity

                        onPress={() => {
                            this.onForgotPress(type)
                        }}>
                        <Text style={{color: type === "MEDICO" ? global.secondary : global.primary, paddingBottom: 10}}>Password dimenticata?</Text>
                    </TouchableOpacity>
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

const mapStateToProps = (state, action) => {
    let LoginData = ""
    let Loginerror = ""
    let LoginIsLoding = ""
    console.log("state", state)
    if (state && state.Login) {
        LoginData = state.Login.success
        Loginerror = state.Login.error,
            LoginIsLoding = state.Login.isLoading
    }
    return {
        LoginData,
        Loginerror,
        LoginIsLoding
    }
}


const mapDispatchToProps = dispatch => {
    return {
        LoginApi: (data, type) => dispatch(loginApi(data, type)),
        initIO: (data, navigation) => dispatch(initIO(data, navigation)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);
