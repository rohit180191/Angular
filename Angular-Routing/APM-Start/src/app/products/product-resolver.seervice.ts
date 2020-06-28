import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';
import { of } from 'rxjs/internal/observable/of';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProductResolved } from './product';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})

export class ProductResolver implements Resolve<ProductResolved>{
    constructor(private productService:ProductService){}
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<ProductResolved>{
           const id = +route.paramMap.get('id');
           if(isNaN(id)){
               const errorMsg = `Product id was not a number: ${id}`;
               return of({product:null,error:errorMsg}); 
           }
           return this.productService.getProduct(id).pipe(
               map(product=>({product:product})),
               catchError(error => {
                    const errorMsg = `Retrieval Error: ${error}`;
                    return of({product:null,error:errorMsg});
               }) 
            );
    }
}