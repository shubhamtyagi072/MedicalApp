import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import global from "./global";
import TextCommon from './TextCommon'

export default class RoundedButton extends Component {


    render() {
        const { height = height ? height : 50, width = '76.8%', borderColor = global.grey, backgroundColor = global.green, btnText = "",onPress, btntextColor = btntextColor ? global.darkred : global.white, fontFamily = fontFamily ? fontFamily : "Poppins-Medium" } = this.props
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ height: height, width: width, backgroundColor: backgroundColor, borderRadius: height / 2, borderWidth: 1, borderColor: borderColor, justifyContent: "center", alignItems: "center", alignSelf: "center" }}  >
                <TextCommon
                    text={btnText}
                    color={btntextColor}
                    textAlign={"center"}
                    fontSize={global.fontSize_17}
                    fontFamily={fontFamily}
                    height={height}

                />
            </TouchableOpacity>
        );


    }
}
