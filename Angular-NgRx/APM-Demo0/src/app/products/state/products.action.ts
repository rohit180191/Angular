import { Product } from './../product';
import { Action } from '@ngrx/store';

export enum ProductActionTypes {
    ToggleProductCode = "[Product] Toggle Product Code",
    SetCurrentProduct = "[Product] Set Current Product",
    ClearCurrentProduct = "[Product] Clear Current Product",
    InitialiseNewProduct = "[Product] Initialise New Product",
    Load = "[Product] Load Products",
    LoadFail = "[Product] Load Products Failed",
    LoadSuccess = "[Product] Load Products Success",
    UpdateProduct = "[Product] Update Product",
    UpdateSuccess = "[Product] Update Product Success",
    UpdateFail = "[Product] Update Product Fail",
    CreateProduct = "[Product] Create Product",
    CreateSuccess = "[Product] Create Product Success",
    CreateFail = "[Product] Create Product Fail"
}

export class ToggleProductCode implements Action{
    readonly type = ProductActionTypes.ToggleProductCode;

    constructor(public payload:boolean){}
}

export class SetCurrentProduct implements Action{
    readonly type = ProductActionTypes.SetCurrentProduct;
    
    constructor(public payload:number){}
}

export class ClearCurrentProduct implements Action{
    readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitialiseNewProduct implements Action{
    readonly type = ProductActionTypes.InitialiseNewProduct;
}

export class Load implements Action{
    readonly type = ProductActionTypes.Load
}

export class LoadFail implements Action{
    readonly type = ProductActionTypes.LoadFail;

    constructor(public payload:string){}
}

export class LoadSuccess implements Action{
    readonly type = ProductActionTypes.LoadSuccess;

    constructor(public payload:Product[]){}

}

export class UpdateProduct implements Action{
    readonly type = ProductActionTypes.UpdateProduct;

    constructor(public payload:Product){}
}

export class UpdateSuccess implements Action{
    readonly type = ProductActionTypes.UpdateSuccess;

    constructor(public payload:Product){}
}

export class UpdateFail implements Action{
    readonly type = ProductActionTypes.UpdateFail;

    constructor(public payload:string){}
}

export class CreateProduct implements Action{
    readonly type = ProductActionTypes.CreateProduct;

    constructor(public payload:Product){}
}

export class CreateSuccess implements Action{
    readonly type = ProductActionTypes.CreateSuccess;

    constructor(public payload:Product){}
}

export class CreateFail implements Action{
    readonly type = ProductActionTypes.CreateFail;

    constructor(public payload:string){}
}

export type ProductActions = ToggleProductCode
| SetCurrentProduct
| ClearCurrentProduct
| InitialiseNewProduct 
| Load 
| LoadFail 
| LoadSuccess
| UpdateProduct
| UpdateSuccess
| UpdateFail
| CreateProduct
| CreateSuccess
| CreateFail;