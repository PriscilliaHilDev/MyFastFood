import { ADD_PRODUCT, DEL_PRODUCT, UP_PRODUCT} from "../Actions/types";

const initStateProducts = [];

// initState est un tableau qui prends le payload qui est un objet
const products = (state = initStateProducts, action) => {
 
    switch (action.type) {
        case ADD_PRODUCT:
            return [...state, action.payload];
            break;
        case DEL_PRODUCT:
            const newProducts = state.filter(product => product.id != action.payload)
            return  newProducts;
            break;
        case UP_PRODUCT:
            // je parcours tout le state des Products
            // si on a un products qui porte l'id retourné par le l'action payload, change le contenu du products sinon ne fait rien
            const upProducts = state.map(
                product => 
                    {
                        if(product.id == action.payload.id){
                            return action.payload;
                        }
                        return product;
                    }
            )
            return upProducts;
        default:
            return state;
            break;
    }
}

export default products;