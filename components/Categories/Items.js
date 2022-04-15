import React, {useEffect, useState, useContext} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import {FirebaseContext} from '../../FirebaseContext';
import { useNavigation, useRoute} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { productListByCategory } from '../../Redux/Actions/byCategory';


const Items = ({item}) => {

    const navigation = useNavigation();
    const route = useRoute()

    const dispatch = useDispatch()
    const {byCategory} = useSelector(state => state)

    const filterProduct = () => {
        dispatch(productListByCategory(item.id))
        navigation.navigate("FilterProducts", {idCat:item.id})
    }


  
     const getActif = (id) => {
         if(route.name == 'Products' && id == null){
            return <Text style={styles.menuItemActive}>{item.name}</Text>
         }
         if(id == byCategory){
           return <Text style={styles.menuItemActive}>{item.name}</Text>
         }else{
            return <Text style={styles.menuItem}>{item.name}</Text> 
         }
     }
  
    return (
        <View>
                <TouchableOpacity
                    onPress={() =>filterProduct(item.id)}
                >
                  {getActif(item.id)}
                </TouchableOpacity>
        
        </View>
    )
}

export default Items
