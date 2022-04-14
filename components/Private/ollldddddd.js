import React, {useState, useEffect, useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Products from '../Products';
import Detail from '../Detail';
import Account from '../Account';
import Cart from '../Cart';
import Orders from "../Orders";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Content from './content';
import { useDispatch } from 'react-redux';
import {FirebaseContext} from '../../FirebaseContext';
import { newProduct, deleteProduct, updateProduct } from '../../Redux/Actions/products';


const initProducts = (queryAllProducts, dispatch) => {
  
  return queryAllProducts().onSnapshot(snapshot => {
  
    snapshot.docChanges().forEach((change) => {
        
     
      if (change.type === "added") {
        dispatch(
          newProduct(
            {
              id: change.doc.id, 
              ...change.doc.data()
            }
          )
        )
      }
      if (change.type === "modified") {
        dispatch(
          updateProduct(
            {
              id: change.doc.id, 
              ...change.doc.data()
            }
          )
        )
        console.log(change.doc.data())

      }

    if (change.type === "removed") {
        dispatch(deleteProduct(change.doc.id))
    }
  });
})
}

// const initCategories = (queryAllCategories, dispatch) => {
  
//   return queryAllCategories().onSnapshot(snapshot => {
  
//     snapshot.docChanges().forEach((change) => {
        
//       if (change.type === "added") {
//         dispatch(
//           newCategory(
//             {
//               id: change.doc.id, 
//               ...change.doc.data()
//             }
//           )
//         )
//       }
//       if (change.type === "modified") {
//         dispatch(
//           updateCategory(
//             {
//               id: change.doc.id, 
//               ...change.doc.data()
//             }
//           )
//         )
//         console.log(change.doc.data())

//       }

//     if (change.type === "removed") {
//         dispatch(deleteCategory(change.doc.id))
//     }
//   });
// })
// }

const index = () => {

  const {queryAllProducts} = useContext(FirebaseContext);
       
  const dispatch = useDispatch();

  useEffect(() => {
    
    const subscribeProducts = initProducts(queryAllProducts, dispatch);

   
    return () => {
      subscribeProducts;
  
    }
  }, [])

 

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();


  const DrawerHome = () => {
    return (
    
      <Drawer.Navigator  drawerContent={props => <Content {... props} />}>
        <Drawer.Screen name="Products" component={Products} />
        <Drawer.Screen name="Detail" component={Detail} />
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="Cart" component={Cart} />
        <Drawer.Screen name="Orders" component={Orders} />
      </Drawer.Navigator>
  
    );
  }
  return (
  
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="DrawerHome" component={DrawerHome} /> 
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
   
  )
}

export default index
