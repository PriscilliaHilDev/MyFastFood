import { StyleSheet } from 'react-native';
import colors from "../../assets/colors";



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.bgPrivate,
        padding:10,
        marginTop:5
    },
    containerListItem:{
        backgroundColor:colors.bgPrivate,
        paddingBottom:5,
    },
    titleOrders:{
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
        padding:10,
        paddingTop:20,
    },
    SubtitleOrders:{
        fontSize:15,
        textAlign:'center',
        padding:10,
        paddingTop:20,
        color:colors.subTitle
    }

    
    

})

export default styles;