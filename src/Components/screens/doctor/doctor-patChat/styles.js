import { StyleSheet, Dimensions } from 'react-native';
import global from '../../../Common/global';
import { color } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
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
        marginTop: 30
    },
    topHeaderView: {
        height: 70,
        backgroundColor: global.green,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight : 5,
        paddingBottom : 8,
        paddingLeft : 5
      },
      sendingContainerPlusIcon: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft : 5,
          paddingBottom : 8,
          //paddingLeft : 5
        },
      loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
    bottomView: {
        alignSelf: 'flex-end',
        height: '8%',
        width: '100%',
        backgroundColor: 'white'
    },
    typeView: {

        height: '20%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 2
    },
    roundIconView: {
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: global.green,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 25,
        marginLeft: 25

    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
});

export default styles;
