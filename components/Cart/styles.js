import { StyleSheet, Dimensions } from 'react-native';
import colors, {getHeight, getIconSize, getfontSize, getWidth} from "../../assets/colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.bgPrivate,
        padding:10,
        paddingTop:0, 
        paddingBottom:0
        // marginTop:5
    },
    containerListItem:{
        backgroundColor:colors.bgPrivate,
        paddingBottom:8,
        marginLeft:getWidth(windowWidth, 45, windowWidth, 300),
        marginRight:getWidth(windowWidth, 45, windowWidth, 300)

    },
    totalInfos:{
      padding:10,
      paddingLeft:20,
      paddingRight:20,
        marginTop:0,
     
        justifyContent:'flex-end'
    },
  
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      modalView: {
        margin: 20,
        backgroundColor:'#fff',
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      buttonStyle:{
        borderColor:'transparent', 
        backgroundColor:'#096418',
        height:windowHeight/12,
        margin:10,
        borderRadius:5,
        
    },
    name:{
      color:colors.MarronDark,
      fontSize:getfontSize(windowWidth, 20, windowWidth, 17),
      fontWeight:'bold',
      top:10,
      paddingTop:10,
      paddingBottom:20,
      paddingLeft:10,
      paddingRight:10
    },
      button:{
        backgroundColor:colors.bgOrange,
        height:windowHeight/18
      }

    
    

})

export default styles;