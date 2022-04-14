import React, {useState, useContext, useEffect} from 'react';
import { View, Text, FlatList, Dimensions} from 'react-native';
import Items from "./Items";
import { FirebaseContext } from '../../FirebaseContext';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors, { getIconSize } from '../../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { infoModal } from '../../Redux/Actions/infos';
import { useDispatch } from 'react-redux';
import LottieView from "lottie-react-native";
import { getOrderLoad } from '../../Redux/Actions/loaders';

const List = () => {

  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
    const {queryAllOrders, auth} = useContext(FirebaseContext);
    const [loading, setLoading] = useState(true)

    const [readOrders, setReadOrders] = useState('')
    const user = auth().currentUser
    const dispatch = useDispatch()

    const listOders = async() => {

        await queryAllOrders(user.uid).onSnapshot((snapshot)=>{
          let allOders = [];

          if( snapshot && !snapshot.empty){
            snapshot.forEach(element => {
            allOders.push({id:element.id, ...element.data()});
            })
            setTimeout(() => {
              dispatch(getOrderLoad(false))
            }, 2000)
          }else{
            setTimeout(() => {
              dispatch(getOrderLoad(false))
          }, 2000)

        }
         setReadOrders(allOders)
    })
  }

    const openInfos = () => {
      dispatch(infoModal(true))
    }

    const nbItemOfOrder = readOrders.length > 0 ? readOrders.length : 0
        
      useEffect(() => {

       
        const subscribeOrders = listOders();
       
        return () => {
            subscribeOrders;
      
        }
      }, [])
  
    return (
     
          <FlatList
                data={readOrders}
                ListHeaderComponent={
                      <View style={{marginTop:10, flexDirection:'row', justifyContent:'center'}}>
                          <Text style={styles.titleOrders}> MES COMMANDES ({nbItemOfOrder})</Text>
                          <TouchableOpacity
                            onPress={()=>openInfos()}
                          >
                            <Icon
                              name="info-circle"
                              size={getIconSize(windowWidth, 15, windowWidth, 10)}
                              color={colors.MarronDark}
                            />
                          </TouchableOpacity>
                      </View>
                }
                ListFooterComponent={
                  <View style={{marginBottom:10}}></View>
                }
                ListEmptyComponent= {
              
                  !loading &&
                  <Text style={{fontSize:16, textAlign:'center', color:colors.subTitle}}>Aucunes commandes trouvées ...</Text>

               }                
               renderItem={({item}) => <Items item={item}/> }
                keyExtractor={item => item.id}
            />

  
    )
}

export default List
