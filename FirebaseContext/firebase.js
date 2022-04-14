import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import storage from '@react-native-firebase/storage';


class Firebase {

    constructor() {

        this.auth = auth;
        this.firestore = firestore;
        // this.storage = storage;
        this.firebase = firebase;
    }
    // ALL QUERYS
    queryAddUser = (id, data) => firestore().collection("users").doc(id).set(data);
    queryAllProducts = () => firestore().collection("products");
    queryAllCategories = () => firestore().collection("category").orderBy('name',"asc");
    queryProductsByCategorie = (id) => firestore().collection("products").where("category_id", "==", id).orderBy('createdAt', "desc");
    queryOneProduct = (id) => firestore().collection('products').doc(id)
    queryAddOrderItems = (data) => firestore().collection('order_items').add(data);
    queryAllOrderItems = (userID) => firestore().collection('order_items').where('user_id', '==', userID).where("order_id", '==', null)
    updateOrderItem = (idProduct, data) => firestore().collection('order_items').doc(idProduct).update(data);
    deleteOrderItem = (idProduct) => firestore().collection('order_items').doc(idProduct).delete();
    createdOrder = (data) => firestore().collection('orders').add(data)
    updateOrderID = (idItem, data) => firestore().collection('order_items').doc(idItem).update(data)
    queryAllOrders = (userID) => firestore().collection('orders').where('user_id', "==", userID).orderBy('createdAt', "desc");
    queryOrderItemOfCart = (userID, orderID) => firestore().collection('order_items').where('user_id', "==", userID).where("order_id", "==", orderID)
    checkUserExist = (email) => firestore().collection('users').where('email','==', email)
    getUser = (userID) => firestore().collection('users').doc(userID)
}

export default Firebase;


