import React, {useEffect, useState} from "react";
import {
    View,
    Image,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import {connect} from "react-redux";
import styles from './styles';
import TextCommon from '../../../Common/TextCommon'
import RoundedButton from '../../../Common/RoundedButton'
import global from "../../../Common/global";
import TextinputCommon from "../../../Common/TextinputCommon";
import LoadingScreen from "../../../Common/LoadingScreen";
import {registerApi} from '../../../../Actions'
import {constant} from './constant'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import ActionSheet from 'react-native-actionsheet';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DatePicker from 'react-native-datepicker';
import {getProfile} from "../../../../Actions/getPatientProfile";
import storage from "../../../../utils/storage";
import {submitProfile} from "../../../../Actions/submitPatientPro";
import {images} from "../../../../Image";
import RNPickerSelect from 'react-native-picker-select';

const ProfiloScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("31-12-99");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [lifestyle, setLifeStyle] = useState("");
    const [showDate, setShowDate] = useState(false);

    const getUser_Detail = async () => {
        return await storage.get('Login')
    }

    useEffect(() => {
        const init = async () => {
            const res = JSON.parse(await getUser_Detail())
            console.log("res", res.patient)
            let data = {
                "id": res.patient.id
            }
            const response = await getProfile(data)
            console.log("res", response.patient.weight)
            if (response.message === "Patient record") {
                setName(response.patient.name);
                setGender(response.patient.gender);
                setDate(response.patient.birth_date);
                setCity(response.patient.city);
                setAddress(response.patient.address);
                setLifeStyle(response.patient.life_style);
                setHeight((response.patient.height).toString() === "0" ? "" : (response.patient.height).toString());
                setWeight((response.patient.weight).toString() === "0" ? "" : (response.patient.weight).toString());
            }
        };
        init().then(() => console.log('Profile loading complete'));
    }, [])

    const onNextPress = async () => {
        setLoading(true);
        const res = JSON.parse(await getUser_Detail());

        if (validation()) {
            var data = {
                "id": res.patient.id,
                "gender": gender,
                "birth_date": date,
                "address": address,
                "city": city,
                "height": parseInt(height),
                "weight": parseInt(weight),
                "life_style": lifestyle,

            }

            const resp1 = await submitProfile(data)
            console.log("resp1", resp1)
            if (resp1.status === "success") {
                setLoading(false);
                navigation.navigate("PatientDashBoardScreen")
            } else {
                setLoading(false);
                Alert.alert(
                    'Medico',
                    resp1["message"]
                );
            }

        }
    };

    const validation = () => {
        setLoading(false);
        if (!gender) {
            alert(constant.errgender)
            return false
        } else if (!date) {
            alert(constant.errdate)
            return false
        } else if (!address) {
            alert(constant.errbirthplace)
            return false
        } else if (!city) {
            alert(constant.errCity)
            return false
        } else if (!height) {
            alert(constant.errheight)
            return false
        } else if (!weight) {
            alert(constant.errWidth)
            return false
        } else {
            return true
        }
    }

    //Choosing the right geneder
    const onIndexPressGender = (index) => {
        let arry = ['Maschio', 'Femmina']
        this.setState({
            gender: arry[index]
        })
    }

    const data = new Date()
    console.log("data", data)

    const Label = ({text}) => {
        return (
            <View style={{marginBottom: 4}}>
                <TextCommon
                    text={text}
                    color={global.primary}
                    fontSize={global.fontSize_14}
                    fontWeight="400"
                    fontFamily="Montserrat-Bold"
                />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <LoadingScreen loading={false}/>
            <View style={styles.containerNew}>
                <View style={styles.topHeaderView}>
                    <Feather name="menu" color="white" size={25} style={{marginLeft: 10}} onPress={() => {
                        navigation.openDrawer()
                    }}/>
                    <TextCommon
                        text="Profilo"
                        color="#FFFFFF"
                        textAlign="center"
                        fontSize={global.fontSize_17}
                        fontWeight="600"
                        fontFamily="Montserrat-Bold"
                    />
                    <AntDesign onPress={() => {
                        navigation.goBack()
                    }} name="left" color="white" size={25} style={{marginRight: 10}}/>

                </View>

                <ScrollView>
                    <View style={styles.buttonPadding}>
                        <Label text="Nome e Cognome" />
                        <View style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderColor: global.primary,
                            height: 50,
                            borderRadius: 50 / 2,
                            color: global.primary,
                            alignItems: 'center',
                            flex: 1,
                            marginBottom: 10,
                        }}>
                            <FontAwesome name="user" color={global.primary}
                                         style={{resizeMode: 'contain', marginLeft: 14}} size={30}/>
                            <TextinputCommon
                                placeHolder={"NOME"}
                                value={name}
                                placeholderTextColor={global.primary}
                                onChangeTxt={text => setName(text)}
                                color={global.primary}
                                disable={!loading}
                                style={{backgroundColor: 'black'}}
                            />
                        </View>

                        <Label text="Genere" />
                        <View style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderColor: global.primary,
                            height: 50,
                            borderRadius: 50 / 2,
                            color: global.primary,
                            alignItems: 'center',
                            flex: 1,
                            marginBottom: 10
                        }}>
                            <Image source={images.gender}
                                   style={{height: 25, width: 25, resizeMode: 'contain', marginLeft: 10}}/>
                            <RNPickerSelect
                                value={gender}
                                onValueChange={value => setGender(value)}
                                placeholder={{}}
                                items={[
                                    {label: 'GENERE*', value: ""},
                                    {label: 'MASCHIO', value: 'MASCHIO'},
                                    {label: 'FEMMINA', value: 'FEMMINA'},
                                ]}
                                style={{
                                    inputIOS: {
                                        fontSize: 16,
                                        paddingVertical: 15,
                                        paddingLeft: 20,
                                        paddingRight: 30, // to ensure the text is never behind the icon
                                        color: global.primary,
                                        fontWeight: 'bold',
                                        width: Dimensions.get('window').width * 0.75,
                                    },
                                    inputAndroid: {
                                        width: Dimensions.get('window').width * 0.75,
                                        fontSize: 16,
                                        paddingVertical: 15,
                                        paddingLeft: 20,
                                        paddingRight: 30, // to ensure the text is never behind the icon
                                        color: global.primary,
                                        fontWeight: 'bold',
                                    },
                                }}
                            />
                        </View>

                        <Label text="Data di nascita" />
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderColor: global.primary,
                            height: 50,
                            borderRadius: 50 / 2,
                            color: global.primary,
                            alignItems: 'center',
                            flex: 1,
                            marginBottom: 10,
                        }}>
                            <Image source={images.calender}
                                   style={{height: 25, width: 25, resizeMode: 'contain', marginLeft: 10}}/>
                            <TextinputCommon
                                placeHolder={"DATA DI NASCITA*"}
                                value={date}
                                placeholderTextColor={global.primary}
                                color={global.primary}
                                disable={false}
                            />
                            <DatePicker
                                style={{width: '100%', height: 50, position: 'absolute', opacity: 0, borderWidth: 0}}
                                date="31-12-99" //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                maxDate="01-01-2050"
                                confirmBtnText="Conferma"
                                cancelBtnText="Annulla"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                        opacity: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                        borderWidth: 0, opacity: 0
                                    }
                                }}
                                onDateChange={date => setDate(date)}
                            />
                        </TouchableOpacity>

                        <Label text="Indirizzo di residenza" />
                        <View style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderColor: global.primary,
                            height: 50,
                            borderRadius: 50 / 2,
                            color: global.primary,
                            alignItems: 'center',
                            flex: 1,
                            marginBottom: 10
                        }}>
                            <Image source={images.location}
                                   style={{height: 25, width: 25, resizeMode: 'contain', marginLeft: 10}}/>
                            <TextinputCommon
                                placeHolder={"INDIRIZZO DI RESIDENZA*"}
                                value={address}
                                placeholderTextColor={global.primary}
                                onChangeTxt={text => setAddress(text)}
                                color={global.primary}

                                disable={!loading}

                            />
                        </View>

                        <Label text="Città" />
                        <View style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderColor: global.primary,
                            height: 50,
                            borderRadius: 50 / 2,
                            color: global.primary,
                            alignItems: 'center',
                            flex: 1,
                            marginBottom: 10
                        }}>
                            <Image source={images.city}
                                   style={{height: 25, width: 25, resizeMode: 'contain', marginLeft: 10}}/>
                            <TextinputCommon
                                placeHolder={"CITTA*"}
                                value={city}
                                placeholderTextColor={global.primary}
                                onChangeTxt={text => setCity(text)}
                                color={global.primary}
                                disable={!loading}
                            />
                        </View>

                        <Label text="Altezza (cm)" />
                        <View style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderColor: global.primary,
                            height: 50,
                            borderRadius: 50 / 2,
                            color: global.primary,
                            alignItems: 'center',
                            flex: 1,
                            marginBottom: 10
                        }}>
                            <Image source={images.list}
                                   style={{height: 25, width: 25, resizeMode: 'contain', marginLeft: 10}}/>
                            <TextinputCommon
                                placeHolder={"ALTEZZA*"}
                                value={height}
                                placeholderTextColor={global.primary}
                                onChangeTxt={text => /^\d+$/.test(text) && text !== "" ? setHeight(text) : setHeight('') }
                                color={global.primary}
                                disable={!loading}
                                keyboardType={'numeric'}
                            />
                        </View>

                        <Label text="Peso (kg)" />
                        <View style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderColor: global.primary,
                            height: 50,
                            borderRadius: 50 / 2,
                            color: global.primary,
                            alignItems: 'center',
                            flex: 1,
                            marginBottom: 10
                        }}>
                            <Image source={images.peso}
                                   style={{height: 25, width: 25, resizeMode: 'contain', marginLeft: 10}}/>
                            <TextinputCommon
                                placeHolder={"PESO CORPOREO*"}
                                value={weight}
                                placeholderTextColor={global.primary}
                                onChangeTxt={text => /^\d+$/.test(text) && text !== "" ? setWeight(text) : setWeight('') }
                                color={global.primary}
                                disable={!loading}
                                keyboardType={'numeric'}
                            />
                        </View>

                        <Label text="Stile di vita" />
                        <View style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderColor: global.primary,
                            height: 50,
                            borderRadius: 50 / 2,
                            color: global.primary,
                            alignItems: 'center',
                            flex: 1,
                            marginBottom: 10
                        }}>
                            <Image source={images.lifestyle}
                                   style={{height: 25, width: 25, resizeMode: 'contain', marginLeft: 10}}/>
                            <RNPickerSelect
                                value={lifestyle}
                                onValueChange={value => setLifeStyle(value)}
                                placeholder={{}}
                                items={[
                                    {label: 'STILE DI VITA*', value: ""},
                                    {label: 'SEDENTARIO', value: 'SEDENTARIO'},
                                    {label: 'ATTIVO', value: 'ATTIVO'},
                                    {label: 'ATLETICO', value: 'ATLETICO'},
                                ]}
                                style={{
                                    inputIOS: {
                                        fontSize: 16,
                                        paddingVertical: 15,
                                        paddingLeft: 20,
                                        paddingRight: 30, // to ensure the text is never behind the icon
                                        color: global.primary,
                                        fontWeight: 'bold',
                                        width: Dimensions.get('window').width * 0.75,
                                    },
                                    inputAndroid: {
                                        width: Dimensions.get('window').width * 0.75,
                                        fontSize: 16,
                                        paddingVertical: 15,
                                        paddingLeft: 20,
                                        paddingRight: 30, // to ensure the text is never behind the icon
                                        color: global.primary,
                                        fontWeight: 'bold',
                                    },
                                }}
                            />
                        </View>

                        <View style={{marginTop: 15}}>

                            <RoundedButton
                                btnText={!loading ? "CONFERMA" : <ActivityIndicator style={{
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    flex: 1,
                                    marginVertical: 'auto'
                                }} color={'white'} size='small'/>}
                                backgroundColor={global.green}
                                onPress={onNextPress}
                            />
                        </View>
                        <View style={{height: 22}}/>
                    </View>
                </ScrollView>

                <View style={styles.commonImageStyle}>
                    <Image source={require("../../../../Image/common_icon.png",)}/>
                </View>
                <ActionSheet
                    title={'STILE DI VITA'}
                    options={['Sedentario', 'Attivo', 'Atletico', 'Cancella']}
                    cancelButtonIndex={3}
                    destructiveButtonIndex={3}
                    onPress={(index) => {
                        onIndexPress(index)
                    }}
                />
                <ActionSheet
                    title={'GENERE'}
                    options={['Maschio', 'Femmmina', 'Cancella']}
                    cancelButtonIndex={4}
                    destructiveButtonIndex={2}

                    onPress={(index) => {
                        onIndexPressGender(index)
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const mapStateToProps = (state, action) => {
    let RegisterData = ""
    let Registerrror = ""
    let RegisterIsLoding = ""

    if (state && state.Register) {
        RegisterData = state.Register.success
        Registerrror = state.Register.error,
            RegisterIsLoding = state.Register.isLoading
    }

    return {
        RegisterData,
        Registerrror,
        RegisterIsLoding
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerApi: data => {
            dispatch(registerApi(data));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfiloScreen);

