import React, {useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, Dimensions} from 'react-native';
import Header from "../Header";
import colors, { getfontSize, getIconSize } from "../../assets/colors";
import styles from "./styles";
import { Avatar } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { FirebaseContext } from '../../FirebaseContext';
import TabMenu from '../TabMenu';
import { getFontScale } from 'react-native-device-info';

const index = () => {

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

    const navigation = useNavigation();
    const {auth, getUser} = useContext(FirebaseContext)
    const [adresse, setAdresse] = useState(null)
    const [phone, setPhone]= useState(null)
    const [nom, setNom]= useState(null)
    const [prenom, setPrenom]= useState(null)

    const user = auth().currentUser
   
                                   
                              

    const crypTextEmail = (text) => {
        if(text !== null){

            const indexPoint = text.indexOf('.')
            const indexAt = text.indexOf('@')
            
            const firstIndexEmail = text.slice(1, indexAt).length
            const firstEmail = text.slice(1, indexAt)
            const secret = '*'
            const indexTotal = text.length;
                // je recupère le texte qui existe entre @ et . c'est a dire le domaine exacte de l'adresse email pour avoir sa longeur-1 et faire un repeat ***
               // Taille du domaine email pour le repeat secret
               const domaineEmailSize = text.slice(indexAt, indexPoint).length-1

            if(firstIndexEmail < 4){

                return text.slice(0,1)+(secret.repeat(firstIndexEmail))+
                text.charAt(indexAt)+(secret.repeat(domaineEmailSize))+text.slice(indexPoint,indexTotal)

            }else{
                // exemple hercule ici j'obtiens "ercule" avec firstIndexEmail donc avec - 1, j'obtiens le nombre de lettre en h et e
                const firstLongEmailSecret = firstIndexEmail -1;
               
                return text.slice(0,1)+(secret.repeat(firstLongEmailSecret))+firstEmail.slice(firstLongEmailSecret,firstIndexEmail)+
                text.charAt(indexAt)+(secret.repeat(domaineEmailSize))+text.slice(indexPoint,indexTotal)
            }
        }
    } 

 

    const crypTextPhone = (text) => {

        
        if(text !== null){

           const indexViewPhone = text.length-4
           const secret = '*'

            return text.slice(0, indexViewPhone) + secret.repeat(4);
        }
    } 



    const getData = async () => {
        await getUser(user.uid).onSnapshot((snapshot)=>{

          if(snapshot.data()?.adresse){
            setAdresse(snapshot.data()?.adresse)
          }else{
              setAdresse("Non renseigné")
          }
          if(snapshot.data()?.phone){
            setPhone(snapshot.data()?.phone)
          }
     });    
    }

    useEffect(() => {
        const datasUp = getData()
        return () => {
        datasUp;
        }
    }, [])
       

    return (
        <View style={styles.container} >
            <Header/>
            <View style={styles.avatar}>
            <Avatar
                rounded
                size={getIconSize(windowWidth,3,windowWidth, 2.5)}
                source={require('../../assets/images/profil.png')}
                containerStyle={{
                    borderColor:'black',
                    borderWidth:2
                }}
            />
            </View>
            <View style={{flexDirection:'row', justifyContent:'center'}}> 
                <Text style={styles.userName}>
                    {user.displayName}
                </Text>
            </View>
            
            <View style={{flexDirection:'row', padding:5,paddingTop:15}}> 
                <Text style={styles.userEmail}>
                    <Text style={{fontWeight:'bold'}}>  Email: </Text>  
                    {crypTextEmail(user.email)}
                </Text>
            </View>
            <View style={{flexDirection:'row', padding:5}}> 
                <Text style={styles.userEmail}>
                  <Text style={{fontWeight:'bold'}}>  Adresse: </Text> 
                    {adresse} 
                </Text>
            </View>
            <View style={{flexDirection:'row', padding:5}}> 
                <Text style={styles.userEmail}>
                    <Text style={{fontWeight:'bold'}}>  Mobile: </Text>
                   {phone !== null ? crypTextPhone(phone) : "Non renseigné"}
                </Text>
            </View>
           
            <View style={styles.bottomContent}>
            <Button
                    buttonStyle={styles.btnDelete}
                    titleStyle={{color:'#fff',fontSize:getfontSize(windowWidth,24,windowWidth,19)}}
                    title="SUPPRIMER MON COMPTE"
                    onPress={()=>console.log('suppression')}
                />
            </View>
        </View>
    )
}

export default index
