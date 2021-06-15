import React from "react";
import {View, Image, SafeAreaView, StatusBar} from "react-native";
import styles from './styles';
import TextCommon from '../../Common/TextCommon'
import RoundedButton from '../../Common/RoundedButton'
import global from "../../Common/global";
import BackButton from "../../../common/BackButton";

const RegisteredScreen = ({navigation}) => {
    const type = navigation.state.params.type;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"/>

            <BackButton navigation={navigation} />

            <View style={styles.topHeaderView}>
                <View style={{height: '15%'}}/>
                <TextCommon
                    text={type === "register" ? "Registrazione" : "Login"}
                    color="#FFFFFF"
                    textAlign="center"
                    fontSize={global.fontSize_17}
                    fontWeight={"600"}
                    fontFamily={"Montserrat-Bold"}
                />
                <View style={{height: 16}}/>
                <View style={styles.imageMainView}>
                    <Image source={require("../../../Image/splash_logo.png",)}
                           style={{height: 150, width: 150, resizeMode: 'contain'}}/>
                </View>

            </View>

            <View style={styles.buttonPadding}>
                <View style={{height: 58}}/>

                <RoundedButton
                    btnText={"MEDICO"}
                    backgroundColor={global.darkred}
                    onPress={() => navigation.navigate(type === "register" ? "DoctorRegisterScreen" : "Login", {type: "MEDICO"})}
                />

                <View style={{height: 22}}/>

                <RoundedButton
                    btnText={"PAZIENTE"}
                    onPress={() => navigation.navigate(type === "register" ? "PatientRegisterScreen" : "Login", {type: "PAZIENTE"})}
                />
            </View>

            <View style={styles.commonImageStyle}>

                <Image source={require("../../../Image/common_icon.png",)}/>
            </View>

        </SafeAreaView>
    );
};

export default RegisteredScreen;
