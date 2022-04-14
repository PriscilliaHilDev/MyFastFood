import { StyleSheet, Dimensions } from 'react-native';
import colors, {getHeight, getIconSize, getfontSize, getWidth} from "../../assets/colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.bgPrivate,
    },
    avatar:{
        justifyContent:'center',
        alignItems:"center",
        padding:30
    },
    userName:{
        textAlign:"center",
        fontSize:getfontSize(windowWidth,15,windowWidth, 12),
        fontWeight:'bold',
        flexWrap: 'wrap', 
    },
    userEmail:{
        textAlign:"center",
        fontSize:getfontSize(windowWidth,24,windowWidth, 19),
        flex: 1,
        flexWrap: 'wrap', 

    },

    btn:{
        justifyContent:'center',
        alignItems:"center",
        padding:20
    },
    shop:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-around',
        borderBottomWidth:2,
        width:"90%",
    },
    bottomContent:{
        flex:1,
        justifyContent:'flex-end',
    },
    btnDelete:{
        borderRadius:5,
        marginBottom:windowWidth/30,
        fontSize:26,
        fontWeight:'bold',
        backgroundColor:colors.bgOrange,
        marginLeft:20,
        marginRight:20,
        borderColor:'#520906',
        height:windowHeight/12
    },
    
})

export default styles;