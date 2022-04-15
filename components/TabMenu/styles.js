import { StyleSheet } from 'react-native';
import colors, {getHeight, getIconSize, getfontSize, getWidth} from "../../assets/colors";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container : {
       backgroundColor:'white',
       height:windowHeight/10,
       borderTopLeftRadius:20,
       borderTopRightRadius:20,
       width:windowWidth,
       position:'absolute',
       bottom:0,
       borderTopColor:colors.bgPrivate,
       borderWidth:1,
       borderStartColor:colors.bgPrivate,
       borderEndColor:colors.bgPrivate,
       borderBottomColor:'white'
       
    },
    menu:{
        flex:1,
        flexDirection:"row",
        justifyContent:'space-between',
        padding:5,
        paddingLeft:15,
        paddingRight:15,
    },
    buttonRonded:{
        alignItems:'center',
        justifyContent:'center',
        width:getWidth(windowWidth,12, windowWidth, 7),
        width:getWidth(windowWidth,12, windowWidth, 7),
        backgroundColor:'#fff',
        borderRadius:50,
        backgroundColor:colors.MarronDark,
       
    },
    buttonRondedInactif:{
        alignItems:'center',
        justifyContent:'center',
        width:getWidth(windowWidth,8.6, windowWidth, 5.9),
        height:getWidth(windowWidth,8.6, windowWidth, 5.9),
        backgroundColor:'#fff',
        borderRadius:50,
        backgroundColor: 'rgba(90, 28, 0, 0.6)',
    }
   
  

})

export default styles;