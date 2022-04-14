import { ADD_PRODUCT, DEL_PRODUCT, UP_PRODUCT } from "./types"

export const newProduct = (payload) => ({
    type: ADD_PRODUCT,
    payload
})
export const deleteProduct = (payload) => ({
    type: DEL_PRODUCT,
    payload
})
export const updateProduct = (payload) => ({
    type: UP_PRODUCT,
    payload
})