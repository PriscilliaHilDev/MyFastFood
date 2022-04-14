import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native';
import List from "./List";
import Header from '../Header';
import styles from './styles';
import colors from '../../assets/colors';
import TabMenu from '../TabMenu';
import { useDispatch, useSelector } from 'react-redux';
import Infos from './infos';
import { getOrderLoad } from '../../Redux/Actions/loaders';
import LottieView from "lottie-react-native";

const index = () => {

  const dispatch = useDispatch()
   const {loaders:{orderLoad}}  = useSelector(state => state)


    useEffect(() => {
        dispatch(getOrderLoad(true))
        return () => {
            
        }
    }, [])


    return (
      
        <View style={{backgroundColor:colors.bgPrivate, flex:1}}>
            <Header/>
            <View style={styles.container}>
                {
                    orderLoad ?
                    <LottieView
                    source={require('../../assets/lotties/paymentorder.json')}
                    autoPlay
                    loop
                  />
                    :
                    <>
                    <List/>
                    <Infos/>
                    </>
                }
             
            </View>
            {/* <TabMenu/> */}
        </View>
            
    )
}

export default index
