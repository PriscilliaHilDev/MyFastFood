import { View, Text, Alert, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import React, {useRef, useState, useEffect, useContext} from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Header from '../Header';
import colors, {getHeight, getfontSize, getWidth, getIconSize} from '../../assets/colors';
import PhoneInput from "react-native-phone-number-input";
import { CheckBox } from 'react-native-elements';
import { FirebaseContext } from '../../FirebaseContext';
import { useStripe } from '@stripe/stripe-react-native';
import { Button } from 'react-native-elements';
// import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { useSelector, useDispatch} from 'react-redux';
import { setNestedObjectValues } from 'formik';


const GetData = ({route, navigation}) => {

    const phoneInput = useRef(null);
    const [value, setValue] = useState(null);
    const [formattedValue, setFormattedValue] = useState(null);
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const { dataPerso, total} = route.params;
    console.log(dataPerso)
    const [errorPhone, setErrorPhone] = useState(null)
    const [newAddrUser, setAddrUser] = useState(null) 
    const [address, setAddress] = useState(dataPerso.adresse)
    const [check1, setCheck1] = useState(false);
    const [errorAdresse, setErrorAdresse] = useState(null)
    const [firstAddr, setFirstAddr] = useState(null)
    const [troisIlet, setTroisIlet] = useState(null)
    const [ErrorAdresseExact,setErrorAdresseExact] = useState(null)
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [reload, setReload] = useState(false)
    const API_URL = "https://us-central1-myfastfood-9b2c4.cloudfunctions.net/createCheckoutRequest";

    const [customer, setCustomer] = useState(null)
    const {auth, createdOrder, updateOrderID, getUser} = useContext(FirebaseContext);
    const user = auth().currentUser
    const [disabled, setDisabled] = useState('grey')
    const {listProducts, cart:{listCart}, tabOrderID} = useSelector(state => state )

    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + "sk_test_51JQD8gLp7IQnYLFLJZJUaMGdrXGhCI1aYn49H60IFOXhbcjXCFhSvxChnPhw09DHMi4P2UyYGgugRg3DLFbSjIeP009Ve7PzAQ",
        },
  
        // attention quand je vais sur le detail du produit je peux payer donc
        // au montage de la page detail, je lance la fonction
        // ici j'envoie le prix obtenu soit par redux ou en props lors du click a tester 
        body:JSON.stringify({
          amount:total*100,
          currency:"eur",
          methodPayment:['card'],
          email:user.email
        })
      });
  
      const { paymentIntent, ephemeralKey, customer } = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
  
    };
    

  
    const initializePaymentSheet = async () => {
  
      // réponse de l'api de stripe
        const {
          paymentIntent,
          ephemeralKey,
          customer,
        } = await fetchPaymentSheetParams();

        setCustomer(customer)
        console.log(customer, 'HELLOOOOO')
  
        const { error } = await initPaymentSheet({
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: paymentIntent,
        });
  
        if(error){
          console.log(error)
        }

    };

  
    const goCart = () => {
        navigation.navigate('Cart'),
         setCheck1(false)

    }

    const openPaymentSheet = async () => {
      
        const { error } = await presentPaymentSheet();
      
        if (error) {
  
          Alert.alert('ANNULATION DU PAIEMENT',  `Une erreur est survenue :${error.message} ` ,
             [
                
                { text: "Ok",
                                                
                }
            ]
          );
          
        
        } else {
          
          //updateUser()
          valideOrder();
          Alert.alert('PAIEMENT VALIDE AVEC SUCCES !', "Nous vous remercions de votre commande. Afin de vous tenir informer de son status, rendez-vous dans l'onglet « Mes commandes ». A bientot !",
          [
                
            { text: "Ok", onPress: () => navigation.navigate('Cart') }
        ]
          
          );
        }
    };
    const checkValid = phoneInput.current?.isValidNumber(value);

    const showPayment = () => {

       if(dataPerso.adresse == null){
        getUser(user.uid).update({
            phone:value.replace(/\s/g, ''), 
            adresse:address,
        }).then(() => {
            console.log('update reussit')
            openPaymentSheet()
        })
       }else{
            if(address == null ){
                getUser(user.uid).update({
                    adresse:dataPerso.adresse,
                }).then(() => {
                    openPaymentSheet()
                })
            }else{
                getUser(user.uid).update({
                    adresse:address,
                }).then(() => {
                    console.log('update ZARBIIBIBIBIBI')
                    openPaymentSheet()
                })
            }
          
             
   
       }
    

    }


    useEffect(() => {
        
        initializePaymentSheet()
       
    }, [check1, total]);


    // afficher en temps reel le message derreur de la validation du telephone
    useEffect(() => {
      
        if(!checkValid && value !== null){
            setErrorPhone("Ce numéro de téléphone n'est pas valide")
        }
        if(checkValid){
            setErrorPhone(null)
        }

    }, [checkValid]);

    // valider l'ensemble des regles
    useEffect(() => {
      
        
        if(checkValid && address !== null && errorAdresse == null && check1 && errorPhone == null){
            setDisabled(false)
        }else{
            setDisabled(true) 
        }

        if(errorAdresse == null && dataPerso.adresse !== null && check1){
            setDisabled(false)
        }
        if(!check1 && value == null){
            setDisabled(true)

        }

        
    }, [address, checkValid, errorAdresse, check1, errorPhone]);


   

    const valideOrder = () => {

        if(listCart.length > 0){

            createdOrder({
                createdAt: Date.now(),
                status: "en cours",
                total: total,
                user_id: user.uid,
                client_id:customer,
                CVG:"accepte"
            })
            .then( doc => {
            
               listCart.forEach(item =>{
                console.log('ok')
                    updateOrderID
                    (
                        item.id,
                       { order_id:doc.id }
                    )
                    // .then(() => {console.log('yesss')})
                    // .catch(e => console.log("une erreurr", e));  
                })
            })
            .catch(error => {
                console.error("Error adding document: ", error);
            });
        }
    }

    const goBackCart = () => {
        navigation.goBack()
        setCheck1(false)
        // // setAddrUser(null)
    }

  return (
    <View style={{backgroundColor:colors.bgPrivate, flex:1}}>
        <Header check={goBackCart}/>
        <View style={{flex:1}} >

           {
               dataPerso.adresse == null && dataPerso.phone == null ?
                    <View style={{flex:1, margin: 20, marginBottom:0}}>
                        <Text style={{
                            fontSize:getfontSize(windowWidth, 26, windowWidth, 19),
                            textAlign:'center',
                            marginTop:0,
                            marginVertical:10,
                            marginBottom:getHeight(windowHeight, 30, windowHeight,40),
                            fontWeight:'bold',
                            color:'black' 
                        }}>
                            Finalisez votre commande en saisissant vos données personnelles 
                        </Text>
                        <PhoneInput
                            placeholder='Ex : 0696 99 99 00'
                            ref={phoneInput}
                            defaultValue={value}
                            defaultCode="MQ"
                            layout="first"
                            onChangeText={(text) => {
                        
                                setValue(text);
                                if(text == ""){
                                    setErrorPhone('')
                                }
                                if(!phoneInput.current?.isValidNumber(text) && text !== ""){
                                    setErrorPhone("Ce numéro de téléphone n'est pas valide")
                                }
                                if(text !== '' && text.includes(".") || text.includes(',') || text.includes('-')){
                                    setErrorPhone("Caractère spécicaux détectés")
                                }else{
                                    setErrorPhone(null)
                                }
                                
                                
                            }}
                            onChangeFormattedText={(text) => {
                                setValue(text);
                                if(text == ""){
                                    setErrorPhone('')
                                }
                                if(!phoneInput.current?.isValidNumber(text) && text !== ""){
                                    setErrorPhone("Ce numéro de téléphone n'est pas valide")
                                }
                               
                                if(text !== '' && text.includes(".") || text.includes(',') || text.includes('-')){
                                    setErrorPhone("Caractère spécicaux détectés")
                                }else{
                                    setErrorPhone(null)
                                }
                            }}
                            withShadow
                            autoFocus
                            containerStyle={{width:'100%',borderRadius:5}}
                            textContainerStyle={{
                                borderRadius:5,    
                                height:getHeight(windowHeight, 15, windowHeight, 20)
                            }}
                            textInputStyle={{height:100, fontSize:getfontSize(windowWidth, 28, windowWidth, 20)}}
                            codeTextStyle={{ height:getHeight(windowHeight, 25, windowHeight, 28), fontSize:getfontSize(windowWidth, 28, windowWidth, 20)}}
                            isValidNumber
                            
                            countryPickerButtonStyle={{
                               borderRadius:10,
                            }}
                            
                        />
                        <Text style={{
                            fontWeight:'bold',
                            fontSize:getfontSize(windowWidth,35, windowWidth, 22),
                            margin:10,
                            marginLeft:0,
                            marginTop:2
                        }}>
                            {errorPhone} 
                        </Text>
                        
                        <GooglePlacesAutocomplete 
                            placeholder='Adresse de livraison'
                            onPress={(data, details = null) => {
                                // console.log(data.structured_formatting.secondary_text)
                                const addrData = data.structured_formatting.secondary_text;
                                if(addrData.includes('Les Trois-Îlets, Martinique')){
                                        // console.log('yes')
                                    //   const indexTroisIlet = addrData.length;
                                    //   const indexTotal = data.description.length
                                    //   const indexDiff = indexTotal - indexTroisIlet;
                                    // console.log(data.description.slice(0, indexDiff), 'avant trois ilets')
                                    setTroisIlet(data.structured_formatting.secondary_text)
                                    setFirstAddr(data.structured_formatting.main_text)
                                    //   console.log(data.structured_formatting.main_text, 'first')
                                    setAddress(data.description)
                                }else{
                                    Alert.alert('Service indisponible', "Veuillez indiquer une adresse de livraison complète dans le secteur des Trois Ilets. ")
                                }
                            }}
                            query={{
                                key: 'AIzaSyDiVYR8pvc_xYpXAol5HnJZNukAySvnoeU',
                                language: 'fr',
                                components:'country:mq',
                            }}
                            styles={{
                                textInput:{
                                    fontSize:getfontSize(windowWidth, 28, windowWidth, 20),
                                    height:getHeight(windowHeight, 15, windowHeight, 18
                                        )
                                },
                                description:{
                                    fontSize:getfontSize(windowWidth, 30, windowWidth, 22),
                                    height:getHeight(windowHeight, 25, windowHeight, 36)
                                },
                            }}
                            textInputProps={{
                                onChangeText: (text) => {

                                    if( text == ""){
                                        setAddress(null)
                                    } 
                                    if(address && text !== address){
                                        setErrorAdresse('Adresse incomplete, veuillez vérifier votre saisit')
                                    }else{
                                        setErrorAdresse(null)
                                    }
                                    if(text == ""){
                                        setErrorAdresse(null)
                                    }
                               }
                            }} />
                           <Text style={{
                                fontWeight:'bold',
                                fontSize:getfontSize(windowWidth,35, windowWidth, 22),
                                margin:10,
                                marginBottom:0,
                                marginLeft:0
                           }} >
                                { errorAdresse !== null ? errorAdresse : ''} 
                            </Text>
                            <View style={{flex:1}}>
                            <ScrollView contentContainerStyle={{paddingBottom:45, marginTop:5}}>

                                <View style={{alignItems:'flex-end', justifyContent:'space-around', flexDirection:'row'}}>
                                    <CheckBox
                                        uncheckedColor='black'
                                        checkedColor="#096418"
                                        checked={check1}
                                        onPress={() => setCheck1(!check1)}
                                        
                                        size={getIconSize(windowWidth, 20, windowWidth, 15)}
                                    />
                                    <Text style={{flexWrap:'wrap',
                                                  margin:20,
                                                  marginTop:getHeight(windowHeight, 15, windowHeight, 18),
                                                  marginBottom:0,
                                                  fontSize:getfontSize(windowWidth, 28, windowWidth,22 )
                                    }}>
                                        En cochant cette case, je confirme à avoir lu et compris <Text style={{fontWeight:'bold', textDecorationLine:'underline'}}>les conditions générales de ventes</Text> (CGV) et de les accepter.
                                    </Text>
                                </View>
                                <View style={{flex:1, top:getHeight(windowHeight, 30, windowHeight, 25)}}>
                                    <Button
                                        disabled={disabled}
                                        title={ "PAYER "}
                                        titleStyle={{color:"#fff",fontSize:getfontSize(windowWidth,24,windowWidth,17)}}
                                        icon={
                                            <Icon
                                                name="check-circle"
                                                size={getIconSize(windowWidth,20, windowWidth, 12)}
                                                color="white"
                                            />
                                        }
                                        iconRight
                                        onPress={()=>showPayment()}
                                        buttonStyle={{backgroundColor:'#096418', height:windowHeight/12                                   }}
                                        containerStyle={{ marginLeft:'0.2%',  marginRight:'0.2%'}}
                                    />
                                </View>
                                </ScrollView>
                            </View>
                    </View>
               :
               <View style={{flex:1, margin: 20, marginTop:0, marginBottom:0}}>
                   <View
                    style={{
                        // backgroundColor: 'rgba(255, 255, 255)',
                        borderRadius:10,
                        justifyContent:'space-between',
                        paddingHorizontal:20,
                        paddingTop:10,
                        marginVertical:10,
                        backgroundColor:'#fff',
                    }}
                   >
                        <Text style={{
                            fontSize:getfontSize(windowWidth, 22, windowWidth, 18),
                            textAlign:'left',
                            fontWeight:'bold',
                            color:'#096418',
                            borderRadius:10,
                            marginBottom:getWidth(windowWidth, 40, windowWidth, 150)
                            }}
                        >
                            Je souhaite me faire livrer à l'adresse suivante <Text></Text>
                            <Icon name='check-circle'                                            
                                  size={getIconSize(windowWidth,25, windowWidth, 16)}
                                  iconRight
                            />
                        </Text>
                        {
                            dataPerso.adresse !== null && newAddrUser == null ?
                            <Text style={{
                                    fontSize:getfontSize(windowWidth, 30, windowWidth, 20),
                                    textAlign:'center',
                                    marginVertical:10,
                                    marginBottom:getHeight(windowHeight, 30, windowHeight,60),
                                    color:'black',
                                    fontStyle:'italic',
                                    fontWeight:'600',
                                }}> 
                                {dataPerso.adresse}
                            </Text>
                            :
                            <Text style={{
                                fontSize:getfontSize(windowWidth, 30, windowWidth, 20),
                                textAlign:'center',
                                marginVertical:10,
                                marginBottom:getHeight(windowHeight, 30, windowHeight,60),
                                color:'black',
                                fontStyle:'italic',
                                fontWeight:'600',
                            }}> 
                            {newAddrUser}
                        </Text>

                        } 
                   </View>
                 
                  <Text style={{
                            fontSize:getfontSize(windowWidth, 28, windowWidth, 20),
                            textAlign:'left',
                            marginTop:0,
                           
                            marginBottom:getHeight(windowHeight, 60, windowHeight,60),
                            fontWeight:'bold',
                            color:'black',
                            fontStyle:'italic'
                  }}>
                       Ou changer d'adresse ?
                   </Text>
                        <GooglePlacesAutocomplete 
                            placeholder='Adresse de livraison'
                            onPress={(data, details = null) => {
                                const addrData = data.structured_formatting.secondary_text;
                                if(addrData.includes('Les Trois-Îlets, Martinique')){
                                    setTroisIlet(data.structured_formatting.secondary_text)
                                    setFirstAddr(data.structured_formatting.main_text)
                                    
                                        setAddress(data.description)
                                        setAddrUser(data.description)
                                        setErrorAdresse(null)
               
                                    if(!data.description.includes(dataPerso.adresse)){
                                        Alert.alert('Confirmation', "Votre adresse de livraison à bien été modifié."
                                       
                                        )
                                    }
                                   

                                }else{
                                    Alert.alert('Service indisponible', "Veuillez indiquer une adresse de livraison complète dans le secteur des Trois Ilets. ")
                                }
                            }}
                            query={{
                                key: 'AIzaSyDiVYR8pvc_xYpXAol5HnJZNukAySvnoeU',
                                language: 'fr',
                                components:'country:mq',
                            }}
                            styles={{
                                textInput:{
                                    fontSize:getfontSize(windowWidth, 28, windowWidth, 20),
                                    height:getHeight(windowHeight, 15, windowHeight, 18),
                                    
                                },
                                description:{
                                    fontSize:getfontSize(windowWidth, 30, windowWidth, 22),
                                    height:getHeight(windowHeight, 25, windowHeight, 36),
                                },
                                container:{
                                    flex:1
                                }
                            }}
                            textInputProps={{
                                onChangeText: (text) => {

                                    // si la personne supprime on supprime adress à null 
                                    if(text == ""){
                                        setAddress(null)
                                    } 
                                    if(address && text !== address){
                                        setErrorAdresse('Adresse incomplete, veuillez vérifier votre saisit')
                                    }else{
                                        setErrorAdresse(null)
                                    }
                                    if(text == ""){
                                        setErrorAdresse(null)
                                    }
                                }
                            }} 
                        />
                        
                      
                            <View style={{flex:1}}>
                                <Text style={{
                                    fontWeight:'bold',
                                    fontSize:getfontSize(windowWidth,35, windowWidth, 22),
                                    margin:10,
                                    marginLeft:0,
                                    marginBottom:0,
                                    marginTop:0
                               }} >
                                { errorAdresse !== null ? errorAdresse : ''} 
                               </Text>
                               <ScrollView contentContainerStyle={{paddingBottom:45, marginTop:5}}>
                                <View style={{alignItems:'flex-end', justifyContent:'space-around', flexDirection:'row'}}>
                                    <CheckBox
                                        uncheckedColor='black'
                                        checkedColor="#096418"
                                        checked={check1}
                                        onPress={() => setCheck1(!check1)}
                                        
                                        size={getIconSize(windowWidth, 20, windowWidth, 15)}
                                    />
                                    <Text style={{flexWrap:'wrap',
                                                  margin:20,
                                                  marginBottom:0,
                                                  marginTop:10,
                                                  fontSize:getfontSize(windowWidth, 28, windowWidth,22 )
                                    }}>
                                        En cochant cette case, je confirme à avoir lu et compris <Text style={{fontWeight:'bold', textDecorationLine:'underline'}}>les conditions générales de ventes</Text> (CGV) et de les accepter.
                                    </Text>
                                </View>
                                <View style={{flex:1, top:getHeight(windowHeight, 50, windowHeight, 30)}}>
                                    <Button
                                        disabled={disabled}
                                        title={ "PAYER "}
                                        titleStyle={{color:"#fff",fontSize:getfontSize(windowWidth,24,windowWidth,17)}}
                                        icon={
                                            <Icon
                                                name="check-circle"
                                                size={getIconSize(windowWidth,20, windowWidth, 12)}
                                                color="white"
                                            />
                                        }
                                        iconRight
                                        onPress={()=>showPayment()}
                                        buttonStyle={{backgroundColor:'#096418', height:windowHeight/12 }}
                                        containerStyle={{ marginLeft:'0.2%',  marginRight:'0.2%', marginTop:getWidth(windowWidth, 20, windowWidth, 35)}}
                                    />
                                    
                                </View>
                                </ScrollView>
                            </View>
                    </View>

           }
            
        </View>
    </View>
  );
};

export default GetData;
