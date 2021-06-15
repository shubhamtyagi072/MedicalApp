import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";



export default class BackHeadder extends React.Component{
    render(){
        return(
            <View style={styles.shedoBox}>
            <View style={styles.mainView}>
                { this.props.shoIcon ?
                    <TouchableOpacity onPress={this.props.onMenuTap}>
           <Image source={require("../Image/back.png",)} style = {{height:30,width:30}} />
          
           </TouchableOpacity> :<View style={{width:0}}/>
                }
                
           <View style={styles.textView}>
            <Text style={styles.titalTxt}>
                {this.props.tital}
            </Text>
           </View>
           <View style={{width:45}}/>
            </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    shedoBox:{
        height:60,
       
        width:"100%",
        borderBottomColor:"#000000",
        shadowColor: '#000000',  
   shadowOpacity: 0.5,
   shadowRadius: 2,
   elevation: 2,
    },
    mainView:{
        height:60,
       
        width:"100%",
        marginLeft:15,
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row",
       
    },
    textView:{
        alignSelf:"center",
       
    },
    titalTxt:{
        fontSize:22,
        color:"black"
    }
  });