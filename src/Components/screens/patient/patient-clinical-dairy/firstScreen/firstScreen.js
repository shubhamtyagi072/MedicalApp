/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from './styles';
import TextCommon from '../../../../Common/TextCommon'
import RoundedButton from '../../../../Common/RoundedButton'
import global from "../../../../Common/global";
import TextinputCommon from "../../../../Common/TextinputCommon";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomeHeader from '../../../../Common/CustomeHeader';


import { images } from "../../../../../Image";


export default class firstscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {

  }
  btnOnpress = (from) => {
    this.props.navigation.navigate('secondScreen', { from: from })
  }
  render() {

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <CustomeHeader backgroundColor={global.primary} text={"Storia e Diario clinico"} navigation={this.props.navigation} />

        <ScrollView>
          <View style={styles.buttonPadding}>
            <TouchableOpacity onPress={() => { this.btnOnpress("previous") }} style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: global.primary,
              height: 50,
              borderRadius: 50 / 2,
              color: global.primary,
              alignItems: 'center',
              flex: 1,
              marginTop: 20,
              justifyContent: 'space-between',
              paddingHorizontal: 20

            }}>
              <View style={{ flexDirection: 'row' }}>
                <Octicons name="plus" color={global.primary} size={20} style={{ marginRight: 10 }} />
                <TextCommon
                  text={"PATOLOGIE PASSATE"}
                  color={global.primary}
                  textAlign={"center"}
                  fontSize={13}
                  fontWeight={"600"}
                  textAlign={"center"}
                  fontFamily={"Montserrat-Bold"}
                />
              </View>
              <Ionicons name="chevron-forward" color={global.primary} size={22} />
          </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.btnOnpress("current") }} style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: global.primary,
              height: 50,
              borderRadius: 50 / 2,
              color: global.primary,
              alignItems: 'center',
              flex: 1,
              marginTop: 20,
              justifyContent: 'space-between',
              paddingHorizontal: 20

            }}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="plus-outline" color={global.primary} size={22} style={{ marginRight: 10 }} />
                <TextCommon
                  text={"PATOLOGIE IN CORSO"}
                  color={global.primary}
                  textAlign={"center"}
                  fontSize={13}
                  fontWeight={"600"}
                  textAlign={"center"}
                  fontFamily={"Montserrat-Bold"}
                />
              </View>

              <Ionicons name="chevron-forward" color={global.primary} size={22} />
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={() => { this.props.navigation.navigate('thirdScreen', { from: 'clinical' }) }} style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: global.primary,
              height: 50,
              borderRadius: 50 / 2,
              color: global.primary,
              alignItems: 'center',
              flex: 1,
              marginTop: 20,
              justifyContent: 'space-between',
              paddingHorizontal: 20

            }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={images.calender} style={{ height: 25, width: 20, resizeMode: 'contain', marginRight: 5 }} />
                <TextCommon
                  text={"ANNOTAZIONI GIORNALIERE"}
                  color={global.primary}
                  textAlign={"center"}
                  fontSize={13}
                  fontWeight={"600"}
                  textAlign={"center"}
                  fontFamily={"Montserrat-Bold"}
                />
              </View>
              <Ionicons name="chevron-forward" color={global.primary} size={22} />
          </TouchableOpacity>*/}
          </View>
        </ScrollView>

        <View style={styles.commonImageStyle}>
          <Image source={require("../../../../../Image/common_icon.png",)} />
        </View>

      </SafeAreaView >
    );
  }
}


