import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import global from "./global";

export default class TextCommon extends Component {
    render() {
        const {fontSize = global.fontSize_14, color = global.black,maxWidth, fontWeight = "400", text = "", textAlign = "left", fontFamily = "Montserrat-Medium", lineHeight = 22, marginTop, paddingHorizontal = 0} = this.props
        return (
            <Text style={{
                color: color,
                fontSize: fontSize,
                fontWeight: fontWeight,
                textAlign: textAlign,
                fontFamily: fontFamily,
                lineHeight: lineHeight,
                marginTop: marginTop,
                paddingHorizontal,
                maxWidth
            }}>{text}</Text>
        );
    }
}
