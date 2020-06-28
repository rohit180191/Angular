import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { HeroService } from './../hero.service';
import { ActivatedRoute } from '@angular/router';
import { HeroDetailComponent } from './hero-detail.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from "rxjs";
import { fakeAsync } from "@angular/core/testing";
import { flush } from "@angular/core/testing";

describe("HeroDetailComponent",()=>{

    let fixture:ComponentFixture<HeroDetailComponent>;
    let mockHeroService, mockLocationService, mockActivatedRouteService;

    beforeEach(()=>{
        mockActivatedRouteService = {
                snapshot:{
                    paramMap:{
                        get:()=>{ return "3";}
                    }
                }
            };
        mockHeroService = jasmine.createSpyObj(['getHero','updateHero']);
        mockLocationService = jasmine.createSpyObj(['back']);    
        TestBed.configureTestingModule({
            imports:[FormsModule],
            declarations:[HeroDetailComponent],
            providers:[
                {provide:ActivatedRoute,useValue:mockActivatedRouteService},
                {provide:HeroService,useValue:mockHeroService},
                {provide:Location,useValue:mockLocationService}
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({id:3,name:"SuperDude",strength:101}));
    });

    it('should render hero in h2 tag',()=>{
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    });

    it("should call updateHero when save is called",fakeAsync(()=>{
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        flush();

        expect(mockHeroService.updateHero).toHaveBeenCalled();

    }));
});