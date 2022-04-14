import React, {useState, useContext, useEffect} from 'react';
import Home from './components/Home';
import {View} from 'react-native'
import Login from "./components/Login";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import Register from "./components/Register";
import Private from './components/Private';
import CGU from './components/CGU';
import { FirebaseContext } from './FirebaseContext';
import {STRIPE_PUBLISHABLE_KEY} from "./keys.js";
import {LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);
import ForgetPass from './components/ForgetPass'
import { StripeProvider } from '@stripe/stripe-react-native';


const App = () => {

  // Utilisation du service auth de firebase
  const {auth} = useContext(FirebaseContext);
  // création de la navigation entre les différentes vues accessibles sans authentification (login, home, register, forgetPass)
  const Stack = createStackNavigator();
  // initialisation du state qui devra l'utilisateur authentifié
  const [isUser, setIsUser] = useState(null)
  const publishableKey = 'pk_test_51JQD8gLp7IQnYLFLHiL4vIgMq1L7DpoNIYq8VCjm2RamvwCZeDzeh8mgUVixckyB2L8PcURGLLQMVeH43Z7s6pNK00kh09qRZm';

  // Au montage du composant racine de l'application je détecte si un utilisateur authentifié existe
  useEffect(() => {

    // Je fais appel à l'écouteur d'évenement fournit par le service auth de firebase pour detecter une authentification
    const authChange = auth().onAuthStateChanged(user =>{

     // Je stocker l'utilisation dans le state "isUser"
      setIsUser(user)
   
    })
    
    // désabonnement de l'écouteur d'évenement lors du démontage du composant.
    return () => {
      authChange()
    }
  }, [])

  
 return (
  
    <NavigationContainer>
    { 
      isUser ? 

      <StripeProvider
        publishableKey={publishableKey}
        merchantIdentifier="merchant.identifier"
      >
        <Private />
      </StripeProvider>

      :
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} /> 
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CGU" component={CGU} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgetPass" component={ForgetPass} />
      </Stack.Navigator>
    }
    </NavigationContainer>
 )
}

export default App
