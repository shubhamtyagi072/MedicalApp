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
        backgroundColor: global.green,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 45 / 2
    },
    bottomView: {
        position: "absolute",
        bottom: 0,
        height: '18%',
        width: '100%',
        backgroundColor: global.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    typeView: {

        height: 200,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 2
    },
    roundIconView: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: global.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 25,
        marginLeft: 25

    },
    phoneView: {
        height: 70, width: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
    }
});

export default styles;