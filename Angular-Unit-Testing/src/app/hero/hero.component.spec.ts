import { RouterModule } from '@angular/router';
import { TestBed,ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser"

describe('HeroComponent Shallow Test',()=>{
    let fixture : ComponentFixture<HeroComponent>;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            schemas:[NO_ERRORS_SCHEMA]
        });
        fixture=TestBed.createComponent(HeroComponent);
    });

    it("should have the correct hero",()=>{
        //action
        fixture.componentInstance.hero = {id:1,name:"SuperDude",strength:3};

        //assertion
        expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
    });

    it("anchor should contain hero name",()=>{
        //action
        fixture.componentInstance.hero = {id:1,name:"SuperDude",strength:3};
        fixture.detectChanges();

        //assertion

        let debugElement = fixture.debugElement.query(By.css('a'));

        expect(debugElement.nativeElement.textContent).toContain('SuperDude');

        //expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });
});