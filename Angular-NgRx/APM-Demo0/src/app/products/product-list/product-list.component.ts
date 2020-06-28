import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/products.action';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';


  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  component = true;
  errorMessage$: Observable<string>;


  constructor(private store: Store<fromProduct.State>, private productService: ProductService) { }

  ngOnInit(): void {

    this.store.pipe(
      select(fromProduct.getCurrentProduct),
      takeWhile(()=>this.component)
  ).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.store.dispatch(new productActions.Load());

   this.store.pipe(
     select(fromProduct.getProducts),
     takeWhile(()=>this.component)
  ).subscribe((products:Product[])=>{
    this.products = products;
   });

    this.store.pipe(
      select(fromProduct.getShowProductCode),
      takeWhile(()=>this.component)
  ).subscribe((response:boolean)=>{
        this.displayCode = response;
    });

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    
  }

  ngOnDestroy(): void {
   this.component = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitialiseNewProduct());
  }

  productSelected(product: Product): void {
   this.store.dispatch(new productActions.SetCurrentProduct(product.id));
  }

}
