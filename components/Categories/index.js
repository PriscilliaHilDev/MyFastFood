import React, {useEffect} from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import List from "./List";
import styles from './styles';
import { productListByCategory } from '../../Redux/Actions/byCategory';
import { useNavigation, useRoute } from '@react-navigation/native';


const index = () => {

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

    // const navigation = useNavigation()

    // const noFilter = () => {
    //     dispatch(productListByCategory(0))
    //     navigation.navigate("Products")
    // }



    return (
      
        <View style={styles.container}>
            <View style={styles.menuStyle}>
            <List/>
            </View>
        </View>
            
    )
}

export default index
