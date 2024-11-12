import React, { useState ,useEffect, useContext} from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity, Dimensions} from 'react-native';
import { Avatar, ListItem, Button } from 'react-native-elements';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from '../../FirebaseContext';
import { toggleShowModal } from '../../Redux/Actions/editCart';
import { useNavigation } from '@react-navigation/native';
import {lessCart} from '../../Redux/Actions/cart';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import colors, {getHeight, getIconSize, getfontSize, getWidth} from "../../assets/colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Items = ({item}) => {

    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const [price, setPrice] = useState(null)
    const {deleteOrderItem, queryOneProduct} = useContext(FirebaseContext);
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {cart:{listCart}} = useSelector(state => state)


    const GetDatas = async () => {
      
        await queryOneProduct(item.product_id).onSnapshot((snapshot)=>{
          if(!!snapshot && listCart.length > 0){
            console.log(snapshot, 'tabb')

            setName(snapshot?.data()?.name)
            setPrice(snapshot?.data()?.price)
            setImage(snapshot?.data()?.image_url)  
          }                   
        })
    }

    const showEditModal = (id, idProduct) => {
        dispatch(toggleShowModal({
            modal:true,
            idOrderItem:id,
            idProductOrder:idProduct
        }))
    }

    const deleteItem =  (id) => {
        Alert.alert(
            "Confirmer suppression ",
            " Supprimer ce plat ?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: () =>  deleteOrderItem(id)
                                           
              }
            ]
          );

        
    }
     useEffect(() => {
         const datasUp = getDatas()
         return () => {
            datasUp;
         }
     }, [])

    return (
        
    <View style={styles.containerListItem}>
     <ListItem.Swipeable
        	
        leftContent={
          <Button
           title="Editer"
            icon={{ name: 'edit', color: 'white', size:getIconSize(windowWidth, 20, windowWidth, 15) }}
            titleStyle={{ fontSize:getWidth(windowWidth,25, windowWidth,22)}}
            buttonStyle={{ 
                minHeight: '100%',
                borderTopRightRadius:0,
                borderBottomRightRadius:0,
                borderTopLeftRadius:getWidth(windowWidth,10, windowWidth,2),
                borderBottomLeftRadius:getWidth(windowWidth,10, windowWidth,2),
                backgroundColor:colors.bgOrange,
            }}
            
            onPress={()=> {showEditModal(item.id, item.product_id)}}

          />
        }
        rightContent={
          <Button
            title="Retirer"
            titleStyle={{ fontSize:getWidth(windowWidth,25, windowWidth,22)}}
            icon={{ name: 'delete', color: 'white', size:getIconSize(windowWidth, 20, windowWidth, 15)  }}
            buttonStyle={{ 
                minHeight: '100%', 
                backgroundColor: 'red',
                borderBottomLeftRadius:0,
                borderTopLeftRadius:0,
                borderTopRightRadius:15,
                borderBottomRightRadius:15,
                backgroundColor:colors.MarronDark,
                padding:10
            }}
            onPress={()=> {deleteItem(item.id)}}
          />
        }
        containerStyle={{
            backgroundColor:'#fff',
            borderTopLeftRadius:getWidth(windowWidth,10, windowWidth,2),
            borderBottomLeftRadius:getWidth(windowWidth,10, windowWidth,2),            borderBottomRightRadius:getWidth(windowWidth,10, windowWidth,2),
            height:getHeight(windowHeight,6, windowHeight, 6.5),
            maxHeight:getHeight(windowHeight,6, windowHeight, 6.5),
            width:"100%",
            maxWidth:"100%",
            backgroundColor:'#fff',
            borderTopRightRadius:15,
            borderBottomRightRadius:15
        }}
      >
        <TouchableOpacity>
        <Avatar  source={{ uri:image}} 
           rounded
           size={getIconSize(windowWidth,6, windowWidth, 4.2)}
           onPress={()=>navigation.navigate("Detail", {id:item.product_id})}

        />
        </TouchableOpacity>
       
          <ListItem.Content >
            <ListItem.Title style={{ color: colors.bgOrange, fontWeight:'bold', textAlign:'center', position:'relative', left:getWidth(windowWidth, 15, windowWidth, 300), fontSize:getfontSize(windowWidth, 28, windowWidth, 20) }}>
                {name}
            </ListItem.Title>
            <View style={{flexDirection:'row',height:getHeight(windowHeight, 22, windowHeight, 25), width:getWidth(windowWidth, 1.8, windowWidth, 2), justifyContent:'space-between',padding:getfontSize(windowWidth,150, windowWidth, 180),
              borderRadius:getIconSize(windowWidth, 14, windowWidth, 15), backgroundColor:colors.MarronDark,
              paddingLeft:getWidth(windowWidth, 15, windowWidth, 15), paddingRight:getWidth(windowWidth, 15, windowWidth, 15), position:'relative', left:getWidth(windowWidth, 15, windowWidth, 300)
            }}>
              <ListItem.Subtitle style={{ color: "#fff", fontWeight:'bold', fontSize:getfontSize(windowWidth,30, windowWidth, 20)}}>
                {price} €
              </ListItem.Subtitle>
              <ListItem.Subtitle style={{ color: "#fff", fontWeight:'bold', fontSize:getfontSize(windowWidth,30, windowWidth, 20), marginLeft:'40%'}}>
                <Text style={{fontSize:getWidth(windowWidth,35, windowWidth,32)}}>x</Text>{item.quantity}
              </ListItem.Subtitle> 
            </View>
            <Icon name='chevron-right' color='black' size={getIconSize(windowWidth,35, windowWidth, 35)} style={{position:'absolute', right:0}}/>

            <ListItem.Subtitle style={{ color: colors.MarronDark, fontWeight:"700",  left:getWidth(windowWidth, 15, windowWidth, 300), fontSize:getfontSize(windowWidth, 28, windowWidth, 20)}}>
               Sous-Total: {item.quantity * price } €
              </ListItem.Subtitle>
          </ListItem.Content>

      </ListItem.Swipeable>
      </View>
    )
}

export default Items