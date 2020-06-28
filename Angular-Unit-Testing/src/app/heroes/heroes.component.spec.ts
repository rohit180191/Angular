import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';

describe("HeroesComponent",()=>{
    let component:HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(()=>{
        HEROES = [
            {id:1,name:"SpiderMan",strength:8},
            {id:2,name:"WonderWomen",strength:80},
            {id:3,name:"SuperMan",strength:100}
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
        
        component = new HeroesComponent(mockHeroService);
    });

    

    describe('delete',()=>{

        //state based unit test

        it('should remove the indicated hero from list of heroes',()=>{

            //arrange
            mockHeroService.deleteHero.and.returnValue(of(true));

            component.heroes = HEROES;

            //Action
            component.delete(HEROES[2]);

            //Assertion
            expect(component.heroes.length).toBe(2);
        });

        //Interaction based unit test

        it("should call deleteHero",()=>{
            //arrange
            mockHeroService.deleteHero.and.returnValue(of(true));

            component.heroes = HEROES;

            //Action
            component.delete(HEROES[2]);

            //Assertion
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });
    });
    
});

