import React, {useContext, useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import colors, {getHeight, getfontSize, getWidth, getIconSize} from "../../assets/colors";
import { FirebaseContext } from '../../FirebaseContext';
import { useSelector, useDispatch } from 'react-redux';
import {nbUpCart, nbAddCart, ressetCart} from '../../Redux/Actions/cart';
import {getLoading} from '../../Redux/Actions/loader'
import { useToast } from "react-native-toast-notifications";


const Items = ({item, navigat}) => {
    const toast = useToast();


    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height

    const {auth, queryAddOrderItems, updateOrderItem} = useContext(FirebaseContext);
    const {cart:{listCart}} = useSelector(state => state)
    const user = auth().currentUser
    const dispatch = useDispatch()



    const loaderTime = () =>{
        return(
            setTimeout(() => {
                dispatch(getLoading(false))
            }, 2000)
        )
    }
    const getMessageSuccess = () => {
        return(
            toast.show(item.name+ ' ajouté au panier !' , {
                type: "normal",
                placement: "top",
                duration: 2000,
                offset: 30,
                animationType: "slide-in ",
              })
           
        )
    }


    const toggleActionCart = (id) => {
      
        let verif = ''
        dispatch(getLoading(true))

      
        if(listCart.length > 0){
            
            listCart.filter(element => {
                if(element.product_id === id){
                    verif=true
                    updateOrderItem(element.id, {
                        quantity:parseInt(element.quantity+1)
                    }).then(() => {
                        //dispatch(nbUpCart(getCurrentQuantityOfCart()+1))
                        getMessageSuccess()
                        loaderTime()
                    })
                    return;
                }
            })

            if(!verif){
                queryAddOrderItems({
                    createdAt: new Date(),
                    product_id: id,
                    user_id:user.uid, 
                    quantity:1,
                    order_id:null
                }).then(() => {
                   // dispatch(nbAddCart())
                   getMessageSuccess()
                   loaderTime()
                })
            }
        }else{
            queryAddOrderItems({
                createdAt: new Date(),
                product_id: id,
                user_id:user.uid, 
                quantity:1,
                order_id:null
            }).then(() => {
               // dispatch(nbAddCart())
               getMessageSuccess()
               loaderTime()
            })
        }
        
    }   

    const cardDimension = (windowWidth)/2.2;
    const cardHeight = (windowHeight)/3
    return (
       
    
        <TouchableOpacity
        onPress={()=>navigat.navigate("Detail", {id:item.id})}
    >
        <View style={{ flex:1, flexDirection:'row' , justifyContent:'center', marginRight:0, marginLeft:windowWidth/35, marginBottom:windowWidth/40}}>
            <View style={{
                width: cardDimension,
                height:getHeight(windowHeight,3, windowHeight,3.2),
                maxWidth:cardDimension,
                maxHeight:cardHeight,
                borderRadius:15,
                backgroundColor:"#fff",
            }}>
            <Image  style={{ width: '100%', height: "60%", borderTopRightRadius:5, borderTopLeftRadius:5 }}    source={{uri: item.image_url}} />
                <View style={{flexDirection:'row', padding:10,  backgroundColor:'white'}}> 
                    <Text style={styles.nameProduct}>
                        {item.name} 
                    </Text>
                </View>
                <View style={styles.containerCard}>
                    <Text style={styles.priceProduct}>{item.price} €</Text>
                    <TouchableOpacity
                        onPress={()=>toggleActionCart(item.id)}
                        style={{
                            position:'absolute',
                            right:windowWidth/60,
                            bottom:windowWidth/60
                        }}
                    >
                    <Icon name="plus-circle" size={getWidth(windowWidth, 12, windowWidth, 10)} color={colors.bgOrange}  />
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    </TouchableOpacity>
        
    
    )
}

export default Items
