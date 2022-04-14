import { StyleSheet } from 'react-native';
import colors, {getfontSize} from "../../assets/colors";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    content:{
        flex:1,
        backgroundColor:colors.bgPublic,
        padding:windowWidth/30
    },
    headerContent:{
        flex:1,   
        justifyContent:'center',
        bottom:windowWidth/20
    },
    bottomContent:{
        flex:1,
        justifyContent:'flex-end',
    }, 
    btnRegister:{
        borderRadius:5,
        height:windowHeight/12,
        backgroundColor:colors.bgOrange,
        fontWeight:"bold"
    },
    btnLogin:{
        borderRadius:5,
        marginBottom:windowWidth/30,
        height:windowHeight/12,
        fontWeight:'bold',
        backgroundColor:"#fff",

    },
    titleMain:{
        fontSize:getfontSize(windowWidth, 10,windowWidth, 9),
        textAlign:'center',
        fontFamily:"SquadaOne-Regular",
        color:"#fff",
        paddingLeft:50,
        paddingRight:50

    },
    image:{
        flex:1,
        backgroundColor:colors.bgPublic,
    }

})

export default styles;