import React from 'react';
import { View } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import { StackActions, NavigationActions } from "react-navigation";
import storage from '../../../utils/storage'
import { sendPushToPatient } from '../../../Actions/videoAction'


class VideoRoom extends React.Component {
    constructor(props) {
        super(props);
        this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
        this.onConferenceJoined = this.onConferenceJoined.bind(this);
        this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);

        this.state = {
            doctor: false,
        };
    }

    getUser_Detail = async () => {

        return res;
    }

    apiWork = (req) =>
    {
        sendPushToPatient(req);
        return true;
    }

    onConferenceTerminated(nativeEvent) {
        this.doctor && this.props.navigation.goBack(null);
                console.log('CONFERENCE_LEFT');
    }


    componentDidMount = async () => {
        const res = JSON.parse( await storage.get('Login'));

        const {patient_id,type} = this.props.navigation.state.params;
        console.log('testing the patient id --------------------===========',this.props.navigation.state.params)
        //console.log('valuesssss', res,type,patient_id)
        let name = ''
        let email = ''

        if(res){
            if (res.patient)
            {
                name = res.patient.name
                email = res.patient.email
                this.setState({doctor: false});
            }else{
    
                this.setState({doctor: true});
    
                var arr = type.split("-")
                // call notification API here
                let data = {
                    "patient_id": patient_id,
                    "title": "Televisita",
                    "body": `${res.user.name} vorrebbe chiamarti.`,
                    "doc_name": res.user.name,
                    "roomID" : type
                }
                console.log('testing just above the api work++++++')
                console.log('data variable value for testing-------------------',data);
                this.apiWork(data)
                console.log('dataNotification', data)
                name = res.user.name
                email = res.user.email
            }
        
            const options = {
                room: `${type}`,
                subject: 'Televisita',
            };
            const meetFeatureFlags = {
                pip : false,
                chat : false,
                settings : false
            };


            const url = `https://meet.jit.si/${type}`;
            console.log(url)
            console.log('testing in room------------->')
            const userInfo = { displayName: name, email: email, avatar: 'https:/gravatar.com/avatar/abc123' };

            JitsiMeet.initialize();
            console.log('testing after initialize1--------------')
            JitsiMeet.call(url, userInfo, options,meetFeatureFlags);
            console.log('testing after call--------------')
        }
    }

    componentWillUnmount = () =>
    {
        //JitsiMeet.endCall()
        console.log("unmounting done")
    }


    onConferenceTerminated(nativeEvent) {
        /* Conference terminated event */
        JitsiMeet.endCall()
        this.props.navigation.navigate(this.state.doctor ? 'DoctorDashBoardScreen' : 'PatientDashBoardScreen')
    }

    onConferenceJoined(nativeEvent) {
        /* Conference joined event */
    }

    onConferenceWillJoin(nativeEvent) {
        /* Conference will join event */
    }

    render() {
        return (
            <View style={{ backgroundColor: 'black',flex: 1 }}>
                <JitsiMeetView onConferenceTerminated={this.onConferenceTerminated} onConferenceJoined={this.onConferenceJoined} onConferenceWillJoin={this.onConferenceWillJoin} style={{ flex: 1, height: '100%', width: '100%' }} />
            </View>
        );
    }
}

export default VideoRoom;


