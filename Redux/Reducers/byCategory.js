import { READ_PRODUCT } from "../Actions/types";

const initStateByCategory = 0;
const byCategory = (state = initStateByCategory, action) => {
    
    switch (action.type) {

        case READ_PRODUCT:
            return action.payload ;
            break;
    
        default:
            return state
            break;
    }
    
    
}

export default byCategory;
