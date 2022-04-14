import React, {useEffect, useState, useContext} from 'react';
import { View, Text, FlatList, Dimensions} from 'react-native';
import Items from "./Items";
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Header from '../Header'
import Categories from '../Categories'
import colors, { getfontSize } from '../../assets/colors';


const List = ({navig}) => {
       
  const windowWidth = Dimensions.get('window').width;

  const route = useRoute();
  const id = route.params.idCat
  const {listProducts} = useSelector(state => state)



   const toggleData = () => {
     if(id === null){
       return listProducts
     }else{
       return filterData
     }
   }
   const filterData = listProducts.filter(item => {
     if(item.category_id === id){
       return item
     }
   })  


    return (
      <View style={{flex:1}}>
      <FlatList
       ListHeaderComponent= {
        
          <Categories/>
      
      }
      ListFooterComponent={
        <View style={{marginTop:40}}></View>
      }
          contentContainerStyle={{ width:windowWidth, position:"absolute",  paddingBottom:20}}
                data={toggleData()}
                numColumns={2}
                ListEmptyComponent= {()=> <Text style={{fontSize:getfontSize(windowWidth, 20, windowWidth, 20), textAlign:'center', color:'black', fontWeight:'bold'}}>Aucun(s) produit(s) trouvé(s) pour cette catégorie ...</Text>}
                renderItem={({item}) => <Items item={item} navigat={navig} /> }
                keyExtractor={item => item.id}
            />

      </View>
    )
}

export default List
