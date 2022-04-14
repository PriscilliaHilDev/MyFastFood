import { LIST_PRODUCTS } from "../Actions/types";

const initStateProducts = [];

const listProducts = (state = initStateProducts, action) => {

    switch (action.type) {

        case LIST_PRODUCTS:
            return action.payload ;
            break;
    
        default:
            return state
            break;
    }
    
    
}

export default listProducts;
