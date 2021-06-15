import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import global from "./global";
import TextCommon from './TextCommon'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

export default class CustomeBottomBar extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { backgroundColor, activeIndex, fontFamily = fontFamily ? fontFamily : "Poppins-Medium", navigation, onBtnOnePress, onBtnTwoPress, onBtnThreePress, onBtnFourPress } = this.props
        console.log("navigation", navigation)
        return (
            <View style={{
                height: '100%',
                backgroundColor: backgroundColor,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('docAppFirst')}} style={{ backgroundColor: activeIndex == 1 ? '#770a25' : global.secondary, borderRadius: 5 }}>
                    <AntDesign name="calendar" size={25} color={"white"} style={{ padding: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('doctorRequest')}} style={{ backgroundColor: activeIndex == 2 ? '#770a25' : global.secondary, borderRadius: 5 }} >
                    <FontAwesome name="user" size={25} color={"white"} style={{ padding: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('chatList') }} style={{ backgroundColor: activeIndex == 3 ? '#770a25' : global.secondary, borderRadius: 5 }} >
                    <Ionicons name="chatbox" size={25} color={"white"} style={{ padding: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('videoCallList')}} style={{ backgroundColor: activeIndex == 4 ? '#770a25' : global.secondary, borderRadius: 5 }} >
                    <Entypo name="phone" size={25} color={"white"} style={{ padding: 5 }} />
                </TouchableOpacity>

            </View>
        );


    }
}
