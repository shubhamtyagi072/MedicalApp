import { StyleSheet, Dimensions } from 'react-native';
import global from '../../Common/global';
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
  //change by me
  topHeaderView: {
    height: 270,
    backgroundColor: global.skyBlue
  },
  commonImageStyle: {
    position: "absolute",
    bottom: 30,
    right: 0,

  },

});

export default styles;