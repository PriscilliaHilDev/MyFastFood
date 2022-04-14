import React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'

import styles from './styles';
import { SocialIcon } from 'react-native-elements'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors, {getHeight, getIconSize, getfontSize, getWidth} from "../../assets/colors";
import { withBadge, Icon as Icones, Avatar, Badge} from 'react-native-elements'
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

const TabMenu = () => {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;


  const {cart:{listCart, nbUpCart}} = useSelector(state => state)
  const route = useRoute()
  const navigation = useNavigation()

    const toggleNbCart = () => {
        if(listCart.length > 0){
            let totalItem = 0;
            listCart.forEach(element => {
                totalItem = totalItem + element.quantity
            })
             return totalItem;
        }else{
            return 0;
        }
    }

    // const BadgedIcon = withBadge(toggleNbCart())(Icones)

    const BadgedIcon = () => {
      return (
        <View style={{flex:1, justifyContent:'center'}}>
          <Icon name={"home"}
            color='#fff'
            name="shopping-cart" 
            size={getIconSize(windowWidth,11,windowWidth,8)}
          />
          <Badge
            textStyle={{fontSize:getfontSize(windowWidth, 28, windowWidth, 20)}}
            badgeStyle={{width:getWidth(windowWidth, 15, windowWidth, 12),
                         borderRadius:50,
                         height:getHeight(windowHeight, 20, windowHeight, 23), 
                        //  backgroundColor:'green'
                        backgroundColor:'green'
                        }}
            containerStyle={{position:'absolute',
                             left:getWidth(windowWidth,12, windowWidth, 9),
                             bottom:getWidth(windowWidth,18, windowWidth, 12),
                            }}
            value={toggleNbCart()}  
            size={20}
          />
      </View>
      )
    }
   


    return (
      <View style={styles.container}>
       
         <View style={styles.menu}>
         <TouchableOpacity
            //style={styles.buttonRonded}
            style={{
              top:windowHeight/70
            }}

            onPress={()=>navigation.navigate('Products') }
          >
          {
            route.name == 'Products' || route.name == 'FilterProducts' ?
            <Icon name={"home"}  size={getIconSize(windowWidth,12,windowWidth,9)}color={colors.MarronDark} />
            :
            <Icon name={"home"}  size={getIconSize(windowWidth,12,windowWidth,9)} color='rgba(90, 28, 0, 0.6)' />
          }
         
        </TouchableOpacity>
        
         {
           route.name == 'Cart' ? 
           <TouchableOpacity
             style={styles.buttonRonded}
             onPress={()=>navigation.navigate('Cart') }
           >
             <BadgedIcon  />
          </TouchableOpacity>

          :

          <TouchableOpacity
             style={styles.buttonRondedInactif}
             onPress={()=>navigation.navigate('Cart') }
           >
             <BadgedIcon  color='#fff' name="shopping-cart" size={getIconSize(windowWidth,12,windowWidth,8.5)}   />
          </TouchableOpacity>

         }
         
          <TouchableOpacity
            //style={styles.buttonRonded}
            style={{
              top:windowHeight/70

            }}
            onPress={()=>navigation.navigate('Account') }
          >
         {
            route.name == 'Account' ?
            <Icon name={"user"}  size={getIconSize(windowWidth,12,windowWidth,9)} color={colors.subTitle} />
            :
            <Icon name={"user"} size={getIconSize(windowWidth,12,windowWidth,9)} color='rgba(90, 28, 0, 0.6)' />
          }
        </TouchableOpacity>
         </View>
      </View>
    )
}

export default TabMenu
