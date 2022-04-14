import { INFOS } from "../Actions/types";

const initStateInfos = false

const infos = (state = initStateInfos, action) => {

    switch (action.type) {

        case INFOS:
            return action.payload ;
            break;
    
        default:
            return state
            break;
    }
    
}

export default infos;
