import { INFOS } from "../Actions/types";

const initStateInfos = true

const dataPerso = (state = initStateInfos, action) => {

    switch (action.type) {

        case INFOS:
            return action.payload ;
            break;
    
        default:
            return state
            break;
    }
    
}

export default dataPerso;
