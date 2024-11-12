import React, {useState, useContext, useEffect} from 'react'
import { View, Text, TouchableWithoutFeedback, Modal, Dimensions} from 'react-native'
import { Dialog, Avatar, Button } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles';
import { FirebaseContext } from '../../FirebaseContext';
import { toggleShowModal } from '../../Redux/Actions/editCart';
import colors, { getfontSize, getHeight, getIconSize } from '../../assets/colors';


const edit = () => {

    const {updateOrderItem, deleteOrderItem} = useContext(FirebaseContext);
    const [quantity, setQuantity] = useState(1);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
  
  
    const dispatch = useDispatch()

    const {editCart:{modal, idOrderItem, idProductOrder}, listProducts} = useSelector(state => state);

    const GetData = 
        
        listProducts.filter(element =>{
            if(element.id === idProductOrder){
                return element;
            }
        })  
    
    const hiddenModal = () => {
         dispatch(toggleShowModal({
                modal:false,
                idOrderItem:null,
            }))
            setQuantity(1)
    }
    const editOrder = (id) => {
        if(quantity > 0){
            updateOrderItem(id, {
                quantity
            })
            dispatch(toggleShowModal({
                modal:false,
                idOrderItem:null
            }))
         // quantité par defaut de l'input numerique
            setQuantity(1)
        }
       
        if(quantity == 0){
            deleteOrderItem(idOrderItem)
            dispatch(toggleShowModal({
                modal:false,
                idOrderItem:null
            }))
            // quantité par defaut de l'input numerique
            setQuantity(1)
        }
    }
    // console.log(modal, idOrderItem)

    return (

        <Modal
            style={styles.modal}
            animationType="fade"
            transparent={true}
            visible={modal}
         >
            <TouchableWithoutFeedback  onPress={()=>hiddenModal()}>
                <View style={styles.centeredView}>              
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                        <Avatar
                            source={{
                                uri:
                                getData[0]?.image_url,
                            }} 
                            size={getIconSize(windowWidth,2, windowWidth, 1.8)}
                        />
                            <Text style={styles.name}>
                                {getData[0]?.name} 
                            </Text>
                            <NumericInput 
                                NumericInput type='up-down'
                                onChange={setQuantity}
                                value={quantity}
                                totalWidth={windowWidth/3.5} 
                                totalHeight={windowHeight/12} 
                                iconSize={28}
                                step={1}
                                minValue={1}
                                maxValue={15}
                                
                                valueType='real'
                                rounded 
                                textColor='#fff' 
                                rightButtonBackgroundColor="#fff"
                                leftButtonBackgroundColor="#fff"
                                upDownButtonsBackgroundColor='#fff'
                                containerStyle={{
                                    backgroundColor:colors.MarronDark, 
                                    height: getHeight(windowHeight, 12, windowHeight, 15),
                                    borderRadius:10,
                                    borderColor:'#fff'
                                }}
                                borderColor='#fff'
                               
                                editable={false}
                            
                            />
                            <Text style={styles.name}>
                                {getData[0]?.price} €
                            </Text>
                            <Button
                                buttonStyle={styles.button}
                                title="VALIDER"
                                onPress={()=>editOrder(idOrderItem)}
                                titleStyle={{
                                    textAlign:'center',
                                    paddingRight:40,
                                    paddingLeft:40,
                                    fontSize:getfontSize(windowWidth, 28, windowWidth, 20)
                                   
                                }}
            
                            />
                         
                            </View>
                    </TouchableWithoutFeedback>
                </View> 
            </TouchableWithoutFeedback>        
        </Modal>
      
    )
}

export default edit
