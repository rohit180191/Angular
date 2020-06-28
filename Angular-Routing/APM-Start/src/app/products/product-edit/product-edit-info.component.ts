import { ProductResolved } from './../product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Product } from '../product';

@Component({
  templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm, {static: false}) productForm: NgForm;

  errorMessage: string;
  product : Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe((data:ProductResolved)=>{
      if(this.productForm){
        this.productForm.reset();
      }
      const resolvedData = data['resolveData'];
      this.product = resolvedData.product;
    });
  }
}
