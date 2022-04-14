import { StyleSheet, Dimensions } from 'react-native';
import colors, {getHeight, getIconSize, getfontSize, getWidth} from "../../assets/colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    containerDetail:{
        flex:1,
        backgroundColor:colors.bgPrivate
    },
    image:{
       width: '100%',
       height: "45%", 
    },
    // containerImage:{
    //     borderRadius:50
    // },
    content:{
        backgroundColor:'#fff',
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        top:-(windowHeight/22),
        height:windowHeight/1.70,
        padding:windowWidth/15,
        paddingTop:windowWidth/20
    },
    contentHeader:{
        backgroundColor:'rgba(255, 255, 255, 0.4)',
        width:windowWidth,
        position:'absolute',
        zIndex:40,
        paddingBottom:10,
        borderBottomLeftRadius:10, 
        borderBottomRightRadius:10
    },
    nameProduct:{
        fontSize:getfontSize(windowWidth,13,windowWidth,10),
        fontFamily:"SquadaOne-Regular",
        flex: 1,
        flexWrap: 'wrap', 
        textAlign:"center",
        letterSpacing:1,
        color:colors.MarronDark,
        paddingBottom:windowHeight/120
    },
    descrip:{
        padding:5,
        paddingBottom:windowHeight/80,
        textAlign:'justify',
        marginTop:windowHeight/60,
        fontSize:getfontSize(windowWidth,27,windowWidth,21),
        fontWeight:'500',
        fontFamily:'Quicksand-VariableFont_wght',
    },
    price:{
        fontSize:getfontSize(windowWidth,15,windowWidth,10),
        fontFamily:"SquadaOne-Regular",
        flex: 1,
        flexWrap: 'wrap', 
        letterSpacing:1,
        color:colors.MarronDark,
        fontWeight:"bold"
    },
    buttonStyle:{
        borderColor:'transparent', 
        backgroundColor:colors.bgOrange,
        height:windowHeight/12,
    }


})

export default styles;