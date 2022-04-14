import { ADD_CATEGORY, DEL_CATEGORY, UP_CATEGORY } from "./types"

export const newCategory = (payload) => ({
    type: ADD_CATEGORY,
    payload
})
export const deleteCategory = (payload) => ({
    type: DEL_CATEGORY,
    payload
})
export const updateCategory = (payload) => ({
    type: UP_CATEGORY,
    payload
})