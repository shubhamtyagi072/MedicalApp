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
        marginTop: 30,

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
        position: "absolute",
        bottom: 0,
        height: '8%',
        width: '100%',
        backgroundColor: global.secondary
    },
    typeView: {

        height: 180,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 2
    },
    roundIconView: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: global.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 25,


    },
    roundBtnView: {
        width: '90%',
        height: '25%',
        borderRadius: 20,
        alignSelf: 'center',
        backgroundColor: '#f5f5f5',
        marginTop: 20,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center'
    },
    insideRoundView: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: global.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },

    bgColor: {
        backgroundColor: global.secondary,
    },
    modalMainView: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1
    },
    insideMainView: {
        flex: 1,
        marginHorizontal: '5%',
        marginVertical: '10%',
        backgroundColor: global.primary,
        borderRadius: 10

    },
    profileview: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    roundIconView1: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: global.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 25,
        marginLeft: 25

    },
});

export default styles;