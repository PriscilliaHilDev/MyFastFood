/**
 * @format
 */
 import React from 'react';

 import {AppRegistry, Dimensions} from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';
 import Firebase, {FirebaseContext} from './FirebaseContext';
 import { Provider } from 'react-redux';
 import store from './Redux/store';
//  import messaging from '@react-native-firebase/messaging';
 import { ToastProvider } from 'react-native-toast-notifications'
 import colors, {getfontSize} from './assets/colors';

 const AppContext = () => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;


     return (
         <FirebaseContext.Provider value={new Firebase()}> 
             <Provider store={store}>
                <ToastProvider
                //    placement="bottom | top"
                //    duration={5000}
                //    animationType='slide-in | zoom-in'
                //    animationDuration={250}
                //    successColor="green"
                //    dangerColor="red"
                //    dangerColor="red"
                //    warningColor="orange"
                //    normalColor="gray"
                   textStyle={{ fontSize: getfontSize(windowWidth, 30, windowWidth, 22)}}
                //    offset={50} // offset for both top and bottom toasts
                //    offsetTop={30}
                //    offsetBottom={40}
                //    swipeEnabled={true}
                //    renderToast={(toastOptions) => JSX.Element} 
                >
                    
                    <App/>
                </ToastProvider>
             </Provider>
         </FirebaseContext.Provider> 
     )
 }
 
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//   });
 AppRegistry.registerComponent(appName, () => AppContext);