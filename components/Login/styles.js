import { StyleSheet } from 'react-native';
import colors, {getfontSize, getWidth} from "../../assets/colors";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    content:{
        flex:1,
        padding:10,
        backgroundColor:colors.bgPublic,
        flexDirection: 'column',
    },
    avatar:{
        padding:getfontSize(windowWidth,25,windowWidth, 20),
        justifyContent:'center',
        alignItems:"center",
        position:'relative',
    },
  
    title: {
        fontFamily:"SquadaOne-Regular",
        fontSize:getfontSize(windowWidth,10,windowWidth, 8),
        textAlign:"center",
        color:"#fff",
        padding:15,
        paddingTop:25
    },
    forgetPass:{
        fontSize:18,
        textAlign:"right",
        color:colors.titlePublic,
    },
    bottomContent:{
        marginTop:10,
    },
    
    btnLogin:{
        borderRadius:5,
        height:windowHeight/12,
        fontSize:26,
        fontWeight:'bold',
        backgroundColor:'#fff',
        alignContent:'center',  
    },
    input:{
        borderColor:'transparent', 
        backgroundColor:'whitesmoke',
        borderRadius:40,
        height:windowHeight/15,
        marginLeft:getWidth(windowWidth,60,windowWidth,300),
        marginRight:getWidth(windowWidth,60,windowWidth,300)
    },
    
    
 
   
   
  

})

export default styles;