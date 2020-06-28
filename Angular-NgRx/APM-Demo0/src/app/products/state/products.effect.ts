import { Action } from '@ngrx/store';
import { ProductService } from './../product.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as productActions from './products.action'
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of, Observable } from 'rxjs';

@Injectable()

export class ProductsEffect{
 
    constructor(private action$:Actions, private productService:ProductService){}

    @Effect()
    loadProducts:Observable<Action> = this.action$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action:productActions.Load)=>this.productService.getProducts().pipe(
            map((products:Product[])=>(new productActions.LoadSuccess(products))),
            catchError((err)=>of(new productActions.LoadFail(err)))
        ))
    );

    @Effect()
    updateProduct:Observable<Action> = this.action$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        mergeMap((action:productActions.UpdateProduct)=>this.productService.updateProduct(action.payload).pipe(
            map((updatedProduct:Product)=>new productActions.UpdateSuccess(updatedProduct)),
            catchError((err)=>of(new productActions.UpdateFail(err)))
        ))
    );

    @Effect()
    createProduct:Observable<Action> = this.action$.pipe(
        ofType(productActions.ProductActionTypes.CreateProduct),
        mergeMap((action:productActions.CreateProduct)=>this.productService.createProduct(action.payload).pipe(
            map((createdProduct:Product)=>new productActions.CreateSuccess(createdProduct)),
            catchError((err)=>of(new productActions.CreateFail(err)))
        ))
    );
}