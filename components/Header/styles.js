import { StyleSheet } from 'react-native';
import colors, { getWidth } from "../../assets/colors";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
 
    navbar:{
        backgroundColor:"white",
        elevation:5,
        //marginBottom:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    },
   
    header:{
        
        flexDirection:"row", 
        justifyContent:'space-between',
        marginRight:10,        
        marginLeft:10,
        margin:5,
      
    },
    headerHome:{
        
        flexDirection:"row", 
        justifyContent:'space-between',
        marginRight:10,
        marginTop:8,
        marginBottom:8,
       
    },
    contentHeader:{
        backgroundColor:'rgba(255, 255, 255, 0.4)',
        width:windowWidth,
        height:getWidth(windowWidth,10, windowWidth, 6),
         zIndex:40,
        paddingBottom:10,
        borderBottomLeftRadius:10, 
        borderBottomRightRadius:10
    },
 
})

export default styles;