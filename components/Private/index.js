import React, {useState, useEffect, useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Products from '../Products';
import { Dimensions, View } from 'react-native';
import Detail from '../Detail';
import Account from '../Account';
import Cart from '../Cart';
import Orders from "../Orders";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Content from './content';
import FilterProducts from "../filterProducts"
import DetailOrders from "../DetailsOrder";

import { useDispatch, useSelector } from 'react-redux';
import { productListByCategory } from '../../Redux/Actions/byCategory';
import {FirebaseContext} from '../../FirebaseContext';
import {itemsCart} from '../../Redux/Actions/cart'
import {getIdCart} from '../../Redux/Actions/tabOrderID'
import GetData from '../Cart/getData';



const index = () => {
  const {auth, queryAllOrderItems} = useContext(FirebaseContext);

  const  dispatch = useDispatch()
  const user = auth().currentUser

  const getlistCart = async() => {
    
    await queryAllOrderItems(user?.uid).onSnapshot((snapshot)=>{

      let allCart = [];
      let i = 0;

      snapshot && !snapshot.empty && snapshot.forEach(element => {
             i++
            allCart.push({id:element.id, ...element.data()});    
      });
      
      if(allCart.length == i){
        dispatch(itemsCart(allCart))
      }
    
      let limitArray = allCart.length
      let tabIdOrder = []

      for(let i = 0; i < limitArray; i++){
          tabIdOrder.push(allCart[i].id)
      }
      
       dispatch(getIdCart(tabIdOrder))
        
    });

}

useEffect(() => {
  
  const updateData = () =>{ route.name == 'Products' &&
              dispatch(productListByCategory(null))}
  
 
  getlistCart();
 
  return () => {
    updateData
 
  }
}, [])


  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();


  const DrawerHome = (props) => {
    return (
    
      <Drawer.Navigator  drawerContent={props => <Content {... props} />}>
        <Drawer.Screen name="Products" component={Products} />
        <Drawer.Screen name="FilterProducts" component={FilterProducts} />
        <Drawer.Screen name="Detail" component={Detail} />
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="Cart" component={Cart} />
        <Drawer.Screen name="GetData" component={GetData} />
        <Drawer.Screen name="Orders" component={Orders} />
        <Drawer.Screen name="DetailOrders" component={DetailOrders} />
      </Drawer.Navigator>
  
    );
  }


  return (
  
  
  <Stack.Navigator screenOptions={{headerShown:false}}>
  <Stack.Screen name="DrawerHome" component={DrawerHome} /> 
  <Stack.Screen name="Products" component={Products} />
  <Stack.Screen name="FilterProducts" component={FilterProducts} />
  <Stack.Screen name="Detail" component={Detail} />
  <Stack.Screen name="Account" component={Account} />
  <Stack.Screen name="Cart" component={Cart} />
  <Stack.Screen name="GetData" component={GetData} />
  <Stack.Screen name="Orders" component={Orders} />
  <Stack.Screen name="DetailOrders" component={DetailOrders} />
  </Stack.Navigator>
   
  )
}

export default index
