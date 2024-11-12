import React, {useEffect} from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import List from "./List";
import styles from './styles';
import { productListByCategory } from '../../Redux/Actions/byCategory';
import { useNavigation, useRoute } from '@react-navigation/native';


const Index = () => {

    const {byCategory} = useSelector(state => state);
    const dispatch = useDispatch();
    const route = useRoute()

    useEffect(() => {
        if(route.name == "Products"){
            dispatch(productListByCategory(null))
        }
        return () => {
        }
    }, [])


    return (
      
        <View style={styles.container}>
            <View style={styles.menuStyle}>
            <List/>
            </View>
        </View>
            
    )
}

export default Index
