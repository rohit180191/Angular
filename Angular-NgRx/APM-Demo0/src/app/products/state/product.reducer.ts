import { ProductActions, ProductActionTypes } from './products.action';
import { Product } from './../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface State extends fromRoot.State{
    products:ProductState
}

export interface ProductState{
    showProductCode:boolean,
    currentProduct:number,
    products:Product[],
    error:string
}

const initialState:ProductState={
    showProductCode:true,
    currentProduct:null,
    products:[],
    error:""
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state=>state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state=>state.currentProduct
);


export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state,currentProductId)=>{
        if(currentProductId ===0 ){
            return {
                    id: 0,
                    productName:"",
                    productCode: "NEW",
                    description: "",
                    starRating: 0
            }
        }
        return (currentProductId)?state.products.find((obj)=>(obj.id===currentProductId)):null;
    }
);

export const getProducts = createSelector(
    getProductFeatureState,
    state=>state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state=>state.error
);

export function reducer(state=initialState,action:ProductActions):ProductState{
    switch(action.type){

        case ProductActionTypes.ToggleProductCode:

        return {
            ...state,
            showProductCode:action.payload
        };

        case ProductActionTypes.SetCurrentProduct:

        return {
         ...state,
         currentProduct:action.payload
        };

        case ProductActionTypes.ClearCurrentProduct:
        
        return {
            ...state,
            currentProduct:null
        };

        case ProductActionTypes.InitialiseNewProduct:

        return {
            ...state,
            currentProduct:0
        };

        case ProductActionTypes.LoadSuccess:

        return{
            ...state,
            products:action.payload,
            error:""
        };

        case ProductActionTypes.LoadFail:

        return{
            ...state,
            products:[],
            error:action.payload
        };

        case ProductActionTypes.UpdateSuccess:

        return{
            ...state,
            error:"",
            currentProduct:action.payload.id,
            products:state.products.map((obj)=>(obj.id===action.payload.id)?action.payload:obj)
        };

        case ProductActionTypes.UpdateFail:

        return{
            ...state,
            error:action.payload
        };

        case ProductActionTypes.CreateSuccess:
        
                const newProducts = state.products;
                newProducts.push(action.payload);
                return{
                    ...state,
                    error:"",
                    currentProduct:action.payload.id,
                    products:newProducts
                };
        
        case ProductActionTypes.CreateFail:
        
                return{
                    ...state,
                    error:action.payload
                };

        default:
        return state;
    }
}