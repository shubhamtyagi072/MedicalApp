import React from 'react';
import {Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import styles from './styles';
import TextCommon from '../../../Common/TextCommon'
import Feather from 'react-native-vector-icons/Feather';
import {images} from "../../../../Image"
import global from "../../../Common/global"
import callAvatar from "../../../../../assets/avatar.png";
import RNSimpleCrypto from "react-native-simple-crypto";
import { getDoctorById } from '../../../../Actions/getDoctorById';

export default class VideoRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomID: [],
            data: null,
        };
    }

    componentDidMount() {
        const { type,data } = this.props.navigation.state.params;
        console.log('testing the params for videoRequest------------------------',this.props.navigation.state.params)
        //let decryptType = RNSimpleCrypto.RSA.decrypt(type);
        this.setState({
            data: data.substring(0,data.length-1)
        })
    }


    render() {

        return (

            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content"/>


                <View style={styles.topHeaderView}>

                    <Feather name="menu" color="white" size={25} style={{marginLeft: 10, marginTop: -10}}
                             onPress={() => {
                                 this.props.navigation.openDrawer()
                             }}/>
                    {/* Registrazione */}
                    <View style={{flex: 1,maxWidth:'80%', justifyContent: 'center', alignItems: 'center'}}>
                        <TextCommon
                            text={"Dott. " + this.state.data}
                            color={"#FFFFFF"}
                            flex={1}
                            textAlign={"center"}
                            fontSize={global.fontSize_17}
                            fontWeight={"600"}
                            fontFamily={"Montserrat-Bold"}
                        />
                    </View>
                </View>



              {/* //  <FontAwesome name="user" color={global.skyBlue} size={200} style={{width: 200, height: 200, alignSelf: 'center', marginTop: 50, borderRadius: 100}}/> */}
                <Image source={callAvatar}
                       style={{width: 172, height: 172, alignSelf: 'center', marginTop: 50, borderRadius: 100}}/>
                {/* <Text style={{alignSelf: 'center', marginTop: 20, fontSize: 23, color: 'black'}}>Doctor</Text> */}

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 100
                }}>

                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Image source={images.phoneRej}
                               style={{width: 120, height: 120, alignSelf: 'center', borderRadius: 20}}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('VideoRoom', {type: this.props.navigation.state.params.type})
                    }}>
                        <Image source={images.phoneAcc}
                               style={{width: 120, height: 120, alignSelf: 'center', borderRadius: 20}}></Image>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>


        )

    }


}
