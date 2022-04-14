import React, {useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions} from 'react-native';
import Items from "./Items";
import { useSelector, useDispatch} from 'react-redux';
import {ressetCart} from '../../Redux/Actions/cart';
import { Button } from 'react-native-elements';
import colors, { getfontSize } from '../../assets/colors';
import { useNavigation, useRoute } from '@react-navigation/native';


const List = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
      const dispatch = useDispatch()
       const {cart: {listCart}} = useSelector(state => state)


      //  const ressetCountCart = () => {

      //       if(listCart.length === 0){
      //             dispatch(ressetCart(0))
      //       }
      // }
      //  useEffect(() => {
      //       ressetCountCart()
      //        return () => {
      //             ressetCountCart()
      //        }
      //  }, [])
      const navigation = useNavigation()
    return (
          <View style={{flex:1}} >
          <FlatList
                data={listCart}
                ListHeaderComponent={
                      <View style={{marginTop:10}}></View>
                }
                ListFooterComponent={
                  <View style={{marginBottom:10}}></View>
                }

                ListEmptyComponent= { 
                <View style={{padding:20}}>
                  <Text style={{fontSize:getfontSize(windowWidth, 18, windowWidth, 18), color:'black', fontWeight:'bold'}}>Votre panier est vide ! </Text>
                  <Button
                    title='REGALEZ-MOI'
                    buttonStyle={{
                          backgroundColor:colors.MarronDark,
                          borderRadius:15,
                          marginTop:10
                    }}
                    onPress={()=>navigation.navigate('Products')}
                  />
                </View>
                }
                renderItem={({item}) => <Items item={item} /> }
                keyExtractor={item => item.id}
            />

      </View>
    )
}

export default List
