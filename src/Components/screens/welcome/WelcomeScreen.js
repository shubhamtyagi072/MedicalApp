/* @flow */
import React, {Component} from "react";
import {View, Image, SafeAreaView, StatusBar} from "react-native";
import styles from './styles';
import TextCommon from '../../Common/TextCommon'
import RoundedButton from '../../Common/RoundedButton'
import global from "../../Common/global";
import {images} from "../../../Image";
import lusofarmarco from '../../../../assets/lusofarmaco.png';
import medstage from '../../../../assets/medstage.png';

const WelcomeScreen = ({navigation}) => {
        return (
            <SafeAreaView style={styles.container}>

                <StatusBar barStyle="dark-content"/>

                <View style={styles.topHeaderView}>
                    <View style={{height: '15%'}}/>
                    <TextCommon
                        text={"Benvenuti in"}
                        color={"#FFFFFF"}
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
                        btnText={"PRIMO ACCESSO"}
                        backgroundColor={global.darkred}
                        onPress={() => navigation.navigate("RegisteredScreen", {type: 'register'})}
                    />
                    <View style={{height: 22}}/>
                    <RoundedButton
                        btnText={"ACCEDI"}
                        backgroundColor={global.darkred}
                        onPress={() => navigation.navigate("RegisteredScreen", {type: 'login'})}
                    />
                </View>

                <View style={styles.bottomView}>
                    <Image source={medstage} />
                    <TextCommon
                        text={"Con il supporto non condizionante di"}
                        color={"#6C061F"}
                        fontFamily={"Poppins-Medium"}
                    />
                    <View style={{height: 10}}/>
                    <Image source={lusofarmarco} />
                </View>

                <View style={styles.commonImageStyle}>
                    <Image source={require("../../../Image/common_icon.png")}/>
                </View>

            </SafeAreaView>
        );
};

export default WelcomeScreen;
