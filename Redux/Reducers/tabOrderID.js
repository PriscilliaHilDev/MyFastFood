import { TAB_ID_CART } from "../Actions/types";

const initStateOrderID = [];

const tabOrderID = (state = initStateOrderID, action) => {
    switch (action.type) {

        
        case TAB_ID_CART:
            return action.payload ;
            break;
    
        default:
            return state
            break;
    }
    
    
}

export default tabOrderID;
