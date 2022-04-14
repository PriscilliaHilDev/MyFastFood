import React, {useState, useEffect, useContext} from 'react';
import { View, Text, FlatList} from 'react-native';
import Items from "./Items";
import {FirebaseContext} from '../../FirebaseContext';


const List = () => {

    const {queryAllCategories} = useContext(FirebaseContext);
    const [readCategories, setReadCategories] = useState('')
  
      const listCategories = async() => {
  
        await queryAllCategories().onSnapshot((snapshot)=>{
        //   console.log('snapshot query categories :',snapshot)
          let allCategories = [];
          snapshot && !snapshot.empty && snapshot.forEach(element => {
            //   console.log(element.data()) 
              allCategories.push({id:element.id, ...element.data()});
            //   console.log('categories :', allCategories)
          });
           allCategories.unshift({id:null, name:"Tous les plats"})
       
            setReadCategories(allCategories)
     });
        
    }

    //  const CatNoFilter = [
     
    //  ]
    //  const newdataCategories = readCategories.concat(CatNoFilter)



    

  
      useEffect(() => {
  
        const subscribeCategories = listCategories();
       
        return () => {
            subscribeCategories;
        }
      }, [])

    return (
        <View style={{flex:1}} >
            <FlatList
                data={readCategories}
                ListEmptyComponent= {<View></View>}
                renderItem={({item}) => <Items item={item} /> }
                keyExtractor={item => item.id}
                horizontal
                
            />

      </View>
    )
}

export default List
