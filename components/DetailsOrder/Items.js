import React, {useState, useEffect, useContext} from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { FirebaseContext } from '../../FirebaseContext';
import { Avatar, ListItem, Button, Dialog } from 'react-native-elements';

const Items = ({item}) => {

    const {queryOneProduct} = useContext(FirebaseContext)
    const {listProducts} = useSelector(state => state)
    const [name, setName] = useState("")
    const [image, setImage] = useState('')
    const [price, setPrice] = useState("")


    const getData = async () => {
        await queryOneProduct(item.product_id).onSnapshot((snapshot)=>{
        setName(snapshot.data()?.name)
          setPrice(snapshot.data()?.price)
          setImage(snapshot.data()?.image_url)                            
     });    

    }

    useEffect(() => {
        const datasUp = getData()
        return () => {
        datasUp;
        }
    }, [])
       
    
    return (
    <View style={styles.containerListItem}>
        <ListItem bottomDivider
        containerStyle={{
            backgroundColor:'#fff',
            borderRadius:5,
            height:150,
            maxHeight:150,
            width:"100%",
            maxWidth:"100%"
        }}
        >
             <Avatar  source={{ uri:image}} 
            containerStyle={{
                height:'100%',
                width:"45%",
                maxWidth:"45%",
                maxHeight:"100%",
                borderRadius:20
            }}
            avatarStyle={{
                borderRadius:5,
                height:'100%',
            }}
            
        />
          
        <ListItem.Content>
          <TouchableOpacity
                       onLongPress={()=>console.log("go produit details")}
            >
            <ListItem.Title style={{ color: colors.bgOrange, fontWeight:'bold' }}>
                {name}
            </ListItem.Title>
            </TouchableOpacity>
            <ListItem.Subtitle style={{ color: 'black' }}>
                Quantité : {item.quantity}
            </ListItem.Subtitle>
            <ListItem.Subtitle style={{ color: 'black', fontWeight:"bold"}}>
                Prix: {price} €
            </ListItem.Subtitle>
  </ListItem.Content>
                <ListItem.Chevron />
        </ListItem>
    </View>
    )
}

export default Items
