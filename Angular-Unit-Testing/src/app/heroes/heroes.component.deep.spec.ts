import { NO_ERRORS_SCHEMA, Input } from '@angular/core';
import { HeroComponent } from './../hero/hero.component';
import { of } from 'rxjs';
import { HeroService } from './../hero.service';
import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { Directive } from "@angular/core";

@Directive({
    selector:'[routerLink]',
    host:{'(click)':'onClick()'}
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams:any;
    navigateTo:any = null;

    onClick(){
        console.log("Clicked !!");
        this.navigateTo = this.linkParams;
    }
}
describe("HeroesComponent (deep Test)",()=>{

    let fixture:ComponentFixture<HeroesComponent>
    let mockHeroService
    let HEROES;


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
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers:[
                {provide:HeroService,useValue:mockHeroService }
            ],
            // schemas:[NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
        
    });


    it("should render each hero as HeroComponent",()=>{

        //arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        
        //action
        fixture.detectChanges();

        //assertion
        let heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toEqual(3);

        for(let i=0;i<heroComponentDEs.length;i++){
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }

    });

    it(`should call heroService.deleteHero when Hero Component's delete button clicked`,()=>{
        
        //arrange
        spyOn(fixture.componentInstance,'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        
        //action
        fixture.detectChanges();

        //assertion
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        for(let i=0;i<heroComponentDEs.length;i++){

         (<HeroComponent>heroComponentDEs[i].componentInstance).delete.emit(undefined);
       
         //   heroComponentDEs[i].query(By.css('button')).triggerEventHandler('click',
        //   {stopPropagation:()=>{}});

          expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[i]);
        }

    });

    it(`should add new hero to the hero list when add button clicked`,()=>{
        //arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const name = "Dr. Strange"
        mockHeroService.addHero.and.returnValue(of({id:4,name:name,strength:11}));
        const inputDE = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButtonDE = fixture.debugElement.queryAll(By.css('button'))[0];

        //action
        inputDE.value = name;
        addButtonDE.triggerEventHandler('click',null);
        fixture.detectChanges();
      
        //assertion
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;        
        expect(heroText).toContain(name);
        

    });

    it("should have correct route for the hero's",()=>{
        //arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const HeroComponentDE = fixture.debugElement.queryAll(By.directive(HeroComponent));

        for(let i=0;i<HeroComponentDE.length;i++){

            let routerLink = HeroComponentDE[i].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);

            HeroComponentDE[i].query(By.css('a')).triggerEventHandler('click',null);

            expect(routerLink.navigateTo).toBe(`/detail/${HEROES[i].id}`);

        }
    })
});