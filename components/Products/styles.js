import { StyleSheet, Dimensions } from 'react-native';
import colors, {getHeight, getIconSize, getfontSize, getWidth} from "../../assets/colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFC26C",
    
    },
    
    priceProduct:{
        color:colors.bgOrange,
        fontWeight:'bold', 
        fontSize:getfontSize(windowWidth,25,windowWidth,18),
        position:'absolute',
        left:windowHeight/60,
        bottom:windowHeight/60
    },
    containerCard:{
        
        flex:1,
        padding:10,
        paddingTop:0,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#fff',
    },
   
    nameProduct:{
        textAlign:"left",
        fontSize:getfontSize(windowWidth,28,windowWidth,22),
        fontWeight:'bold',
        flex: 1,
        flexWrap: 'wrap', 
        color:'#6E2505'
       
    },

    
  
    
    

})

export default styles;