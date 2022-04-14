import React, {useState, useEffect, useContext} from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Button } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'
import styles from './styles';
import Header from "../Header";
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from '../../FirebaseContext';
import {addCartByDetail, ressetCart} from '../../Redux/Actions/cart';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors, {getHeight, getIconSize, getfontSize, getWidth} from "../../assets/colors";
import { useToast } from "react-native-toast-notifications";
import { ScrollView } from 'react-native-gesture-handler';


const index = ({route}) => {


    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const navigation = useNavigation()
    const {queryAddOrderItems, auth, updateOrderItem} = useContext(FirebaseContext);
    const {listProducts, cart:{listCart}, tabOrderID} = useSelector(state => state);
    const toast = useToast();

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [resset, setResset] = useState(false)
    const { id} = route.params;
    const user = auth().currentUser

    
    const readDetailProduct = listProducts.length > 0 && listProducts.filter(e => (e.id == id)) 


    const getMessageSuccess = () => {
             
         return(
            toast.show(readDetailProduct[0].name+ ' ajouté au panier !' , {
                type: "normal",
                placement: "top",
                duration: 4000,
                offset: 30,
                animationType: "slide-in ",
              })
         )
           
    }



    // mise a jour du cadi dans detail lors d'un ajout
    const toggleActionCart = (id) => {
        
        let verif = ''
        if(listCart.length > 0){
            listCart.filter(element => {

                // si le produit que j'ai recu en param route pour le detail a son id qui exite dans la liste des panier
                if(element.product_id === id){
                    verif=true
                    // je mets a jour la quantité du produit qui existe deja dans une intention dachat, (dans le cadi)
                    updateOrderItem(element.id, {
                        quantity:parseInt(element.quantity+quantity)
                    }).then(() => {
                        setQuantity(1)
                      getMessageSuccess()
                      
                    })
                   
                }
            })

            // j'ajoute le produit car il n'existe pas dans le panier

            if(!verif){
               
                queryAddOrderItems({
                    createdAt: new Date(),
                    product_id: id,
                    user_id:user.uid, 
                    quantity,
                    order_id:null
                }).then(() => { 
                    setQuantity(1)
                    getMessageSuccess()
                   
                })
            }
        }else{
            queryAddOrderItems({
                createdAt: new Date(),
                product_id: id,
                user_id:user.uid, 
                quantity,
                order_id:null
            }).then(() => { 
                setQuantity(1)
                getMessageSuccess()
               
            })
        }
      
    }   


    
    useEffect(() => {
        
      }, [quantity])


    const goBack = () => {
      
        navigation.goBack();
    }

    
    const HeaderDetail = () => {
        return(
            <View style={styles.contentHeader}>
                <TouchableOpacity
                    onPress={() => {
                        goBack();
                    }}
                    style={{ left: 10, top:5, borderRadius:50, width:getWidth(windowWidth,12, windowWidth, 7), height:getHeight(windowHeight,16,windowHeight,14), justifyContent:'center', paddingLeft:6,borderColor: 'rgba(90, 28, 0, 0.6)', borderWidth:2 }}
                >
                <Icon name="chevron-left" size={getIconSize(windowWidth,17, windowWidth, 10)} color={colors.MarronDark}/>
                </TouchableOpacity>
            </View>
        )
    }


    return (

        <View style={styles.containerDetail}>
            <HeaderDetail/>
               <Image 
               style={styles.image} 
               source={{uri:readDetailProduct[0].image_url}}/>
            <View style={styles.content}>
                <ScrollView>
                <View style={{flexDirection:'row'}}> 
                    <Text style={styles.nameProduct}>
                        {readDetailProduct[0].name} 
                    </Text>
                </View>
                <View style={{flexDirection:'row'}}> 
                    <Text style={styles.descrip}>
                        {readDetailProduct[0].description}
                    </Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', padding:10, marginBottom:getHeight(windowHeight,35, windowHeight,40)}}>
                    <Text style={styles.price}>{readDetailProduct[0].price} €</Text>
                    <NumericInput type='up-down'
                        onChange={setQuantity}
                        value={quantity}
                        totalWidth={windowWidth/3.5} 
                        totalHeight={windowHeight/15} 
                        iconSize={28}
                        initValue={quantity}
                        step={1}
                        minValue={1}
                        maxValue={15}
                        valueType='real'
                        rounded 
                        textColor='#fff' 
                        iconStyle={{ color: 'black'}}
                        
                        containerStyle={{
                            backgroundColor:colors.MarronDark, 
                            height:windowHeight/12,
                            borderRadius:10,
                        }}
                        inputStyle={{fontSize:windowWidth/24}}
                        borderColor='#fff'
                        editable={false}
                    />
                </View>
               
                <Button
                      title={'Ajouter au panier '}
                      icon={
                        <Icon
                          name="cart-arrow-down"
                          size={getIconSize(windowWidth,20,windowWidth, 12)}
                          color="white"
                        />
                      }
                      iconRight
                      containerStyle={{top:windowHeight/70, height:windowHeight/10, position:'relative', marginLeft:5, marginRight:5}}

                      titleStyle={{
                          padding:windowHeight/50,
                          textTransform:"uppercase",
                          fontSize:getfontSize(windowWidth,20, windowWidth, 17)
                      }}
                      buttonStyle={styles.buttonStyle}
                      onPress={()=>toggleActionCart(id)}
                    />
                    </ScrollView>
            </View>
            {/* <TabMenu/> */}
        </View>
    )
}

export default index
