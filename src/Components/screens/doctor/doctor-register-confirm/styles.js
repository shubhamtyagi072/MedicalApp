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
    marginRight: 28,
    flex: 1
  },
  topHeaderView: {
    height: '40%',
    backgroundColor: global.secondary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowView: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 5
  },
  dotView: {
    height: 14,
    width: 14,
    borderRadius: 14 / 2,
  },
  sliderImage: {
    height: '65%',
    resizeMode: 'contain',
    marginBottom: 10,
    alignSelf: 'center'
  },
  textView: {
    width: "60%",
    alignSelf: "center"
  },
  paginationStyle: {

  },
  paginationText: {
    color: 'white',
    fontSize: 20
  },
  swiperView: {
    height: '45%',
    marginTop: 10
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


});

export default styles;