import { Link } from '@react-navigation/native';
import React, {useState,useContext, useRef, useEffect} from 'react';
import { View, Text} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors, {getfontSize, getIconSize, getHeight, getWidth} from "../../assets/colors";
import { FirebaseContext } from '../../FirebaseContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { Dimensions } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import { displayPassword } from '../../Redux/Actions/loaders';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from "lottie-react-native";
import DeviceInfo from 'react-native-device-info';


import styles from "./styles";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { get } from 'react-hook-form';

const index = ({navigation}) => {
    const toast = useToast();
    const {loaders:{securePassword}} = useSelector(state => state)
    const dispatch = useDispatch()
    let isTablet = DeviceInfo.isTablet()
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const {auth} = useContext(FirebaseContext);
    const emailRef = useRef();

    const showPassword = (secure) => {
      if(secure){
        return true
      }else{
        return false
      }
    }

    const [load, setLoad] = useState(false)


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
          size={getIconSize(windowWidth,20,windowWidth, 12)}
          color={colors.bgOrange}
          />
          
        </TouchableOpacity>
        )
      }
      
    }


    const SignupSchema = Yup.object().shape({
        password: Yup.string().required('Veuillez saisir votre mot de passe'),
        email: Yup.string().trim().email('Adresse e-mail invalide').required('Veuillez saisir votre e-mail'),
    });


  return(

    <View style={styles.content}>
        <View style={styles.avatar}>
            <Icon name="user-circle" size={getIconSize(windowWidth,5,windowWidth, 3)} color="#fff" />
            <Text style={styles.title}>JE ME CONNECTE</Text>
        </View >

    <Formik
        initialValues={{ email: '',password:''}}
        validationSchema={SignupSchema}
        onSubmit={ async (values) => 
            
            {
              setLoad(true)

              try{

                await auth().signInWithEmailAndPassword(values.email.replace(/\s/g, ''), values.password)
    
            } catch (error) {
                setLoad(false)
    
                switch (error.code) {
    
                    case "auth/invalid-email":
                       
                        toast.show('Cette adresse email est invalide', {
                            type: "danger",
                            placement: "bottom",
                            duration: 4000,
                            offset: 30,
                            animationType: "slide-in ",
                          });

                        break;
                    
                    case "auth/user-not-found":
                       
                        toast.show("Cet utilisateur n'existe pas", {
                            type: "danger",
                            placement: "bottom",
                            duration: 4000,
                            offset: 30,
                            animationType: "slide-in ",
                          });
                        break;
    
                    case "auth/wrong-password":
                       
                        toast.show("Votre mot de passe est invalide", {
                            type: "danger",
                            placement: "bottom",
                            duration: 4000,
                            offset: 30,
                            animationType: "slide-in ",
                          });

                        break;
    
                    default:
                        break;
                        }
                        
                }
        
        
        }}
    >
    {({ errors, isValid, dirty, touched, handleChange, handleBlur, handleSubmit, values }) => (
     <KeyboardAwareScrollView>
      <View style={{flex:1}}>
       
        <Input
         placeholder='Adresse e-mail'
         inputContainerStyle={styles.input}
         leftIconContainerStyle={{marginLeft:20}}
         inputStyle={{color:"black", fontSize:getfontSize(windowWidth,28,windowWidth, 18), padding:3, paddingLeft:10, marginRight:15}}
                    placeholderTextColor="grey"
                    leftIcon={{ type: 'font-awesome', name: 'at', size:getIconSize(windowWidth,20,windowWidth, 12), color:colors.bgOrange }}
                    containerStyle={{
                        height:windowHeight/7.5,
                    }}
                    errorStyle={{fontSize:getfontSize(windowWidth, 35, windowWidth, 22),color:'black', fontWeight:"bold", position:'absolute', top:windowHeight/17, textAlign:'left'}}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          errorMessage= {errors.email && touched.email ? errors.email : null} 
                returnKeyType="next"
                onSubmitEditing={() => {
                    emailRef.current.focus();
                }}
                blurOnSubmit={false}
        />

        <Input
        placeholder='Votre mot de passe'
        inputContainerStyle={styles.input}
        leftIconContainerStyle={{marginLeft:20}}
        inputStyle={{color:"black", fontSize:getfontSize(windowWidth,28,windowWidth, 18), padding:3, paddingLeft:10, marginRight:15}}
        placeholderTextColor="grey"
        leftIcon={{ type: 'font-awesome', name: 'lock', size:getIconSize(windowWidth,20,windowWidth, 12), color:colors.bgOrange }}
        containerStyle={{
            height:getHeight(windowHeight,8.5,windowWidth,5)
        }}
        errorStyle={{fontSize:getfontSize(windowWidth, 35,windowWidth, 22), color:'black', fontWeight:"bold", position:'absolute', top:windowHeight/17, textAlign:'left'}}

          onChangeText={handleChange('password')}
          rightIcon={iconRight()}
          secureTextEntry={showPassword(securePassword)}
          onBlur={handleBlur('password')}
          value={values.password}
          errorMessage= {errors.password && touched.password ? errors.password : null} 
          ref={emailRef} 
          onSubmitEditing={() => {
            handleSubmit()
          }}

        />
       
            <TouchableOpacity onPress={ ()=>navigation.navigate('ForgetPass')}>
                <Text style={{textAlign:'right', padding:20, paddingBottom:windowHeight/4.5, color:'whitesmoke', fontWeight:'bold', fontSize:getfontSize(windowWidth,26 ,windowWidth, 16)}}>
                  Mot de passe oublié ? 
                </Text>
            </TouchableOpacity>
     
      
         {
            load ?
            <LottieView
            source={require('../../assets/lotties/digital.json')}
            autoPlay
            loop
            style={{
              height:windowHeight/10,
              position:'relative',
              left:getWidth(windowWidth,4.5, windowWidth,5),
              bottom:20,
            }} 
            />
            
          :
   
        <Button onPress={handleSubmit}
          buttonStyle={styles.btnLogin}
          disabled={!(dirty && isValid)}
          containerStyle={{bottom:getHeight(windowWidth,35,windowHeight,35), position:'relative', marginLeft:getWidth(windowWidth,40,windowWidth,65), marginRight:getWidth(windowWidth,40,windowWidth, 65)}}
          titleStyle={{color:colors.bgOrange,fontSize:getfontSize(windowWidth,24,windowWidth,17)}}
          title="CONNEXION"
          disabledStyle={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}
          disabledTitleStyle={{color:'rgba(255, 109, 0, 0.6)'}}

        />
    }
      </View>
      
      </KeyboardAwareScrollView> 
    )}
  </Formik>


</View>
    
    )
}

export default index
