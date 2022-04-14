import { VISIBLE } from "../Actions/types";

const initStateModal = {modal:false};
const editCart = (state = initStateModal, action) => {
    
    switch (action.type) {

        case VISIBLE:
            return action.payload ;
            break;
    
        default:
            return state
            break;
    }
  
}

export default editCart;