import React, {Component, useEffect, useState} from 'react'
import {Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image, Modal} from 'react-native'
import global from '../../Common/global';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import storage from '../../../utils/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import ioDisconnect from "../../../Actions/ioDisconnect";

const drawer = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [userType, setUserType] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        getUser_Detail().then(res => {
            if (JSON.parse(res).patient) setUserType(0);
            else setUserType(1);
        }).catch(res => {
            if (JSON.parse(res).patient) setUserType(0);
            else setUserType(1);
        });
    }, [])

    const onLogoutPress = () => {
        setModalVisible(true);
    }
    const getUser_Detail = async () => {
        return await storage.get('Login')
    }

    const onLogoutYes = () => {
        dispatch(ioDisconnect());
        AsyncStorage.clear()
        props.navigation.navigate('LoginFlow')
    }

    return (
        <SafeAreaView style={{height: '100%'}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <View style={{
                        height: '20%',
                        width: '70%',
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        borderRadius: 10,
                        justifyContent: 'center',
                    }}>

                        <Text style={{textAlign: 'center'}}>Sei sicuro di voler uscire?</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10}}>

                            <TouchableOpacity onPress={() => {
                                setModalVisible(false)
                            }} style={{
                                height: 35,
                                width: 70,
                                borderRadius: 20,
                                backgroundColor: userType == 1 ? global.secondary : global.primary,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{color: 'white'}}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onLogoutYes} style={{
                                height: 35,
                                width: 70,
                                borderRadius: 20,
                                backgroundColor: userType == 1 ? global.secondary : global.primary,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{color: 'white'}}>Sì</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{
                backgroundColor: userType == 1 ? global.secondary : global.primary,
                height: '100%',
                paddingTop: '30%',
                paddingLeft: 20
            }}>
                <ScrollView>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate(userType == 1 ? 'DoctorDashBoardScreen' : "PatientDashBoardScreen")
                    }} style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                        <Entypo name='home' size={20} style={{marginRight: 20}} color={'white'}/>
                        <Text style={{color: 'white', fontSize: 16}}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        userType == 1 ? props.navigation.navigate('docProfile') : props.navigation.navigate('ProfiloScreen')
                    }} style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: '8%'}}>
                        <FontAwesome5 name='user' size={20} style={{marginRight: 20}} color={'white'}/>
                        <Text style={{color: 'white', fontSize: 16}}>Profilo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        userType == 1 ? props.navigation.navigate('docPatinetList') : props.navigation.navigate('firstScreen')
                    }} style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: '8%'}}>
                        {userType == 1 ?
                            <Feather style={{marginRight: 20}} name="search" color={global.white} size={20}/> :
                            <Fontisto name='doctor' size={20} style={{marginRight: 20}} color={'white'}/>}
                        <Text style={{
                            color: 'white',
                            fontSize: 16
                        }}>{userType == 1 ? "Pazienti" : "Diario clinico"}</Text>
                    </TouchableOpacity>
                    {userType == 1 &&
                        <TouchableOpacity onPress={() => {userType == 1 ? props.navigation.navigate('doctorRequest') : props.navigation.navigate('requestScreen')}}
                            style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: '8%'}}>
                            {
                                userType == 1 ?
                                    <Ionicons style={{marginRight: 20}} name="refresh" color={global.white} size={20}/> :
                                    <Entypo name='circle-with-plus' size={20} style={{marginRight: 20}} color={'white'}/>
                            }
                            <Text style={{
                                color: 'white',
                                fontSize: 16
                            }}>Richieste</Text>
                        </TouchableOpacity>
                    }
                    {userType !== 1 && <TouchableOpacity onPress={() => {
                        userType == 1 ? props.navigation.navigate('docAppFirst') : props.navigation.navigate('patientYourDoc')
                    }} style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: '8%'}}>
                        {
                            userType == 1 ?
                                <FontAwesome style={{marginRight: 20}} name="user-circle-o" color={global.white}
                                             size={20}/> :
                                <FontAwesome5 name='capsules' size={20} style={{marginRight: 20}} color={'white'}/>
                        }


                        <Text style={{
                            color: 'white',
                            fontSize: 16
                        }}>{userType == 1 ? "Appuntamenti" : "Medici"}</Text>
                    </TouchableOpacity>}

                    {

                        userType == 0 ? <TouchableOpacity onPress={() => {
                            props.navigation.navigate('terapiMain')
                        }} style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: '8%'}}>
                            <Feather name='monitor' size={20} style={{marginRight: 20}} color={'white'}/>
                            <Text style={{color: 'white', fontSize: 16}}>Terapie</Text>
                        </TouchableOpacity> : null
                    }


                    <TouchableOpacity onPress={() => {
                        onLogoutPress()
                    }} style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: '8%'}}>
                        <SimpleLineIcons name='logout' size={20} style={{marginRight: 20}} color={'white'}/>
                        <Text style={{color: 'white', fontSize: 16}}>Logout</Text>
                    </TouchableOpacity>


                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

export default drawer
