import { CART_ITEMS, CART_ADD, CART_UPDATE, RESSET_CART, DELETE_ITEM_LENGTH, ADD_BY_DETAIL } from "../Actions/types";

const initStateCart = {listCart: [], nbUpCart: 0};

const cart = (state = initStateCart, action) => {
    switch (action.type) {

        // tout le contenu data de mon cadi a chaque ajout dans le panier
        case CART_ITEMS:
            return {...state,listCart: action.payload} ;
            break;
            // on envoie la quantitycurrente dans le panier +1 quand je suis sur la page home ou filter
        case CART_UPDATE:
            return {...state, nbUpCart:action.payload };
            break;
        case ADD_BY_DETAIL:
            return {...state, nbUpCart:action.payload };
            break;
            // on envoi 0
        case RESSET_CART:
            return {...state, nbUpCart: action.payload };
            break;
            // on envoi 1
        case CART_ADD:
            return {...state, nbUpCart: state.nbUpCart +1 };
            break;
            // on soustrait la quantité actuell -1 lors d'un delete si cette quantité est egale ou supperieur a 1
        case DELETE_ITEM_LENGTH:
                return {...state, nbUpCart: state.nbUpCart - action.payload };
            break;
        default:
            return state
            break;
    }
    
    
}

export default cart;
