import React, {useEffect, useContext, useState} from 'react'
import { View, Text, ActivityIndicator} from 'react-native';
import List from "./List";
import styles from "./styles";
import Categories from "../Categories";
import Header from "../Header";
import LottieView from "lottie-react-native";
import { useDispatch, useSelector} from 'react-redux';
import {FirebaseContext} from '../../FirebaseContext';
import { productListByCategory } from '../../Redux/Actions/byCategory';
import TabMenu from '../TabMenu';



const Products = ({navigation}) => {

    const {auth, queryAllOrderItems} = useContext(FirebaseContext);
    const {cart:{listCart}} = useSelector(state => state)
    const {loaders:{loadDatas}} = useSelector(state => state);
    
    
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
   

      useEffect(() => {
      
        dispatch(productListByCategory(null))
        setTimeout(() => {
          setLoading(false)
        }, 2000);

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
