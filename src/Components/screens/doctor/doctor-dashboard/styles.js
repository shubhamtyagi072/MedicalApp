import { StyleSheet, Dimensions } from 'react-native';
import global from '../../../Common/global';
const windowHeight = Dimensions.get("screen").height;
const windowWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.secondary,
  },
  itemView: {
    width: "80%",
    paddingTop: "5%",
    height: (Dimensions.get('screen').height),
    alignSelf: "center"
  },
  selfCenter: {
    alignSelf: "center",
    alignItems: "center"
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: '10%',
    paddingHorizontal: 20,
  },
  itemCirculerView: {
    width: windowWidth / 5.12,
    height: windowWidth / 5.12,
    borderRadius: windowWidth / 6,
    backgroundColor: global.white,
    justifyContent: "center",
    alignItems: "center"
  },
  commonImageStyle: {
    position: "absolute",
    bottom: 30,
    right: 0,
  },



});

export default styles;
