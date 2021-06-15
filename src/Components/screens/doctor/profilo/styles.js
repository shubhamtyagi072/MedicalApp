import { StyleSheet, Dimensions } from 'react-native';
import global from '../../../Common/global';
import { color } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const windowHeight = Dimensions.get("screen").height;
const windowWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: global.white,

    },
    centerSqure: {
        marginTop: windowHeight * 0.06,
        height: '100%',
        borderRadius: 20,
        backgroundColor: 'white',
        width: '100%',
    },

    bottomView: {
        bottom: 0,
        position: 'absolute',
        height: '8%',
        width: '100%',
        backgroundColor: global.secondary
    },
    profilView: {
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30,
        alignSelf: 'center',
        backgroundColor: global.secondary
    },
    profileBottomView: {
        borderBottomEndRadius: 20,
        flex: 1
    },
    subView: {
        flex: 1,
        paddingLeft: 30,
        justifyContent: 'center',
    },
    secondSubView: {
        borderTopColor: 'rgba(192,192,192,0.3)',
        borderTopWidth: 2,
    },
    buttonPadding: {
        maxWidth: '99%',
        paddingBottom: 55,
        flex:1
    }
});

export default styles;
