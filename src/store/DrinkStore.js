import {makeAutoObservable} from "mobx";

export default class DrinkStore {
    constructor() {
        this._types = []
        this._subtypes = []
        this._drinks = []
        this._basket = []

        this._selectedType = {}
        this._selectedSubtype ={}

        this._page = 1
        this._totalCount = 0
        this._limit = 8

        makeAutoObservable(this)
    }
//===============================================================================
    setTypes(types){
        this._types = types
    }
    setSubtypes(subtypes){
        this._subtypes= subtypes
    }
    setDrinks(drinks){
        this._drinks = drinks
    }
    setBaskets(basket){
        this._basket = basket
    }
    setSelectedType(type){
        this._selectedType = type

    }
    setSelectedSubtype(subtype){
        this._selectedSubtype = subtype
    }
    setPage(page){
        this._page = page
    }
    setTotalCount(count){
        this._totalCount = count
    }
//===============================================================================
    get types(){
        return this._types
    }
    get subtypes(){
        return this._subtypes
    }
    get drinks(){
        return this._drinks
    }
    get basket() {
        return this._basket
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedSubtype(){
        return this._selectedSubtype
    }
    get page(){
        return this._page
    }
    get totalCount(){
        return this._totalCount
    }
    get limit(){
        return this._limit
    }
}