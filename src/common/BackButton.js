import {getStatusBarHeight} from "react-native-status-bar-height";
import AntDesign from "react-native-vector-icons/AntDesign";
import {TouchableOpacity} from "react-native";
import React from "react";

const BackButton = ({navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: getStatusBarHeight(true), left: 0, zIndex: 1000, paddingHorizontal: 10, paddingVertical: 20 }} >
            <AntDesign name="left" color="white" size={25}/>
        </TouchableOpacity>
    )
};

export default BackButton;
