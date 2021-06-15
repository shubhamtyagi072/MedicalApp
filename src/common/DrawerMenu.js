import React, {Component, useEffect, useState} from "react";
import {
    View,
    Text,
    ImageBackground,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from "react-native";


import {StackActions, NavigationActions} from "react-navigation";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import {LoginButton, LoginManager} from 'react-native-fbsdk';
import {useDispatch} from "react-redux";
import ioDisconnect from "../Actions/ioDisconnect";

const DrawerMenu = (props) => {
    const [starCount, setStarCount] = useState(4);
    const [days, setDays] = useState(null);
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const _getCurrentUser = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            setUserInfo(userInfo);
            setError(null);
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: "Home"
                    })
                ]
            });
            props.navigation.dispatch(resetAction);

        } catch (error) {
            const errorMessage = error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
            setError(new Error(errorMessage));
        }
    }

    useEffect(() => {
        _getCurrentUser();
    }, [])

    const _signOut = async () => {
        dispatch(ioDisconnect());
        LoginManager.logOut();
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "Login"
                })
            ]
        });
        props.navigation.dispatch(resetAction);
    };

    return (
        <View style={{flex: 1}}>
            <View style={{height: 80}}/>
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Home")}
                style={drawerStyle.inViewStyle}>
                <Text style={drawerStyle.TextStyle}>Home</Text>
            </TouchableOpacity>
            <View style={drawerStyle.dividerView}/>
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Profile")}
                style={drawerStyle.inViewStyle}>
                <Text style={drawerStyle.TextStyle}>Profile</Text>
            </TouchableOpacity>
            <View style={drawerStyle.dividerView}/>
            <TouchableOpacity
                onPress={() => props.navigation.navigate("ChangePasswordScreen")}
                style={drawerStyle.inViewStyle}>
                <Text style={drawerStyle.TextStyle}>Change Password</Text>
            </TouchableOpacity>
            <View style={drawerStyle.dividerView}/>
            <TouchableOpacity style={drawerStyle.logoutView} onPress={_signOut}>
                <Text style={drawerStyle.logoutTxt}>Logout</Text>
            </TouchableOpacity>

        </View>
    );
}

const drawerStyle = StyleSheet.create({

    inViewStyle: {
        marginTop: 15,
        marginLeft: 20
    },
    TextStyle: {
        fontSize: 18
    },
    logoutTxt: {
        fontSize: 18,
        color: "red"
    },
    dividerView: {
        height: 0.5,
        marginTop: 12,
        width: "100%",
        backgroundColor: "black",
        opacity: 0.3
    },
    logoutView: {
        position: "absolute",
        bottom: 30,
        marginLeft: 20
    }
});

export default DrawerMenu;
