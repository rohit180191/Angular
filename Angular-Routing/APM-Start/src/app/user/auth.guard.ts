import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService:AuthService, private router:Router){

  }
  
  canActivate(next:ActivatedRouteSnapshot,
  state:RouterStateSnapshot) : Observable<boolean|UrlTree> | Promise<boolean|UrlTree>| boolean| UrlTree{
    if(this.authService.isLoggedIn){
      return true;
    }
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }

  canLoad(route:Route): boolean{
    if(this.authService.isLoggedIn){
      return true;
    }
    this.authService.redirectUrl = route.path;
    this.router.navigate(['/login']);
    return false;
  }

}
