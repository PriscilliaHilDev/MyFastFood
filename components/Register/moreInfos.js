import React, {useContext, useState, useRef, useEffect} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from "../../assets/colors";
import { FirebaseContext } from '../../FirebaseContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { Dimensions } from 'react-native';
import LottieView from "lottie-react-native";
import styles from "./styles";


const MoreInfos = ({route}) => {

  const {auth, queryAddUser} = useContext(FirebaseContext);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [load, setLoad] = useState(false)
   const { email, password } = route.params;

     const phoneRegExp = /^[0-9]{10}$/;

            const SignupSchema = Yup.object().shape({
                nom: Yup.string().required('Votre nom est requis'),
                prenom:Yup.string().required('Votre prénom est requis'),
                adresse: Yup.string().required('Veuillez saisir une adresse de livraison'),
                phone: Yup.string().required('Veuillez saisir votre numéro de téléphone')
                .matches(phoneRegExp,'Entrez les 10 chiffres de votre numéro de téléphone sans espaces'),
            });
            
            
              const prenomRef = useRef();
              const nomRef = useRef();
              const adresseRef = useRef();
              
  return(

        <View style={styles.content}>
            <View style={styles.avatar}>
                <Icon name="user-circle" size={85} color="#fff" />
                <Text style={styles.title}>DONNEES PERSONELLES </Text>
            </View >
          
                <Formik
                initialValues={{ adresse: '', nom:'',phone:'', prenom:''}}
                validationSchema={SignupSchema}
                onSubmit={async (values) => 
                  
                  {
                      
                      setLoad(true)
                      const {user} = await auth().createUserWithEmailAndPassword(email,password);
                      await queryAddUser(user.uid, {adresse:values.adresse, nom:values.nom, prenom:values.prenom, createdAt:Date.now(), phone:values.phone, roles:["ROLE_CLIENT"],email:email })
                      .then((res) => {

                          // je peux aussi envoyer le nom et le prenom sous forme d'objet a displayName ;)!
                          const user = auth().currentUser;
                          user.updateProfile({
                            displayName:values.prenom
                          })
                        .catch(error => {
                          setLoad(false)
                        
                            switch (error.code) {
                
                                case "Thrown if the phone is not strong enough.":

                                  toast.show('Votre mot de passe est trop faible niveau sécurité', {
                                    type: "danger",
                                    placement: "bottom",
                                    duration: 4000,
                                    offset: 30,
                                    animationType: "slide-in ",
                                  });
                                    break;
                
                                default:
                                    break;
                            };
                    
                        })
              
                      })
              
                  }
                
                }
              >
                {({ errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, isValid, dirty, values }) => (
                  <KeyboardAwareScrollView>
                  <View>
                      
                    <Input
                     placeholder='Nom'
                     inputContainerStyle={styles.input}
                     leftIconContainerStyle={{marginLeft:20}}
                     inputStyle={{color:"black", fontSize:15, padding:3, paddingLeft:10, marginRight:15}}
                         placeholderTextColor="#9C9A99"
                     leftIcon={{ type: 'font-awesome', name: 'user', color:"#F24E1E" }}
                     containerStyle={{
                      height:windowHeight/9
                  }}
                  errorStyle={{color:'black', fontWeight:"bold", position:'absolute', top:windowHeight/17, textAlign:'left'}}
                      onChangeText={handleChange('nom')}
                      onBlur={handleBlur('nom')}
                      value={values.nom}
                      errorMessage= {errors.nom && touched.nom ? errors.nom : null} 
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        nomRef.current.focus();
                      }}
                      blurOnSubmit={false}
                    />
                    <Input
                     placeholder='Prenom'
                     inputContainerStyle={styles.input}
                     leftIconContainerStyle={{marginLeft:20}}
                     inputStyle={{color:"black", fontSize:15, padding:3, paddingLeft:10, marginRight:15}}
                         placeholderTextColor="#9C9A99"
                     leftIcon={{ type: 'font-awesome', name: 'user', color:"#F24E1E" }}
                     containerStyle={{
                      height:windowHeight/9
                  }}
                  errorStyle={{color:'black', fontWeight:"bold", position:'absolute', top:windowHeight/17, textAlign:'left'}}
                      onChangeText={handleChange('prenom')}
                      onBlur={handleBlur('prenom')}
                      value={values.prenom}
                      errorMessage= {errors.prenom && touched.prenom ? errors.prenom : null} 
                      ref={nomRef} 
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                prenomRef.current.focus();
                            }}
                            blurOnSubmit={false}
                    />
                    <Input
                     placeholder='Adresse de livraison'
                     inputContainerStyle={styles.input}
                     leftIconContainerStyle={{marginLeft:20}}
                     inputStyle={{color:"black", fontSize:15, padding:3, paddingLeft:10, marginRight:15}}
                     placeholderTextColor="#9C9A99"
                     leftIcon={
                        <Icon
                          name="map-marker"
                          size={28}
                          color="#F24E1E"
                        />
                      }
                     containerStyle={{
                      height:windowHeight/9
                  }}
                  errorStyle={{color:'black', fontWeight:"bold", position:'absolute', top:windowHeight/17, textAlign:'left'}}
                      onChangeText={handleChange('adresse')}
                      onBlur={handleBlur('adresse')}
                      value={values.adresse}
                      errorMessage= {errors.adresse && touched.adresse ? errors.adresse : null} 
                      ref={prenomRef} 
                      
                    />
                    <Input
                     placeholder='Exemple : 0696444444'
                     inputContainerStyle={styles.input}
                     leftIconContainerStyle={{marginLeft:20}}
                     inputStyle={{color:"black", fontSize:15, padding:3, paddingLeft:10, marginRight:15}}
                         placeholderTextColor="#9C9A99"
                     leftIcon={{ type: 'font-awesome', name: 'mobile', color:"#F24E1E" }}
                     containerStyle={{
                      height:windowHeight/7
                     }}
                  errorStyle={{color:'black', fontWeight:"bold", position:'absolute', top:windowHeight/17, textAlign:'left'}}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      keyboardType='numeric'
                      value={values.phone}
                      errorMessage= {errors.phone && touched.phone ? errors.phone : null} 
                      ref={adresseRef}
                        onSubmitEditing={() => {
                          handleSubmit()
                        }}
                    />
                    {/* <PhoneInput
                      placeholder='Votre n° de Mobile'
                      defaultCode="MQ"
                      layout="first"
                      withShadow
                      autoFocus
                      containerStyle={styles.inputPhone}
                      textContainerStyle={{ borderTopRightRadius:40, borderBottomRightRadius:40}}
                      textInputStyle={{color:"black", fontSize:15, padding:0, paddingLeft:10, marginRight:15}}
                      codeTextStyle={{color:"black", fontSize:14.5, bottom:3,  marginRight:5}}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone} 
                        ref={adresseRef}
                        onSubmitEditing={() => {
                          handleSubmit()
                        }}
                    />
                    {
                      errors.phone || touched.phone ?
                      <Text style={{position:'relative', bottom:windowWidth/12, fontSize:12, fontWeight:'bold', paddingLeft:windowWidth/40,}}>{ errors.phone }</Text>
                      : 
                      <Text></Text>
                    }
                */}

                    {
                      load ?
                      <LottieView
                        source={require('../../assets/lotties/digital.json')}
                        autoPlay
                        loop
                        style={{
                          position:'absolute',
                          top:windowWidth/2.45
                        }}
                    />
                      :
                      <Button onPress={handleSubmit} 
                      buttonStyle={styles.btnLogin}
                      containerStyle={{bottom:0, position:'relative', marginLeft:5, marginRight:5}}
                      titleStyle={{color:'whitesmoke'}}
                      title="INSCRIPTION"
                      disabled={!(dirty && isValid)}
                      disabledStyle={{backgroundColor: 'rgba(255, 109, 0, 0.5)'}}
                      disabledTitleStyle={{color:'rgba(255, 255, 255, 0.5)'}}
                    />}
                  </View>
                  </KeyboardAwareScrollView>
                )}
              </Formik>
            
    
    </View>
  )
       
    
                
}

export default MoreInfos
