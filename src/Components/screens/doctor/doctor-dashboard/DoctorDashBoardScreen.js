import React, {Component} from "react";
import {
    View,
    Image,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    BackHandler,
    Alert
} from "react-native";
import {connect} from "react-redux";
import styles from './styles';
import TextCommon from '../../../Common/TextCommon';
import global from "../../../Common/global";
import LoadingScreen from "../../../Common/LoadingScreen";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getDoctorById} from '../../../../Actions/getDoctorById';
import {images} from "../../../../Image";
import storage from "../../../../utils/storage";
import Entypo from "react-native-vector-icons/Entypo";
import doctorBanner from "../../../../../assets/banner-medico.png";
import ioDisconnect from "../../../../Actions/ioDisconnect";
import AsyncStorage from "@react-native-community/async-storage";

class DoctorDashBoardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acceptTerms: false,
            activeIndex: 0,
            showBlockingDiv: true,
            intervalRef: null,
            loading: true,
        };
        this.swiper
    }

    getCurrentLoggedUser = async () => {
        
        //getting the local storage to check if a user is already logged in
        await storage.get("Login").then((loggedUser) => {
            let doctorFromServer;   //setting the new logged user
            //getting the parsed JSON
            const parsedUser = JSON.parse(loggedUser);
            const doctor = parsedUser.user || parsedUser.doctor;
            
            let data = {
                "id": doctor.id
            }
            getDoctorById(data).then((doctor) => {
                //checking if the doctor has been accepted as standard
                if (doctor.doctor.validated == 1) {
                    this.setState({
                        showBlockingDiv: false,
                        loading: false,
                    })
                    doctorFromServer = doctor.doctor;
                    clearInterval(this.state.intervalRef)
                } else {
                    this.setState({
                        showBlockingDiv: true,
                        loading: false,
                    })
                }
            })
            return doctorFromServer;
        }).then(async(doctorFromServer)=>{
            await storage.set("Login",doctorFromServer)
        });  
    }

    //function to handle back navigation
    handleBackButton(){
        //ToastAndroid.show('pressed',ToastAndroid.SHORT)
        return true;
    }

    componentDidMount() {
        //Getting if the user is accepted or not
        const intervalRef = setInterval(this.getCurrentLoggedUser, 1000);
        this.setState({
            intervalRef: intervalRef
        })
        //preventing from navigating back to the patient
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)

    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
        clearInterval(this.state.intervalRef)
    }




    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <LoadingScreen/>
                {this.state.showBlockingDiv && <TouchableOpacity onPress={() => {
                    if (this.state.loading) return;
                    Alert.alert('Attendi', "Stiamo verificando il tuo account.",
                        [{ text: 'Esci', onPress: () => {
                                this.props.ioDisconnect();
                                AsyncStorage.clear()
                                this.props.navigation.navigate('LoginFlow')
                            } }, { text: 'OK', onPress: () => {  } }]
                    );
                }} style={{position: 'absolute', zIndex: 999, opacity: 0, width: '100%', height: '100%', flex: 1}}/>}
                <View style={{zIndex: 0, marginVertical: 10, marginLeft: 10}}>
                    <Feather name="menu" color="white" size={25} onPress={() => {
                        this.props.navigation.openDrawer()
                    }}/>
                </View>
                <TextCommon
                    text={"Pagina Personale"}
                    color={"#FFFFFF"}
                    textAlign={"center"}
                    fontSize={global.fontSize_17}
                    fontWeight={"600"}
                    fontFamily={"Poppins-Bold"}
                    marginTop={-20}
                />
                <View style={styles.itemView}>
                    <View style={styles.rowView}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('docProfile')
                        }}
                        style={{alignItems: "center", flex: 1, marginBottom: 15}}>
                            <View 
                            style={{
                                height: 60,
                                width: 60,
                                marginBottom: 2,
                                borderRadius: 60 / 2,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Image source={images.doc_dash_1} style={{width: 150, height: 150, alignSelf: 'center', borderRadius: 30}}/>
                            </View>
                            <TextCommon
                                text={"Profilo"}
                                color={"#FFFFFF"}
                                textAlign={"center"}
                                fontSize={global.fontSize_14}
                                fontWeight={"600"}
                                textAlign={"center"}
                                fontFamily={"Poppins-SemiBold"}
                                lineHeight={16}
                            />

                            <TextCommon
                                text={"I miei dati"}
                                color={"#FFFFFF"}
                                textAlign={"center"}
                                fontSize={global.fontSize_10}
                                fontWeight={"600"}
                                textAlign={"center"}
                                fontFamily={"Poppins-Regular"}
                                lineHeight={16}
                            />
                        </TouchableOpacity>

                        <View flex={1} />

                        <TouchableOpacity 
                            onPress={() => {this.props.navigation.navigate('docPatinetList')}} 
                            style={{alignItems: "center", flex: 1, marginBottom: 20}}>
                            <View style={{
                                height: 60,
                                width: 60,
                                marginBottom: 6,
                                borderRadius: 60 / 2,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Image source={images.doc_dash_2}
                                       style={{width: 150, height: 150, alignSelf: 'center', borderRadius: 30}}/>
                            </View>

                            <TextCommon
                                text={"Pazienti"}
                                color={"#FFFFFF"}
                                textAlign={"center"}
                                fontSize={global.fontSize_14}
                                fontWeight={"600"}
                                textAlign={"center"}
                                fontFamily={"Poppins-SemiBold"}
                                lineHeight={16}
                            />
                            <View style={{height: 4}}/>
                            <TextCommon
                                text={"I miei pazienti"}
                                color={"#FFFFFF"}
                                textAlign={"center"}
                                fontSize={global.fontSize_10}
                                fontWeight={"600"}
                                textAlign={"center"}
                                fontFamily={"Poppins-Regular"}
                                lineHeight={16}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rowView}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('doctorRequest')
                        }} style={{alignItems: "center", flex: 1}}>
                            <View style={{
                                height: 60,
                                width: 60,
                                marginBottom: 6,
                                borderRadius: 60 / 2,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Image source={images.doc_dash_3}
                                       style={{width: 150, height: 150, alignSelf: 'center', borderRadius: 30}}></Image>

                            </View>

                            <TextCommon
                                text={"Richieste"}
                                color={"#FFFFFF"}
                                textAlign={"center"}
                                fontSize={global.fontSize_14}
                                fontWeight={"600"}
                                textAlign={"center"}
                                fontFamily={"Poppins-SemiBold"}
                                lineHeight={16}
                            />
                            <View style={{height: 4}}/>
                            <TextCommon
                                text={"Gestisci richieste"}
                                color={"#FFFFFF"}
                                textAlign={"center"}
                                fontSize={global.fontSize_10}
                                fontWeight={"600"}
                                textAlign={"center"}
                                fontFamily={"Poppins-Regular"}
                                lineHeight={16}
                            />
                        </TouchableOpacity>

                        <View flex={1} />

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('docAppFirst')
                        }} style={{alignItems: "center", flex: 1}}>
                            <View style={{
                                height: 60,
                                width: 80,
                                marginBottom: 6,
                                borderRadius: 60 / 2,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Image source={images.doc_dash_4}
                                       style={{width: 150, height: 150, alignSelf: 'center', borderRadius: 30}}/>
                            </View>
                            <View style={{
                                height: 60,
                                width: 180,
                                marginBottom: 6,
                                borderRadius: 60 / 2,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <TextCommon
                                    text={"Appuntamenti"}
                                    color={"#FFFFFF"}
                                    textAlign={"center"}
                                    fontSize={global.fontSize_14}
                                    fontWeight={"600"}
                                    textAlign={"center"}
                                    fontFamily={"Poppins-SemiBold"}
                                    lineHeight={16}
                                />
                                <View style={{height: 4}}/>
                                <TextCommon
                                    text={"Gestisci i tuoi appuntamenti"}
                                    color={"#FFFFFF"}
                                    textAlign={"center"}
                                    fontSize={global.fontSize_10}
                                    fontWeight={"600"}
                                    textAlign={"center"}
                                    fontFamily={"Poppins-Regular"}
                                    lineHeight={16}
                                />
                            </View>
                        </TouchableOpacity>


                    </View>


                    <View style={styles.rowView}>
                        <TouchableOpacity flex={1} onPress={() => {
                            this.props.navigation.navigate('chatList')
                        }} style={{alignItems: "center", flex: 1}}>
                            <View style={{
                                height: 60,
                                width: 60,
                                marginBottom: 6,
                                borderRadius: 60 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: "white"
                            }}>
                                <Ionicons name="chatbox" size={28} color={global.secondary} />
                            </View>

                            <TextCommon
                                text={"Chat"}
                                color={"#FFFFFF"}
                                textAlign={"center"}
                                fontSize={global.fontSize_14}
                                fontWeight={"600"}
                                fontFamily={"Poppins-SemiBold"}
                                lineHeight={16}
                            />
                            <View style={{height: 4}}/>
                            <TextCommon
                                text={"Contatta i tuoi pazienti"}
                                color={"#FFFFFF"}
                                textAlign={"center"}
                                fontSize={global.fontSize_10}
                                fontWeight={"600"}
                                fontFamily={"Poppins-Regular"}
                                lineHeight={16}
                            />
                        </TouchableOpacity>

                        <View flex={1} />

                        <TouchableOpacity flex={1} onPress={() => {
                            this.props.navigation.navigate('videoCallList')
                        }} style={{alignItems: "center", flex: 1}}>
                            <View style={{
                                height: 60,
                                width: 60,
                                marginBottom: 6,
                                borderRadius: 60 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white'
                            }}>
                                <Entypo name="phone" size={35} color={global.secondary} />
                            </View>

                            <TextCommon
                                text={"Televisita"}
                                color={"#FFFFFF"}
                                textAlign={"center"}
                                fontSize={global.fontSize_14}
                                fontWeight={"600"}
                                fontFamily={"Poppins-SemiBold"}
                                lineHeight={16}
                            />
                            <View style={{height: 4}}/>
                            <TextCommon
                                text={"Inizia una chiamata"}
                                color={"#FFFFFF"}
                                textAlign={"center"}
                                fontSize={global.fontSize_10}
                                fontWeight={"600"}
                                fontFamily={"Poppins-Regular"}
                                lineHeight={16}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.commonImageStyle}>
                    <Image source={require("../../../../Image/common_icon.png",)}/>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => ({
    ioDisconnect: () => dispatch(ioDisconnect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDashBoardScreen)
