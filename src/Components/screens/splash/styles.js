import { StyleSheet, Dimensions } from 'react-native';
import global from '../../Common/global';

const windowHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.secondary,
    justifyContent: "center"

  },
  imageMainView: {
    alignItems: "center",

  },
  imageView: {
    height: 200,
    width: 200,
    borderRadius: 200 / 2,
  },
  bottomView: {
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    resizeMode: "cover"

  },
  bottomImage: {
    width: 120,
    alignSelf: "center",
    height: 40,
    resizeMode: "cover"
  },
  commonImageStyle: {
    position: "absolute",
    bottom: 36,
    right: 0,
  },
});

export default styles;
