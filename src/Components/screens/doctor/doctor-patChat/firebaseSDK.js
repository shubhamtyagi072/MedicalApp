import firebase from '@react-native-firebase/app';

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: 'AIzaSyCfD99qVNzATeVipXnLg7kD-x0sMngIr8w',
        //authDomain: '<your-auth-domain',
        databaseURL: 'https://miomedico.firebaseio.com',
        projectId: 'miomedico',
        storageBucket: 'gs://miomedico.appspot.com',
        //messagingSenderId: '465353870566'
      });
    }
  }
  // login = async (user, success_callback, failed_callback) => {
  //   await firebase
  //     .auth()
  //     .signInWithEmailAndPassword(user.email, user.password)
  //     .then(success_callback, failed_callback);
  // };
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;
