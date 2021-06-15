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
        marginTop: 10
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
        height: 270,
        backgroundColor: global.secondary
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
        backgroundColor: global.secondary,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 45 / 2,
    },
    commonImageStyle: {
        bottom: 30,
        alignSelf: 'center'
    },
    forgotPasswordStyle: {
        top : 10,
        alignSelf: 'center'
    },

});

export default styles;
