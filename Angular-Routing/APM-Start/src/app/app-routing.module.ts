import { SelectiveStrategy } from './selective-strategy.service';
import { AuthGuard } from './user/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

const route:Routes =[
                {path:"welcome",component:WelcomeComponent},
                {path:"products",loadChildren:()=>
                    import('./products/product.module').then(m=>m.ProductModule),
                 canLoad:[AuthGuard],
                 data:{preload:false}   
                },
                {path:"",redirectTo:'welcome',pathMatch:"full"},
                {path:"**",component:PageNotFoundComponent}
];
@NgModule({
    imports:[
        RouterModule.forRoot(route,{useHash:true,enableTracing:true,preloadingStrategy: SelectiveStrategy})
    ],
    exports:[RouterModule]
})

export class AppRoutingModule{}