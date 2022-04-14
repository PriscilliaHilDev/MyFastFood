import React, {useEffect, useState, useContext} from 'react';
import { View, Text, FlatList, ActivityIndicator, Dimensions} from 'react-native';
import Items from "./Items";
import { useDispatch, useSelector} from 'react-redux';
import {FirebaseContext} from '../../FirebaseContext';
import {Listage} from '../../Redux/Actions/listProducts'
import Header from '../Header'
import Categories from '../Categories'
import LottieView from "lottie-react-native";
import colors, {getHeight, getIconSize, getfontSize, getWidth} from "../../assets/colors";

const List = ({navig}) => {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  

  const {queryAllProducts, auth} = useContext(FirebaseContext);
  const [readProducts, setReadProducts] = useState('')
  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch()
  const user = auth().currentUser
  const {loader} = useSelector(state => state);

  let etat = true;

    const listProducts = async() => {

      await queryAllProducts().onSnapshot((snapshot)=>{
        if(etat){
          let allProducts = [];
        
           if(snapshot && !snapshot.empty){
              snapshot.forEach(element => {
                allProducts.push({id:element.id, ...element.data()});
                //i++
              })
              // if(i == allProducts.length ){
              //   setTimeout(() => {
              //     setLoading(false)
              // }, 10000)
              // }
              setTimeout(() => {
                    setLoading(false)
                }, 2000)
          }else{
          
              setLoading(false)
          
  
          }
        
          setReadProducts(allProducts)
          dispatch(Listage(allProducts))
        } 
      })
  }

    
    useEffect(() => {

      
      listProducts();
     
      return () => {
        etat = false
    
      }
    }, [])
      
    // useEffect(() => {

      
    //   listProducts();
     
    //   return () => {
    //     setReadProducts(null)
    
    //   }
    // }, [])
   //error react disparu a verifier
  //   useEffect(() => {
  //     const subscriber = () => {return};
  //     listProducts().then(sub => {
  //          return sub
  //     }).catch(e => console.log("une erreurr", e));

  //     return () => {
  //          subscriber();
  //     };
  // }, []);


    

    return (
      
         <View style={{flex:1}}>
            <FlatList
               ListHeaderComponent= {
                   <Categories/>
               }
               ListFooterComponent={
                <View style={{marginTop:windowHeight/18}}></View>
              }
                contentContainerStyle={{ width:windowWidth, position:"absolute", paddingBottom:20}}
                data={readProducts}
                numColumns={2}
                ListEmptyComponent= {
              
                   !loading &&
                   <Text style={{fontSize:windowWidth/24, textAlign:'center',fontWeight:"bold", color:colors.MarronDark}}>Aucuns produits trouvés ...</Text>
                }
                renderItem={
                  ({item}) => <Items item={item} navigat={navig} />
                }
                keyExtractor={item => item.id}
            />
            </View>

    
    )
}

export default List
