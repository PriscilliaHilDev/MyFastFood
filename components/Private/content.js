import React, {useState, useContext} from 'react'
import { View, Text, Dimensions } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import styles from './styles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Drawer, Title, TouchableRipple, Switch} from 'react-native-paper';
import { FirebaseContext } from '../../FirebaseContext';
import { useToast } from "react-native-toast-notifications";
import colors, {getHeight, getIconSize, getfontSize, getWidth} from "../../assets/colors";


const content = (props) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const toast = useToast();

    const {auth} = useContext(FirebaseContext)

    const user = auth().currentUser
    const logout = () => {
        auth().signOut().then(res => {
            toast.show('Déconnexion réussite', {
                type: "normal",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                animationType: "slide-in ",
              });
        })
    }

    return (
        <View style={{flex:1, zIndex:4}}>
            <DrawerContentScrollView {...props} >
                <View style={styles.content}>
                <View style={{flexDirection:'row', padding:10}}> 
                    <Text style={styles.userName}>
                        {user.displayName}
                    </Text>
                </View>
                    <Drawer.Section>
                        <DrawerItem
                            icon={() => (
                                <Icon name="shopping-bag" size={getIconSize(windowWidth,22,windowWidth, 10)} color={colors.MarronDark} />
                            )}
                            label='Mes commandes'
                            labelStyle={{fontSize:getfontSize(windowWidth,35, windowWidth, 20)}}
                            onPress={()=>props.navigation.navigate("Orders")}
                        >           
                        </DrawerItem>
                    </Drawer.Section>
                    <Drawer.Section title="Réglementations">
                    
                         <DrawerItem
                            icon={() => (
                                <Icon name="info-circle" size={getIconSize(windowWidth,22,windowWidth, 10)} color={colors.MarronDark} />
                            )}
                            label='Consulter les CGV'
                            labelStyle={{fontSize:getfontSize(windowWidth,35, windowWidth, 20)}}
                        /> 
                        <DrawerItem
                            icon={() => (
                                <Icon name="info-circle" size={getIconSize(windowWidth,22,windowWidth, 10)} color={colors.MarronDark} />
                            )}
                            label='Consulter les CGU'
                            labelStyle={{fontSize:getfontSize(windowWidth,35, windowWidth, 20)}}
                        />    
                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.logout}>
                <DrawerItem
                    icon={() => (
                        <Icon name="sign-out"  size={getIconSize(windowWidth,17,windowWidth, 10)} color={colors.MarronDark} />
                    )}
                        label='Se deconnecter'
                        labelStyle={{fontSize:getfontSize(windowWidth,32, windowWidth, 20)}}
                        onPress={ ()=>{
                            logout()
                        }
                    }
                >
                                    
                </DrawerItem>
            </Drawer.Section>
        </View>
    )
}

export default content
