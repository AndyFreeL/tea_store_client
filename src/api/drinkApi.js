import {$authHost, $host} from "./index";

//==============Types==============
export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}
export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}
//==============Subtypes===========
export const fetchSubtypes = async () => {
    const {data} = await $host.get(`api/subtype`)
    return data
}
export const createSubtype = async (subtype, typeId) => {
    const {data} = await $authHost.post('api/subtype', subtype, typeId)
    console.log(data)
    return data
}
//==============Drinks=============
export const fetchDrinks = async (typeId, subtypeId, page, limit = 5) => {
    const {data} = await $host.get('api/drink', {
        params: {
            typeId, subtypeId, page, limit
        }
    })
    return data
}
export const fetchOneDrink = async (id) => {
    const {data} = await $host.get('api/drink/' + id)
    return data
}
export const createDrink = async (drink) => {
    const {data} = await $authHost.post('api/drink', drink)
    return data
}
//==============Basket=============
export const addToBasket = async (drinkId) => {
    const {response} = await $authHost.post('api/basket', drinkId)
    return response
}
export const getBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}
export const deleteInToBasket = async(itemId)=>{
    const {data} = await $authHost.delete('api/basket/'+ itemId)
    return data
}