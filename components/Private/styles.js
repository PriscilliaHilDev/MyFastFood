import { StyleSheet, Dimensions } from 'react-native';
import colors, {getHeight, getIconSize, getfontSize, getWidth} from "../../assets/colors";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const styles = StyleSheet.create({
    content:{
        flex:1,
    },
    userName:{
        textAlign:"center",
        fontSize:getfontSize(windowWidth,20, windowWidth, 15),
        fontWeight:'bold',
        flex: 1,
        flexWrap: 'wrap', 
        textAlign:"center"
    },
    logout:{
        marginBottom:15,
        borderTopColor:'black',
        borderTopWidth:1,
        
    },
    contentInfos:{
        flexDirection:'row',
        marginTop:15
    },
    preferences:{
        flexDirection:'row',
        justifyContent:"space-between",
        paddingVertical:12,
        paddingHorizontal:16
    },
    userInfos:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
    
    

})

export default styles;