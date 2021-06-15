/* @flow */

import React, {Component, useEffect} from "react";
import {View, Text, StyleSheet, Image, SafeAreaView, StatusBar} from "react-native";
import {connect} from "react-redux";
import {StackActions, NavigationActions} from "react-navigation";
import styles from './styles';
import TextCommon from '../../Common/TextCommon';
import storage from "../../../utils/storage";
import {useDispatch} from "react-redux";
import initIO from "../../../Actions/initIO";
//import medstage from "../../../../assets/medstage.png";
import lusofarmarco from "../../../../assets/lusofarmaco.png";
import medstage from "../../../../assets/medstage_splash.png";

const SplashScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const getCurrentLoggedUser = async () => {
        //getting the local storage to check if a user is already logged in
        console.log("*******LOGIN TOKEN");
          
        await storage.get("Login").then((loggedUser) => {
            //getting the parsed JSON
            if (loggedUser) {
                const userData = JSON.parse(loggedUser);
                const patient = userData.patient;
                const doctor = userData.doctor || userData.user;
                if (patient) {
                    dispatch(initIO({id: patient.id, isDoctor: false}, navigation));
                    navigation.navigate('PatientDashBoardScreen');
                } else {
                    dispatch(initIO({id: doctor.id, isDoctor: true}, navigation));
                    navigation.navigate('DoctorDashBoardScreen');
                }
            } else {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: "WelcomeScreen"
                        })
                    ]
                });
                navigation.dispatch(resetAction);
            }
        });
    }

     useEffect(() => {
                 console.log("navigation",navigation)


              //  navigation.navigate('PatientDashBoardScreen');

        setTimeout(() => {
            getCurrentLoggedUser();
        }, 1800);
     }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <View/>
            {/* center image view */}
            <View style={styles.imageMainView}>
                <Image source={require("../../../Image/splash_logo.png",)} style={{height: 200, width: 200}}/>
            </View>

            <View style={styles.bottomView}>
                <Image source={medstage} />
                {/*<TextCommon
                    text={"Con il supporto non condizionante di"}
                    color={"white"}
                    fontFamily={"Poppins-Medium"}
                />
                <View style={{height: 10}}/>
                <Image source={lusofarmarco} />
            </View>

            <View style={styles.commonImageStyle}>
                <Image source={medStageFooter}/>*/}
            </View>
        </SafeAreaView>
    );
}

export default SplashScreen;
