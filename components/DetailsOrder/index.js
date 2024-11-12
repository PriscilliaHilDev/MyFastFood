import React, {useState} from 'react'
import { View, Text } from 'react-native';
import List from "./List";
import Header from '../Header';
import styles from './styles';
import colors from '../../assets/colors';


const Index = ({route}) => {

    const { id, total, status} = route.params;


    return (
      
        <View style={{backgroundColor:colors.bgPrivate, flex:1}}>
            <Header/>
            <Text style={styles.titleOrders}> Récapitulatif de la Commande N° </Text>
            <Text  style={styles.SubtitleOrders}>{id}</Text>
            <View style={styles.container}>
                <List/>
            </View>
            <View style={styles.totalItems}>
            <View style={styles.infosTotal}>
               <Text style={styles.titleInfosTotal}>Récapitulatif</Text>   
                    <Text style={styles.textInfosTotale}>Status : {status}   </Text>
                    <Text style={styles.textInfosTotale}> Prix Totale : {total} €</Text>
                </View>
            </View>
           
        </View>
            
    )
}

export default Index
