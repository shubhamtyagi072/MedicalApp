import axios from "axios";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { BASE_URL } from './type'
import PushNotification from 'react-native-push-notification';
const PUSH_ENDPOINT = BASE_URL + 'notification/get/token';
import {requestNotifications} from 'react-native-permissions';

export const registerForPush = async (data, navigation) => {
    requestNotifications(['alert', 'sound']).then(({status, settings}) => {
        if (status !== "granted") return;

        PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: (token) => {
                console.log('TOKEN:', token);
                // POST the token to your backend server from where you can retrieve it to send push notifications.
                if (token.os === "ios") {

                    console.log("data", data)

                    const options = {
                        method: 'POST',
                        url: PUSH_ENDPOINT,
                        data: {
                            "token": token,
                            "patient_id": data.patient_id,
                            "os": "ios"
                        },
                        // body: JSON.stringify({"token" : token.token}),
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        json: true
                    };
                    axios(options)
                        .then(function (response) {
                            console.log(response.data);
                            console.log('api status', response.status);
                            if (response && response.data["status"] == "success") {
                                // alert("token saved")

                            } else {
                                // alert("notification failed")
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    // Send iOS Notification from debug console: {"pn_apns":{"aps":{"alert":"Hello World."}}}
                } else {
                    PushNotification.subscribeToTopic("all");
                    const options = {
                        method: 'POST',
                        url: PUSH_ENDPOINT,
                        data: {
                            "token": token,
                            "patient_id": data.patient_id,
                            "os": "android"
                        },
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        json: true
                    };
                    axios(options)
                        .then(function (response) {
                            console.log(response.data);
                            console.log(response.status);
                            if (response && response.data["status"] == "success") {
                                // alert("token saved")

                            } else {
                                //alert("notification failed")
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                console.warn('NOTIFICATION:', notification.data.roomID);

                //   const data = JSON.stringify(notification.data)
                // navigation.navigate('VideoRequest', {type: `${notification.data.roomID}`})

                // const data = JSON.stringify(notification)

                // alert()

                //  alert("noti tapped")
                //const data = JSON.stringify(notification.notification.getMessage())
                //alert(data)

                // const isClicked = notification.getData().userInteraction === 1

                // if (isClicked) {
                //    // Navigate user to another screen
                //  console.log('push tapped here')

                // } else {
                //    // Do something else with push notification
                // }

                // process the notification

                // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },


            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);

                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function (err) {
                console.error(err.message, err);
            },


            // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: "741972349656",

            permissions: {
                alert: true,
                badge: true,
                sound: true
            },


            popInitialNotification: true,


            requestPermissions: true,
        });

    });

};


// export default class App extends React.Component {
//     render() {
//       return (
//         <AppNavigator/>
//       );
//     }
//   }


// export const App = () => {
//     const [permissions, setPermissions] = useState({});

//     useEffect(() => {
//       PushNotificationIOS.addEventListener('notification', onRemoteNotification);
//     });

//     const onRemoteNotification = (notification) => {
//       const isClicked = notification.getData().userInteraction === 1

//       if (isClicked) {
//          // Navigate user to another screen
// console.log('push tapped')

//       } else {
//          // Do something else with push notification
//       }
//     };
//   }
