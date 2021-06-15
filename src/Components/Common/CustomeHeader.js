import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import global from "./global";
import TextCommon from './TextCommon'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'


export default class CustomeHeader extends Component {


    render() {
        const { backgroundColor, text, onDrawerPress, onBackPress, fontFamily = fontFamily ? fontFamily : "Poppins-Medium", navigation, backArrowHide } = this.props

        return (
            <View style={{
                height: 70,
                backgroundColor: backgroundColor,
                display:'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

                <Feather name="menu" color="white" size={25} style={{ marginLeft: 10 }} onPress={() => { navigation.openDrawer() }} />
                {/* Registrazione */}
                <TextCommon
                    text={text}
                    color={"#FFFFFF"}
                    textAlign={"center"}
                    fontSize={global.fontSize_17}
                    fontWeight={"600"}
                    textAlign={"center"}
                    fontFamily={"Montserrat-Bold"}
                    maxWidth={'80%'}
                />

                <AntDesign name="left" color="white" size={25} onPress={backArrowHide ? () => { console.log("hide") } : () => { navigation.goBack() }} style={backArrowHide ? { opacity: 0 } : { marginRight: 10 }} />

            </View>
        );


    }
}
