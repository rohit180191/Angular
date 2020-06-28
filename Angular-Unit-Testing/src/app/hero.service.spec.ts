import { MessageService } from './message.service';
import { HeroService } from './hero.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService',()=>{
    
    let mockMessageService;
    let httpTestController:HttpTestingController;
    let service:HeroService
    let httpUrl = 'api/heroes';

    beforeEach(()=>{
        mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[
                HeroService,
                {provide:MessageService,useValue:mockMessageService}
            ]
        });

        httpTestController = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);
    });

    describe("getHero",()=>{

        it("should call get with correct url",()=>{

            service.getHero(4).subscribe();
            const req = httpTestController.expectOne(`${httpUrl}/4`);
            req.flush({id:4,name:"SuperDude",strength:45});
            httpTestController.verify();

        });
    });

    describe("getHeroes",()=>{

        it("should call get with correct url",()=>{

            service.getHeroes().subscribe();
            const req = httpTestController.expectOne(`${httpUrl}`);
            req.flush([{id:1,name:"SuperDude1",strength:45},{id:4,name:"SuperDude4",strength:40}]);
            httpTestController.verify();

        })

    })



});