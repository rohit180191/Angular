import { AuthGuard } from './../user/auth.guard';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductResolver } from './product-resolver.seervice';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
          {
            path:'',
            component:ProductListComponent
          },
          {
            path:':id',
            component:ProductDetailComponent,
            resolve:{resolveData:ProductResolver}
          },
          {
            path:':id/edit',
            component:ProductEditComponent,
            resolve:{resolveData:ProductResolver},
            children:[
              {path:"",redirectTo:"info",pathMatch:"full"},
              {path:"info",component:ProductEditInfoComponent},
              {path:"tags",component:ProductEditTagsComponent} 
            ]
          }      
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ]
})
export class ProductModule { }
