import React, {useState, useContext, useEffect} from 'react';
import { View, Text, FlatList} from 'react-native';
import Items from "./Items";
import { useRoute } from '@react-navigation/native';


const List = () => {
   
    // const { id } = route.params;
    const routeNav = useRoute();
    const tabItemsOfOrders = routeNav.params.tab
  
    return (
     
            <FlatList
                data={tabItemsOfOrders}
                ListEmptyComponent= {()=> <Text>Cette commande est incorrecte </Text>}
                renderItem={({item}) => <Items item={item} /> }
                keyExtractor={item => item.id}
            />
  
    )
}

export default List
