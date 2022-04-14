import { ADD_CATEGORY, DEL_CATEGORY, UP_CATEGORY} from "../Actions/types";

const initStateCategories = [{name:'Tous les plats', id: 0}];

// initState est un tableau qui prends le payload qui est un objet
const categories = (state = initStateCategories, action) => {
 
    switch (action.type) {
        case ADD_CATEGORY:
            return [...state, action.payload];
            break;
        case DEL_CATEGORY:
            const newCategories = state.filter(category => category.id != action.payload)
            return  newCategories;
            break;
        case UP_CATEGORY:
            // je parcours tout le state des Categories
            // si on a un Categories qui porte l'id retourné par le l'action payload, change le contenu du Categories sinon ne fait rien
            const upCategories = state.map(
                category => 
                    {
                        if(category.id == action.payload.id){
                            return action.payload;
                        }
                        return category;
                    }
            )
            return upCategories;
        default:
            return state;
            break;
    }
}

export default categories;