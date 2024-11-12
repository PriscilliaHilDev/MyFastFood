import React, {useContext, useState, useRef, useEffect} from 'react';
import { View, Text, ScrollView, TabBarIOSItem, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors, {getIconSize, getfontSize, getHeight, getWidth} from "../../assets/colors";
import { FirebaseContext } from '../../FirebaseContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { Dimensions } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { useToast } from "react-native-toast-notifications";
import { displayPassword } from '../../Redux/Actions/loaders';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from "lottie-react-native";
import styles from "./styles";
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalCgu from "./modalCgu"


const Index = () => {

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

    const dispatch = useDispatch()
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const {auth, queryAddUser} = useContext(FirebaseContext);
    const [errorEmail, setErrorEmail] = useState(null)
    const toast = useToast()
    const {loaders:{securePassword}} = useSelector(state => state)
    const [load, setLoad] = useState(false)
    const [accepte, setAccept] = useState(false)

        const getErrorEmail = (error, touched) => {
          if(error && touched){
            return error
          }
          if(errorEmail !== null){
            return errorEmail
          }
          return null
        
        }

        // let str = 'jolie   pris      llll ooooo ooo'
        // console.log(str.replace(/\s/g, ''))
        const showPassword = (secure) => {
          if(secure){
            return true
          }else{
            return false
          }
        }

        const iconRight = () => {
          // si true le mot de passe caché je peux l'afficher
          if(securePassword){
            return(
              // montre moi  le mot de passe
              <TouchableOpacity
                onPress={()=>dispatch(displayPassword(false))}
                style={{marginRight:10}}
              >
              <Icon
              name="eye"
              size={getIconSize(windowWidth,20, windowWidth, 12)}
              color={colors.bgOrange}
              />
            </TouchableOpacity>
            )
          }
          if(!securePassword){
            return(
              // montre moi  le mot de passe
              <TouchableOpacity
                onPress={()=>dispatch(displayPassword(true))}
                style={{marginRight:10}}
              >
              <Icon
              name="eye-slash"
              size={getIconSize(windowWidth,20, windowWidth, 12)}
              color={colors.bgOrange}
              />
            </TouchableOpacity>
            )
          }
          
        }

        const newUser = async (email, pass, name) => {
          setLoad(true)
          const {user} = await auth().createUserWithEmailAndPassword(email,pass);
          await queryAddUser(user.uid, {createdAt:Date.now(),CGU:"accepte", prenom:name.replace(/\s/g, ''), roles:["ROLE_CLIENT"],email:email.replace(/\s/g, ''), phone:null,adresse:null})
            .then((res) => {

                // je peux aussi envoyer le nom et le prenom sous forme d'objet a displayName ;)!
                const user = auth().currentUser;
                user.updateProfile({
                  displayName:name.replace(/\s/g, '')
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

      
            const SignupSchema = Yup.object().shape({
                password: Yup.string().required('Un mot de passe est requis')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
                 "7 caractères, dont une majuscule, une minuscule et un chiffre")
                // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/, "Votre mot de passe doit contenir au moins 7 caractère dont une majuscule, une minuscule, un chiffre et un caractère spécial")
                .min(7, '7 caractères au minimun'),
                confirmPass: Yup.string().required('Veuillez confirmer votre mot de passe')
                .oneOf([Yup.ref('password'), null], 'Ces mots de passe ne sont pas identiques'),
                pseudo: Yup.string().trim()
                  .min(2, 'Ce pseudo est trop court')
                  .max(50, 'Ce pseudo est trop long')
                  .required('Veuillez saisir votre prénom'),
                email: Yup.string().trim().email('Adresse e-mail invalide').required('Veuillez saisir votre e-mail'),
              });
            
            
             
              const emailRef = useRef();
              const passwordRef = useRef();
              const pseudoRef = useRef();
              
              return(

                <View style={styles.content}>
                  <View style={styles.avatar}>
                  <Icon name="user-circle" size={getIconSize(windowWidth,5,windowWidth, 3)} color="#fff" />
                      <Text style={styles.title}>JE M'INSCRIS</Text>
                  </View >
                  
                <Formik
                initialValues={{ pseudo:'', email: '',password:'', confirmPass:''}}
                validationSchema={SignupSchema}
                onSubmit={ (values) => 
                  
                {
                      setVisible(false)
                      newUser(values.email, values.password, values.pseudo)
                }}
                 
              
              >
                {({ errors, touched, handleChange, handleBlur, handleSubmit, isValid, dirty, values }) => (
                  <KeyboardAwareScrollView>
                  <View>
                  <Input
                     placeholder='Votre Prénom'
                     inputContainerStyle={styles.input}
                     leftIconContainerStyle={{marginLeft:20}}
                      inputStyle={{color:"black", fontSize:getfontSize(windowWidth,28,windowWidth, 18), padding:3, paddingLeft:10, marginRight:15}}
                      placeholderTextColor="grey"
                      leftIcon={{ type: 'font-awesome', name: 'user', size:getIconSize(windowWidth,20,windowWidth, 12), color:colors.bgOrange }}
                     containerStyle={{
                      height:windowHeight/7.5
                     }}
                     
                     errorStyle={{fontSize:getfontSize(windowWidth, 35, windowWidth, 22),color:'black', fontWeight:"bold", position:'absolute', top:windowHeight/17, textAlign:'left'}}
                     onChangeText={handleChange('pseudo')}
                      onBlur={handleBlur('pseudo')}
                      value={values.pseudo}
                      errorMessage= {getErrorEmail(errors.pseudo, touched.pseudo)} 
                   
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                pseudoRef.current.focus();
                            }}
                            blurOnSubmit={false}
                    />
                    <Input
                     placeholder='Adresse e-mail'
                     inputContainerStyle={styles.input}
                     leftIconContainerStyle={{marginLeft:20}}
                     inputStyle={{color:"black", fontSize:getfontSize(windowWidth,28,windowWidth, 18), padding:3, paddingLeft:10, marginRight:15}}
                      placeholderTextColor="grey"
                      leftIcon={{ type: 'font-awesome', name: 'at', size:getIconSize(windowWidth,20,windowWidth, 12), color:colors.bgOrange }}
                     containerStyle={{
                      height:windowHeight/7.5
                     }}
                     
                     errorStyle={{fontSize:getfontSize(windowWidth, 35, windowWidth, 22),color:'black', fontWeight:"bold", position:'absolute', top:windowHeight/17, textAlign:'left'}}
                     onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      errorMessage= {getErrorEmail(errors.email, touched.email)} 
                      ref={pseudoRef} 
                      returnKeyType="next"
                      onSubmitEditing={() => {
                          emailRef.current.focus();
                      }}
                      blurOnSubmit={false}
                          
                    />
                   
                    <Input
                    placeholder='Votre mot de passe'
                    rightIcon={iconRight}
                    secureTextEntry={showPassword(securePassword)}
                    inputContainerStyle={styles.input}
                    leftIconContainerStyle={{marginLeft:20}}
                    inputStyle={{color:"black", fontSize:getfontSize(windowWidth,28,windowWidth, 18), padding:3, paddingLeft:10, marginRight:15}}
                    placeholderTextColor="grey"
                    leftIcon={{ type: 'font-awesome', name: 'lock', size:getIconSize(windowWidth,20,windowWidth, 12), color:colors.bgOrange }}
                    containerStyle={{
                        height:windowHeight/7.5,
                        
                    }}
                    errorStyle={{fontSize:getfontSize(windowWidth, 35, windowWidth, 22),color:'black', fontWeight:"bold", position:'absolute', top:windowHeight/17, textAlign:'left'}}
                    renderErrorMessage={true}

                      onChangeText={handleChange('password')}
                      
                      onBlur={handleBlur('password')}
                      value={values.password}
                      errorMessage= {errors.password && touched.password ? errors.password : null} 
                      ref={emailRef} 
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                passwordRef.current.focus();
                            }}
                            blurOnSubmit={false}
                    />
                      <Input
                        rightIcon={iconRight}
                        secureTextEntry={showPassword(securePassword)}
                       placeholder='Confirmer'
                       inputContainerStyle={styles.input}
                       leftIconContainerStyle={{marginLeft:20}}
                       inputStyle={{color:"black", fontSize:getfontSize(windowWidth,28,windowWidth, 18), padding:3, paddingLeft:10, marginRight:5}}
                       placeholderTextColor="grey"
                       leftIcon={{ type: 'font-awesome', name: 'lock', size:getIconSize(windowWidth,20,windowWidth, 12), color:colors.bgOrange }}
                       containerStyle={{
                        height:getHeight(windowHeight,5.8,windowHeight,6.5)
                       }}
                       errorStyle={{fontSize:getfontSize(windowWidth, 35, windowWidth, 22),color:'black', fontWeight:"bold", position:'absolute', top:windowHeight/17, textAlign:'left'}}

                      onChangeText={handleChange('confirmPass')}
                      
                      onBlur={handleBlur('confirmPass')}
                      value={values.confirmPass}
                      errorMessage= {errors.confirmPass && touched.confirmPass ? errors.confirmPass : null} 
                      ref={passwordRef}
                      onSubmitEditing={() => {
                        !(dirty && isValid) ?
                        setVisible(false)
                        :
                        setVisible(!visible)
                      }}
                    />
                 

               {
                      load ?
                       <LottieView
                        source={require('../../assets/lotties/digital.json')}
                        autoPlay
                        loop
                        style={{
                          position:'absolute',
                          bottom:0,
                          top:windowHeight/4
                          
                        }}
                    />
                      :
                      <>
                      <Button 
                      onPress={()=>setVisible(!visible)}
                      containerStyle={{bottom:getHeight(windowWidth,35,windowHeight,40), position:'relative', marginLeft:getWidth(windowWidth,40,windowWidth,65), marginRight:getWidth(windowWidth,40,windowWidth, 65)}}
                      titleStyle={{color:"#fff",fontSize:getfontSize(windowWidth,24,windowWidth,17)}}
                      title="INSCRIPTION"
                      buttonStyle={styles.btnRegister}
                      disabled={!(dirty && isValid)}
                      disabledStyle={{backgroundColor: 'rgba(255, 109, 0, 0.5)'}}
                      disabledTitleStyle={{color:'rgba(255, 255, 255, 0.5)'}}
                    />
                    <ModalCgu visible={visible} toggleOverlay={toggleOverlay} submit={handleSubmit}/>
                    </>
                    } 
                  </View>
                  </KeyboardAwareScrollView>
                )}
              </Formik>
            
    
    </View>
              )
       
    
                
}

export default Index
