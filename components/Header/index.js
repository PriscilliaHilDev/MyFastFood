import React, {useContext} from 'react'
import { View, Text, TouchableOpacity, Dimensions} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { withBadge, Icon as Icones } from 'react-native-elements'
import Categories from "../Categories";
import {FirebaseContext} from '../../FirebaseContext';
import colors, {getHeight, getIconSize, getfontSize, getWidth} from "../../assets/colors";


const index = ({check}) => {

    
    const {auth} = useContext(FirebaseContext);
 
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;


    const navigation = useNavigation();
    const route = useRoute();
  
    

    return (

            route.name !== 'Products' && route.name !== "FilterProducts" ?
        
            <View style={styles.contentHeader}>
                <TouchableOpacity
                    onPress={() => {
                        {
                            route.name == 'GetData' ?
                            check()
                            :
                            navigation.goBack();
                        }
                    
                    }}
                    style={{ left: 10, top:5, borderRadius:50,  width:getWidth(windowWidth,12, windowWidth, 7), height:getHeight(windowHeight,16,windowHeight,13.5), justifyContent:'center', paddingLeft:6,borderColor: 'rgba(90, 28, 0, 0.6)', borderWidth:2 }}
                >
                <Icon name="chevron-left"  size={getIconSize(windowWidth,17, windowWidth, 10)} color={colors.MarronDark}/>
                </TouchableOpacity>
            </View>
                :
                <View style={styles.navbar} >
                    <View style={styles.headerHome}>
                    
                    <View style={{position:'relative', left:windowWidth/3}}>
                            <Text style={{fontFamily:"SquadaOne-Regular", fontSize:getWidth(windowWidth,14, windowWidth, 12), paddingTop:5, color:colors.MarronDark}}>
                                MYFASTFOOD
                            </Text>
                        </View>
                        <View  style={{flexDirection:'row', justifyContent:'flex-end'}}>
                        <TouchableOpacity
                            onPress={
                                ()=> navigation.openDrawer()
                            }
                        >
                        <Icon name="bars" size={getIconSize(windowWidth,12,windowWidth,9)} color={colors.MarronDark} />
                        </TouchableOpacity>
                        </View>

                    </View>
                </View>
    )
}

export default index;
