import React, { Component } from "react";
import { View, TextInput } from "react-native";
import global from "./global";

export default class Saprator extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 3, height: 5, width: '100%' }} />
    }
}
