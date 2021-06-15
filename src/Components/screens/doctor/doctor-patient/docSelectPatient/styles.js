import { StyleSheet, Dimensions } from 'react-native';
import global from '../../../../Common/global';
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
        marginTop: '5%',
        marginBottom: '2%'
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
        height: '20%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40
    },
    roundIconView: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: global.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        marginLeft: 25

    },
    msgView: {
        height: 25,
        width: 25,
        backgroundColor: global.primary,
        borderRadius: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 25
    },
    bgColor: {
        backgroundColor: global.secondary,
    },
    roundIconView: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: global.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        marginLeft: 25
    },
    modalMainView: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex:1,
        paddingTop: '15%',
    },
    insideMainView: {
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'space-between',
        alignItems:'flex-start',
        marginHorizontal: '5%',
        marginVertical: '5%',
        backgroundColor: global.secondary,
        borderRadius: 10,
        paddingTop: '2%',
        minHeight: '70%',
        maxHeight: '90%',
        paddingBottom: '5%',
    },
    profileview: {
        display: 'flex',
        justifyContent:'space-between',
        height: '20%',
        maxHeight: '20%',
        maxWidth: '88%',
        marginHorizontal: '12%',
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
