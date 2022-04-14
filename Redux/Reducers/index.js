import { combineReducers } from "redux";
import listProducts from "./listProducts";
import byCategory from './byCategory';
import cart from './cart';
import editCart from './editCart';
import tabOrderID from "./tabOrderID"
import loader from './loader'
import infos from "./infos"
import loaders from "./loaders";
import dataPerso from "./dataPerso";

export default combineReducers({loaders,listProducts, dataPerso, infos, loader, byCategory, cart, editCart, tabOrderID});