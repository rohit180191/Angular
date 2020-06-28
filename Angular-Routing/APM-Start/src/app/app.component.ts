import { MessageService } from './messages/message.service';
import { slideInAnimation } from './app.animation';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading:boolean = false;
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMessageDisplayed():boolean{
    return this.messageService.isDisplayed;
  }

  constructor(private authService: AuthService,private router:Router,private messageService:MessageService) {
    router.events.subscribe((routerEvent:Event)=>{
      this.checkRouterEvent(routerEvent);
    });
   }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigateByUrl('/welcome');
  }

  checkRouterEvent(routerEvent:Event):void{
      if(routerEvent instanceof NavigationStart){
          this.loading = true;
      }
      else if(routerEvent instanceof NavigationEnd){
          this.loading = false;
      }
      else if(routerEvent instanceof NavigationCancel){
          this.loading = false;
      }
      else if(routerEvent instanceof NavigationError){
          this.loading = false;
      }
  }

  dispalyMessages():void{
    this.router.navigate([{ outlets:{ popup:['messages'] } } ]);
    this.messageService.isDisplayed = true;
  }

  hideMessages():void{
    this.router.navigate([{ outlets:{ popup:null } } ]);
    this.messageService.isDisplayed = false;
  }
}
