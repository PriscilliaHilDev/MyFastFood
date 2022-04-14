import React, {useEffect, useContext, useState} from 'react'
import { View, Text, ActivityIndicator} from 'react-native';
import List from "./List";
import styles from "./styles";
import Categories from "../Categories";
import Header from "../Header";
import LottieView from "lottie-react-native";

import { useDispatch, useSelector} from 'react-redux';
import {FirebaseContext} from '../../FirebaseContext';
// import {itemsCart} from '../../Redux/Actions/cart'
// import {getIdCart} from '../../Redux/Actions/tabOrderID'
// import { useFocusEffect } from '@react-navigation/native';
import { productListByCategory } from '../../Redux/Actions/byCategory';
import TabMenu from '../TabMenu';



const Products = ({navigation}) => {

    const {auth, queryAllOrderItems} = useContext(FirebaseContext);
    const {cart:{listCart}} = useSelector(state => state)
    const {loaders:{loadDatas}} = useSelector(state => state);
    

    // console.log(listProducts, 'listProducts')
    
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    // const user = auth().currentUser
  
    //   const getlistCart = async() => {
      
    //       await queryAllOrderItems(user.uid).onSnapshot((snapshot)=>{
    //       let allCart = [];
    //       snapshot && !snapshot.empty && snapshot.forEach(element => {
    //           allCart.push({id:element.id, ...element.data()});    
    //       });
    //       // setCart(allCart);
    //       dispatch(itemsCart(allCart))

    //       let limitArray = allCart.length
    //       let tabIdOrder = []
    //       for(let i = 0; i < limitArray; i++){
    //         tabIdOrder.push(allCart[i].id)
    //       }
    //       // tableau contenant l'id de chaque order item pour faire un update lors de la validation de la commande
    //         dispatch(getIdCart(tabIdOrder))
          
        
    //  });
        
    // }

   
    // // animation a chaque fois que je me rends sur la navigation !
    // useFocusEffect(
    //   React.useCallback(() => {
    //     // Do something when the screen is focused
    //     setLoading(false)
       
    //     setTimeout(() => {
    //       setLoading(true)
    //     }, 2000);
  
    //     return () => {
    //       // Do something when the screen is unfocused
    //       // Useful for cleanup functions
    //     };
    //   }, [])
    // );

  // loading au montage du composant produits et dans list le loading lorsque les données sont rafraichis

      useEffect(() => {
      
        dispatch(productListByCategory(null))
        setTimeout(() => {
          setLoading(false)
        }, 2000);

        // const subscribeProducts = getlistCart();
      
        // return () => {
        //   subscribeProducts;
          
        // }
      }, [])



    return (

        <View style={styles.container}>
             <Header/>
            {
              loadDatas &&
              <LottieView
                source={require('../../assets/lotties/valide.json')}
                autoPlay
                loop
              />
            }
            {
              loading &&

              <LottieView
                source={require('../../assets/lotties/sauce.json')}
                autoPlay
                loop
              />
            }

            { !loadDatas && !loading &&
              
              <List navig={navigation}/>
            }
          <TabMenu/>
        </View>
    
    )
}

export default Products
