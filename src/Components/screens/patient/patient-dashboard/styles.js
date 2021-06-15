import { StyleSheet, Dimensions } from 'react-native';
import global from '../../../Common/global';
const windowHeight = Dimensions.get("screen").height;
const windowWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.green, //change

  },

  buttonPadding: {
    display: 'flex',
    flex:1,
    flexDirection:'column',
    marginLeft: 28,
    marginRight: 28
  },

  rowView: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%"
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
  bottomCardStyle: {
    height: 166,
    padding: 12
  },
  firstImage: {
    width: "45%",
    resizeMode: "contain",
    height: "100%"
  },
  cardRowView: {
    flexDirection: "row",
    display: "flex"
  },

  FirstRow: {
    width:'100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: '11%',
    marginBottom: '10%',
    paddingHorizontal: '15%',
    alignItems:'flex-start'
  },
  secondView: {
    flex:1,
    display: 'flex',
    flexDirection: 'row',
    alignItems:'flex-start',
  }
});

export default styles;