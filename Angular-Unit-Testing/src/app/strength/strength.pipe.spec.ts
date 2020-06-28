import { StrengthPipe } from './strength.pipe';

describe('StrenggthPipe',()=>{
    it('should display weak if strength is 5',()=>{
        let pipe = new StrengthPipe();

        expect(pipe.transform(5)).toEqual('5 (weak)');
    });


    it('should display weak if strength is 9',()=>{
        let pipe = new StrengthPipe();

        expect(pipe.transform(9)).toEqual('9 (weak)');
    });


    it('should display strong if strength is 10',()=>{
        let pipe = new StrengthPipe();

        expect(pipe.transform(10)).toEqual('10 (strong)');
    });

    it('should display strong if strength is 19',()=>{
        let pipe = new StrengthPipe();

        expect(pipe.transform(19)).toEqual('19 (strong)');
    });

    it('should display unbelievable if strength is 20',()=>{
        let pipe = new StrengthPipe();

        expect(pipe.transform(20)).toEqual('20 (unbelievable)');
    });
})