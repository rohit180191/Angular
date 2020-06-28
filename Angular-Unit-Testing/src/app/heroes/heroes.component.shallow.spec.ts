import { NO_ERRORS_SCHEMA, Input, Component } from '@angular/core';
import { of } from 'rxjs';
import { HeroService } from './../hero.service';
import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";


describe("HeroesComponent (shallow Test)",()=>{

    let fixture:ComponentFixture<HeroesComponent>
    let mockHeroService
    let HEROES;

    @Component({
        selector: 'app-hero',
        template: '<div></div>',
      })
    class FakeHeroComponent {
        @Input() hero: Hero;
    }

    beforeEach(()=>{
        HEROES = [
            {id:1,name:"SpiderMan",strength:8},
            {id:2,name:"WonderWomen",strength:80},
            {id:3,name:"SuperMan",strength:100}
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero'])
        TestBed.configureTestingModule({
            declarations:[
                HeroesComponent,
                FakeHeroComponent
            ],
            providers:[
                {provide:HeroService,useValue:mockHeroService }
            ],
            //schemas:[NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it("should set heroes correctly from service",()=>{
        //arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        //action
        fixture.detectChanges();

        //assertion
        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it("should create one li for each hero",()=>{

        //arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        
        //action
        fixture.detectChanges();

        //assertion
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });

});