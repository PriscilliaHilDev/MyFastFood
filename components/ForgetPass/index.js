import { Link } from '@react-navigation/native';
import React, {useState,useContext, useRef, useEffect} from 'react';
import { View, Text} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors, {getfontSize, getHeight, getWidth, getIconSize} from "../../assets/colors";
import { FirebaseContext } from '../../FirebaseContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { Dimensions } from 'react-native';
import { useToast } from "react-native-toast-notifications";



import styles from "./styles";
import { TouchableOpacity } from 'react-native-gesture-handler';

const index = ({navigation}) => {
    const toast = useToast();

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const {auth} = useContext(FirebaseContext);
    const lastNameRef = useRef();


    const SignupSchema = Yup.object().shape({
        email: Yup.string().trim().email('Adresse e-mail invalide').required('Veuillez saisir votre e-mail'),
    });


  return(

    <View style={styles.content}>
        <View style={styles.avatar}>
            <Icon name="user-circle" size={getIconSize(windowWidth,5,windowWidth, 3)} color="#fff" />
            <Text style={styles.title}>JE REINITIALISE MON MOT DE PASSE</Text>
        </View >

    <Formik
        initialValues={{ email: ''}}
        validationSchema={SignupSchema}
        onSubmit={async(values) => {

            await auth().sendPasswordResetEmail(values.email).then(()=>{
                let message = "Un mail vous à été envoyé à l'adresse suivrante : "+ values.email + " pour réinitialiser votre mot de passe"
                toast.show(message, {
                    type: "success",
                    placement: "bottom",
                    duration: 10000,
                    offset: 30,
                    animationType: "slide-in ",
                    style:{fontSize:40}
                  });
          
              }).catch((error) => {
          
          
              switch (error.code) {
          
                  case "auth/invalid-email":
                    toast.show("Cette adresse e-mail est invalide", {
                        type: "danger",
                        placement: "bottom",
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in ",
                      });
                      break;
                  
                  case "auth/missing-continue-uri":
                    toast.show("Une URL de continuation doit être fournie dans la demande.", {
                        type: "danger",
                        placement: "bottom",
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in ",
                      });
                      break;
          
                  case "auth/wrong-auth/invalid-continue-uri":
                    toast.show("L'URL de continuation fournie dans la demande n'est pas valide.", {
                        type: "danger",
                        placement: "bottom",
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in ",
                      });
                      break;
          
                  case "auth/user-not-found":
                    toast.show("L'utilisateur n'existe pas.", {
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
            }) 

        }}
    >
    {({ errors, touched, isValid, dirty, handleChange, handleBlur, handleSubmit, values }) => (
      <KeyboardAwareScrollView>
      <View>
       
        <Input
         placeholder='Adresse e-mail'
         inputContainerStyle={styles.input}
         leftIconContainerStyle={{marginLeft:20}}
         inputStyle={{color:"black", fontSize:getfontSize(windowWidth,28,windowWidth, 18), padding:3, paddingLeft:10, marginRight:15}}
                    placeholderTextColor="grey"
                    leftIcon={{ type: 'font-awesome', name: 'at', size:getIconSize(windowWidth,20,windowWidth, 12), color:colors.bgOrange }}
                    containerStyle={{
                        height:getHeight(windowHeight,2.25, windowHeight, 2.5)
                    }}
                    errorStyle={{color:'black', fontWeight:"bold", }}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          errorMessage= {errors.email && touched.email ? errors.email : null} 
                onSubmitEditing={() => {
                    handleSubmit();
                }}
          />
   
        <Button onPress={handleSubmit}
          buttonStyle={styles.btnForget}
          disabled={!(dirty && isValid)}
          containerStyle={{bottom:getHeight(windowWidth,35,windowHeight,35), position:'relative', marginLeft:getWidth(windowWidth,40,windowWidth,65), marginRight:getWidth(windowWidth,40,windowWidth, 65)}}
          titleStyle={{color:colors.bgOrange,fontSize:getfontSize(windowWidth,24,windowWidth,17)}}
          title="VALIDER MA DEMANDE"
          disabledStyle={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}
          disabledTitleStyle={{color:'rgba(255, 109, 0, 0.6)'}}
        />
      </View>
      
       </KeyboardAwareScrollView> 
    )}
  </Formik>


</View>
    
    )
}

export default index
