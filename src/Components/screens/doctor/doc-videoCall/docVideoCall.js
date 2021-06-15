/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import styles from './styles'

import global from "../../../Common/global"

import MI from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import VideoRoom from "../../videoRoom/VideoRoom";


export class docVideoCallScreen extends Component {
    constructor(props) {
        super(props);

    }



    render() {
        if (this.props.RegisterIsLoding) {
            return <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, }} color={'blue'} size="large" />
        }
        const data = new Date()
        console.log("data", data)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />

                <View style={{ position: 'absolute', height: '20%', width: '30%', borderRadius: 5, borderWidth: 3, borderColor: global.secondary, marginLeft: 10, marginTop: 10, zIndex: 1 }}>
                </View>

                <View style={{ flex: 1, backgroundColor: 'white' }} >
                    <VideoRoom />
                </View>

                <View style={styles.bottomView}>
                    <View style={styles.phoneView}>
                        <MI name="phone-hangup" size={40} color={global.secondary} />
                    </View>
                </View>


            </SafeAreaView>
        );
    }
}


