import { StyleSheet, Dimensions } from 'react-native';
import global from '../../../../Common/global';
const windowHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.white,

  },
  imageMainView: {
    alignItems: "center",

  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    height: '8%',
    width: '100%',
    backgroundColor: global.primary
  },
  imageView: {
    height: 200,
    width: 200,
    borderRadius: 200 / 2,

  },
  buttonPadding: {
    marginLeft: 28,
    marginRight: 28,
    marginTop: 30, flex: 1
  },
  topHeaderView: {
    height: 70,
    backgroundColor: global.green //Change by Farheen
  },
  rowView: {
    flexDirection: "row",
    marginLeft: 16,
  },
  radioPaddingView: {
    height: 20,
    width: 20,

    justifyContent: "center",
    alignItems: "center"
  },
  radioStyle: {

    height: 12,
    width: 12,
    //borderColor:global.skyBlue,
    borderWidth: 1,
    borderRadius: 12 / 2
  },
  buttonManinView: {
    position: "absolute",
    bottom: 30,

    alignSelf: "center"
  },
  buttonStyle: {
    height: 45,
    width: 45,
    backgroundColor: global.green, // change by farheen
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 45 / 2
  },
  commonImageStyle: {
    position: "absolute",
    bottom: 30,
    right: 0,
  },

});

export default styles;