import { CART_ITEMS, CART_ADD, CART_UPDATE, RESSET_CART, DELETE_ITEM_LENGTH, ADD_BY_DETAIL } from "./types"

export const itemsCart = (payload) => ({
    type: CART_ITEMS,
    payload
})

export const nbUpCart = (payload) => ({
    type: CART_UPDATE,
    payload
})

export const nbAddCart = (payload) => ({
    type: CART_ADD,
    payload
})


export const ressetCart = (payload) => ({
    type: RESSET_CART,
    payload
})


export const lessCart = (payload) => ({
    type: DELETE_ITEM_LENGTH,
    payload
})
export const addCartByDetail = (payload) => ({
    type: ADD_BY_DETAIL,
    payload
})
