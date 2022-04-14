import React, { useState } from 'react';
import { Button, Overlay, Icon } from 'react-native-elements';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors, { getfontSize, getHeight, getIconSize } from '../../assets/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const modalCgu = ({visible, toggleOverlay, submit}) => {

    const navigation = useNavigation()


  return (
    <View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{margin:20, borderRadius:10}} >
        <Text style={styles.textPrimary}>MyFastFood CGU</Text>
        <Text style={styles.textSecondary}>
           En vous inscrivant, vous confirmer accepter nos <Text style={{fontWeight:'bold', textDecorationLine:'underline'}}>conditions d'utilisatation</Text> et
            avoir lu et compris <Text style={{fontWeight:'bold', textDecorationLine:'underline'}}>notre politique de confidentialité.</Text>
        </Text>
        <TouchableOpacity onPress={ ()=>navigation.navigate('CGU')}>
          <Text style={{textAlign:'center', paddingBottom:20, color:colors.bgPublic, fontWeight:'bold', fontSize:getfontSize(windowWidth,28 ,windowWidth, 18)}}>
            Lire les CGU
          </Text>
        </TouchableOpacity>
        <View style={{ margin:20, marginTop: 0}}>
          <Button
                icon={
                  <Icon
                    name="check-circle"
                    size={getIconSize(windowWidth,20, windowWidth, 12)}
                    color="white"
                    iconStyle={{marginLeft: 10}}
                  />
                }
                iconRight
            containerStyle={{marginBottom:0, height:getHeight(windowHeight, 15, windowHeight, 15)}}
            titleStyle={{fontSize:  getfontSize(windowWidth, 26, windowWidth, 18)}}
            buttonStyle={{backgroundColor:colors.bgOrange}}
            title="Accepter les CGU"
            onPress={submit}
          />
        
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize:  getfontSize(windowWidth, 22, windowWidth, 17),
    fontWeight:'bold'
  },
  textSecondary: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize:  getfontSize(windowWidth, 30, windowWidth, 22),
  },
});

export default modalCgu;