import React, {useState, useContext, useEffect} from 'react'
import { View, Text, Alert, Dimensions, Modal, ScrollView} from 'react-native';
import List from "./List";
import Header from '../Header';
import styles from './styles';
import colors, { getfontSize, getHeight, getIconSize, getWidth } from '../../assets/colors';
import Edit from './edit';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch} from 'react-redux';
import { FirebaseContext } from '../../FirebaseContext';
import { Button } from 'react-native-elements';



const Index = ({navigation}) => {
  
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const {listProducts, cart:{listCart}, tabOrderID} = useSelector(state => state )
    const {auth, createdOrder, updateOrderID, getUser} = useContext(FirebaseContext);
    const user = auth().currentUser
    const [sucess, setSuccess] = useState(false)
    const [getInfo, setGetInfos] = useState(null)

    const [dataPerso, setDataPerso] = useState({adresse:null, phone:null})
 

    const getUserDatas = async () => {

      if(user){
        await getUser(user.uid).onSnapshot((snapshot)=>{
         
          if(snapshot){
            console.log(snapshot, 'tabb')
             if(snapshot.data()?.adresse && snapshot.data()?.phone){
                setDataPerso({adresse:snapshot.data()?.adresse, phone: snapshot.data()?.phone})
                setGetInfos(false)
             }else{
                setGetInfos(true)
             }
          }                   
        });  
      }
     
    }

    const getPayment = () => {
      
          navigation.navigate("GetData",{dataPerso, total: getTotal()})
    }
  
  
    useEffect(() => {
      if(user){
        getUserDatas()
      }
     
    }, [])



    const getTotal = () => { 
      let totalOrder = 0;
        if(listCart.length > 0){
          listProducts.forEach(item => {
            listCart.forEach(e =>{
              if(item.id == e.product_id){
                totalOrder = totalOrder + (parseInt(item.price) * parseInt(e.quantity))
              }
            })
          })
            return totalOrder;
        }else{
          return 0
        }
    }

    const valideOrder = () => {

        if(listCart.length > 0){

  
            createdOrder({
                createdAt: Date.now(),
                status: "en cours",
                total: getTotal(),
                user_id: user.uid,
                client_id:customer,
            })
            .then( doc => {
            
              listCart.forEach(item =>{
                console.log('ok')
                    updateOrderID
                    (
                        item.id,
                       { order_id:doc.id }
                    )
                
                })
            })
            .catch(error => {
                console.error("Error adding document: ", error);
            });
        }
    }

    let nbItem = 0;
    
    const countItem = () => {
      if(listCart.length > 0){
        listCart.forEach(e => {
          nbItem += e.quantity
        })
        return nbItem
      }
      
    }

    const totalItem =  listCart.length > 0 ? countItem() : 0
  


    return (
      
        <View style={{backgroundColor:colors.bgPrivate, flex:1}}>
            <Header/>
            <View style={styles.container}>
                <List/>
                <Edit/>
                
            </View>
            {
              listCart.length > 0 &&
              <View style={{backgroundColor:'rgba(9, 149, 32, 0.3)', borderTopStartRadius:80, height:getHeight(windowHeight,3.8, windowHeight,4.2)}}>
                <ScrollView contentContainerStyle={{paddingBottom:5, marginTop:5}}>
                <View style={styles.totalInfos}>
                  <Text style={{color:'black', textAlign:'right', fontSize:getfontSize(windowWidth,24, windowWidth, 21), fontWeight:"bold" }}>Récapitulatif</Text>   
                  <Text style={{color:'black', textAlign:'right', fontSize:getfontSize(windowWidth,24, windowWidth, 22),  }}>Nombre Total d'articles : <Text style={{fontWeight:'bold'}}>{totalItem}  </Text> </Text>
                  <Text style={{color:'black', textAlign:'right', fontWeight:'bold', fontSize:getfontSize(windowWidth,22, windowWidth, 20)  }}>TOTAL A PAYER :  {getTotal()} € </Text>
                </View>
                <Button
                  disabled={getTotal() > 0 ? false : true}
                  title={ "CONFIRMER "}
                  titleStyle={{color:"#fff",fontSize:getfontSize(windowWidth,24,windowWidth,17)}}
                  icon={
                    <Icon
                      name="check-circle"
                      size={getIconSize(windowWidth,20, windowWidth, 12)}
                      color="white"
                    />
                  }
                  iconRight
                  onPress={()=>getPayment()}
                  buttonStyle={styles.buttonStyle}
                  containerStyle={{position:'relative', bottom:getWidth(windowWidth,60, windowWidth, 30), marginLeft:getWidth(windowWidth,45, windowWidth, 45),  marginRight:getWidth(windowWidth,45, windowWidth, 45)}}
                />
                </ScrollView>
                </View>
            }
          </View>
            
    )
}

export default Index
