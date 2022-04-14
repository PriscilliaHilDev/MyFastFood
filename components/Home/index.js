import React, {useEffect, useContext, useState} from 'react'
import { View, Text, Image} from 'react-native'
import styles from './styles';
import { Button } from 'react-native-elements';
import colors, {getfontSize} from "../../assets/colors";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const index = ({navigation}) => {

    return (
        <>
        <View style={styles.image}>
            <Image  style={{ borderBottomRightRadius:windowWidth/3,borderBottomLeftRadius:windowWidth/3, width: '100%', height: "95%" }} source={require('../../assets/images/burger1.jpg')}/>
        </View>
        <View style={styles.content}>
            <View style={styles.headerContent}>
                <Text style={styles.titleMain}>BIENVENUE à MYFASTFOOD</Text>
            </View>
            <View style={styles.bottomContent}>
                <Button
                    buttonStyle={styles.btnLogin}
                    title="CONNEXION"
                    titleStyle={{fontSize:getfontSize(windowWidth,24,windowWidth,17), color:colors.bgOrange}}
                    onPress={()=>navigation.navigate('Login')}
                />
                <Button
                    buttonStyle={styles.btnRegister}
                    titleStyle={{fontSize:getfontSize(windowWidth,24,windowWidth, 17)}}
                    title="INSCRIPTION"
                    onPress={()=>navigation.navigate('Register')}
                />
            </View>
        </View>
        </>
    )
}

export default index

