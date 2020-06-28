import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit, OnDestroy {
  public pageTitle = 'Welcome';

  ngOnInit() {
    console.log('Init');
  }
  ngOnDestroy(): void {
    console.log('Destroyed');
  }
}
