import { LOADING } from "../Actions/types";

const initStateLoader = false;

const loader = (state = initStateLoader, action) => {

    switch (action.type) {

        case LOADING:
            return action.payload ;
            break;
    
        default:
            return state
            break;
    }
    
    
}

export default loader;
