import { LOADING, ORDERLOADING, PASSWORD } from "../Actions/types";

const initStateLoaders = {loadDatas:false, securePassword:true, orderLoad: false};

const loaders = (state = initStateLoaders, action) => {
    switch (action.type) {

        case LOADING:
            return {...state, loadDatas: action.payload} ;
            break;
        case ORDERLOADING:
            return {...state, orderLoad:action.payload };
            break;
        case PASSWORD:
            return {...state, securePassword:action.payload };
            break;
           
        default:
            return state
            break;
    }
    
    
}

export default loaders;
