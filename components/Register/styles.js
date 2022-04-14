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
        padding:20,
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
        paddingTop:15,
        paddingBottom:5
    },
    forgetPass:{
        fontSize:18,
        textAlign:"right",
        color:colors.titlePublic,
    },
   
    
    btnRegister:{
        borderRadius:5,
        fontSize:26,
        fontWeight:'bold',
        backgroundColor:'#fff',
        alignContent:'center',
        backgroundColor:colors.bgOrange,
        height:windowHeight/12,

    },
    input:{
        borderColor:'transparent', 
        backgroundColor:'whitesmoke',
        borderRadius:40,
        height:windowHeight/15,
        marginLeft:getWidth(windowWidth,60,windowWidth,300),
        marginRight:getWidth(windowWidth,60,windowWidth,300)
    },
    inputPhone :{
        borderColor:'transparent', 
        backgroundColor:'whitesmoke',
        borderRadius:40,
        height:windowHeight/15,
        marginBottom:30,
        marginTop:0,
        margin:10,
        width:windowWidth/1.15
        
    }
    
    
 
   
   
  

})

export default styles;