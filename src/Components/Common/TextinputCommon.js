import React, {Component} from "react";
import {View, TextInput} from "react-native";
import global from "./global";

export default class TextinputCommon extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderBackText() {
        const {iconColor = "#000", iconconsColors = "#000", icon = undefined, iconcons = undefined, height = 50, borderColor = global.green, pointerEvents = pointerEvents ? pointerEvents : false, placeHolder, isPasswordType = isPasswordType ? isPasswordType : false, value, onChangeTxt, iconType, secureTextEntry, color = color ? color : global.secondary, placeholderTextColor = placeholderTextColor ? placeholderTextColor : global.secondary, disable, backgroundColor = backgroundColor ? backgroundColor : 'white', keyboardType = keyboardType ? keyboardType : 'default'} = this.props;
        return (
            <View>

                <TextInput
                    placeholder={placeHolder}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={isPasswordType}
                    value={value}
                    onChangeText={onChangeTxt}
                    autoCapitalize='none'
                    editable={disable}
                    pointerEvents={pointerEvents}
                    keyboardType={keyboardType}
                    
                    style={{
                        fontFamily: "Poppins-Medium",
                        color: color,
                        fontSize: 16,
                        marginRight: 60,
                        marginLeft: 20,
                        minWidth: '70%',
                        maxWidth:'92%',
                        flexDirection:'row',
                        alignItems:'flex-end'
                    }}

                />

            </View>
        );
    }

    render() {
        return <View>{this.renderBackText()}</View>;
    }
}
