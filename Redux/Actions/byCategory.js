import { READ_PRODUCT } from "./types"

export const productListByCategory = (payload) => ({
    type: READ_PRODUCT,
    payload
})