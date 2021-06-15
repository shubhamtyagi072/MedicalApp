import { StyleSheet, Dimensions } from 'react-native';
import global from '../../../Common/global';
const windowHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.white,

  },
  imageMainView: {
    alignItems: "center",

  },
  imageView: {
    height: 200,
    width: 200,
    borderRadius: 200 / 2,

  },
  buttonPadding: {
    marginLeft: 28,
    marginRight: 28
  },
  topHeaderView: {
    height: 200,
    backgroundColor: global.skyBlue
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
    borderColor: global.skyBlue,
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
    backgroundColor: global.skyBlue,
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
  modalMainView: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1
  },
  insideMainView: {
    flex: 1,
    marginHorizontal: '5%',
    marginVertical: '10%',
    backgroundColor: global.secondary,
    borderRadius: 10

  },
  BigregularTxt: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: 'white'
  },
  bigBoldTxt: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: 'white'
  },
  bigSemiTxt: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: 'white'
  },
});

export default styles;