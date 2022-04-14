import { StyleSheet, Dimensions } from 'react-native';
import colors, {getHeight, getIconSize, getfontSize, getWidth} from "../../assets/colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const styles = StyleSheet.create({
    container:{
        backgroundColor:"#FFC26C",
        paddingTop:getWidth(windowWidth,24, windowWidth, 28),
        paddingBottom:getWidth(windowWidth,70, windowWidth, 200),
        paddingLeft:10,
    },
    menuItem:{
        color:colors.MarronDark,
        borderRadius:30,
        backgroundColor:"#FF9133",
        padding:getWidth(windowWidth,70,windowWidth, 70),
        marginRight:10,
        fontSize:getfontSize(windowWidth,28, windowWidth,20),
        fontWeight:'bold',
        elevation:1
    },
    menuItemActive:{
        color:"#fff",
        borderRadius:30,
        backgroundColor:colors.bgOrange,
        padding:windowWidth/70,
        marginRight:15,
        fontWeight:"bold",
        elevation:1,
        fontSize:getfontSize(windowWidth,28, windowWidth,20),
        elevation:1

    },
    menuStyle:{
        flexDirection:'row',
        paddingBottom:20,
    }
    

})

export default styles;