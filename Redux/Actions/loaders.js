import {LOADING, ORDERLOADING, PASSWORD} from './types'

export const getLoading = (payload) => ({
    type: LOADING,
    payload
})

export const getOrderLoad = (payload) => ({
    type: ORDERLOADING,
    payload
})

export const displayPassword = (payload) => ({
    type: PASSWORD,
    payload
})


