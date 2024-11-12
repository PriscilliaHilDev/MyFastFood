import React, {useEffect, useState, useContext} from 'react'
import { View, Text } from 'react-native';
import List from "./List";
import styles from "./styles";
import Categories from "../Categories";
import Header from "../Header";
import { FirebaseContext } from '../../FirebaseContext';
import { useSelector, useDispatch } from 'react-redux';
import TabMenu from '../TabMenu';
import LottieView from "lottie-react-native";


const Index = ({navigation}) => {

    const {auth} = useContext(FirebaseContext);
    const user = auth().currentUser
    const {loader} = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const  dispatch = useDispatch()


    useEffect(() => {
    

        setTimeout(() => {
          setLoading(false)
        }, 2000);

        return () => {
            cleanup
        }
    }, [])
 
    
    return (

        <View style={styles.container}>
            <Header/>
            {
              loader &&
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

            { !loader && !loading &&
              
              <List navig={navigation}/>
            }
            <TabMenu/>
        </View>
    
    )
}

export default Index
