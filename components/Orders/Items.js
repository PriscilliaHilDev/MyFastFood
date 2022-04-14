import React, {useState, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Dimensions} from 'react-native';
import { Avatar, ListItem, Button, Dialog } from 'react-native-elements';
import styles from './styles';
import { FirebaseContext } from '../../FirebaseContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors, {getHeight, getIconSize, getfontSize, getWidth} from "../../assets/colors";


const Items = ({item}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const {auth, queryOrderItemOfCart} = useContext(FirebaseContext)
    const user = auth().currentUser

    // const navigation = useNavigation()
    // const goDetails = async(id) => {

    //     // je recherche les item du panier des que je clique sur le detail 
    //     let allOrders = [];
    //         await queryOrderItemOfCart(user.uid, id).onSnapshot((snapshot)=>{
    //           console.log(snapshot)
             
    //           snapshot && !snapshot.empty && snapshot.forEach(element => {
    //             allOrders.push({id:element.id, ...element.data()});
                  
    //           });
    //           console.log('content order', allOrders)
    //      });
        
    //     navigation.navigate('DetailOrders', {id:id, total:item.total, status:item.status, tab:allOrders})
    // }

    function timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      return time;
    }

    return (
      <View style={styles.containerListItem}>
      <ListItem
           
         
         containerStyle={{
             backgroundColor:'#fff',
             borderTopLeftRadius:getWidth(windowWidth,8, windowWidth,2),
             borderBottomLeftRadius:getWidth(windowWidth,8, windowWidth,2),            borderBottomRightRadius:getWidth(windowWidth,10, windowWidth,2),
             height:getHeight(windowHeight,6, windowHeight, 6.5),
             maxHeight:getHeight(windowHeight,6, windowHeight, 6.5),
             width:"100%",
             maxWidth:"100%",
             backgroundColor:'#fff',
             borderTopRightRadius:15,
             borderBottomRightRadius:15
         }}
       >
         
         
       {
            item.status === 'Livrée' &&
          <Avatar rounded title={item.status} 
          titleStyle={{fontSize:getfontSize(windowWidth,28, windowWidth, 22), padding:8, fontWeight:"bold", textTransform:'uppercase'}}
          containerStyle={{backgroundColor:'green'}}
                size={getIconSize(windowWidth,6, windowWidth, 4.2)}
                />
       }
       {
           item.status === 'en cours' &&
           <Avatar rounded title={item.status} 
                titleStyle={{fontSize:getfontSize(windowWidth,28, windowWidth, 22), padding:8, fontWeight:"bold", textTransform:'uppercase'}}
                containerStyle={{backgroundColor:'#259EBA'}}
                size={getIconSize(windowWidth,6, windowWidth, 4.2)}
                />
       }
       {
           item.status === 'Annulée' &&
           <Avatar rounded title={item.status} 
           titleStyle={{fontSize:getfontSize(windowWidth,28, windowWidth, 22), padding:8, fontWeight:"bold", textTransform:'uppercase'}}
           containerStyle={{backgroundColor:'#E80606'}}
                size={getIconSize(windowWidth,6, windowWidth, 4.2)}
                />
       }
       {
           item.status === 'Expédiée' &&
           <Avatar rounded title={item.status} 
           titleStyle={{fontSize:getfontSize(windowWidth,28, windowWidth, 22), padding:8, fontWeight:"bold", textTransform:'uppercase'}}
           containerStyle={{backgroundColor:'#0B398C'}}
                size={getIconSize(windowWidth,6, windowWidth, 4.2)}
                />
    }
        
           <ListItem.Content >
             <ListItem.Title style={{ color: colors.MarronDark, fontWeight:'bold', textAlign:'center', position:'relative', left:getWidth(windowWidth, 7, windowWidth, 60), fontSize:getfontSize(windowWidth, 28, windowWidth, 20) }}>
               Le {timeConverter(item.createdAt)}
             </ListItem.Title>
               <ListItem.Subtitle style={{ position:"relative", left:getWidth(windowWidth, 4, windowWidth, 12),color: "green", fontWeight:'bold', fontSize:getfontSize(windowWidth,30, windowWidth, 20), textAlign:'center'}}>
                 {item.total} € <Icon name="check-circle" size={getIconSize(windowWidth, 15, windowWidth, 10)} color='green'/>
               </ListItem.Subtitle>

           </ListItem.Content>
 
       </ListItem>
       </View>

    // <View style={styles.containerListItem}>
    // <ListItem
    //    containerStyle={{
    //        backgroundColor:'#fff',
    //        borderTopLeftRadius:80,
    //        borderBottomLeftRadius:80,
    //        height:130,
    //        maxHeight:130,
    //        width:"100%",
    //        maxWidth:"100%",
    //        backgroundColor:'#FFF1D4',
    //        borderTopRightRadius:15,
    //        borderBottomRightRadius:15
    //    }}
    //  >
    //    {
    //        item.status === 'Livrée' &&
    //        <Avatar rounded title={item.status} 
    //             titleStyle={{fontSize:16, padding:8, fontWeight:"bold", textTransform:'uppercase'}}
    //             containerStyle={{backgroundColor:'green', position:'absolute', top:windowWidth/15, left:windowWidth/35}}
    //             size={90}
    //       />
    //    }
    //    {
    //        item.status === 'en cours' &&
    //        <Avatar rounded title={item.status} 
    //             titleStyle={{fontSize:16, padding:8, fontWeight:"bold", textTransform:'uppercase'}}
    //             containerStyle={{backgroundColor:'#259EBA', position:'absolute', top:windowWidth/15, left:windowWidth/35}}
    //             size={90}
    //       />
    //    }
    //    {
    //        item.status === 'Annulée' &&
    //        <Avatar rounded title={item.status} 
    //             titleStyle={{fontSize:16, padding:8, fontWeight:"bold", textTransform:'uppercase'}}
    //             containerStyle={{backgroundColor:'#E80606', position:'absolute', top:windowWidth/15, left:windowWidth/35}}
    //             size={90}
    //       />
    //    }
    //    {
    //        item.status === 'Expédiée' &&
    //        <Avatar rounded title={item.status} 
    //             titleStyle={{fontSize:16, padding:8, fontWeight:"bold", textTransform:'uppercase'}}
    //             containerStyle={{backgroundColor:'#0B398C', position:'absolute', top:windowWidth/15, left:windowWidth/35}}
    //             size={90}
    //       />
    //    }
    //      <ListItem.Content >
    //        <ListItem.Title style={{ width:windowWidth, left:windowWidth/5.8, top:-windowWidth/6,color: colors.bgOrange, fontSize:15, fontWeight:'bold', paddingTop:0, position:'absolute', zIndex:20, paddingBottom:0 }}>
    //           Le {timeConverter(item.createdAt)}
    //        </ListItem.Title>
    //        <ListItem.Content style={{ position:'absolute', left:windowWidth/3,paddingLeft:20, paddingRight:10, borderRadius:10, backgroundColor:'#fff'}}>
    //          <ListItem.Subtitle style={{ color: 'green', fontWeight:'bold', fontSize:18}}>
    //           {item.total} € <Icon name="check-circle" size={25} color='green'/>
    //          </ListItem.Subtitle>
    //        </ListItem.Content>

    //      </ListItem.Content>

    //  </ListItem>
    //  </View>

    )
}

export default Items
