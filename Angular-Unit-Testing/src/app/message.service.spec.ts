import { MessageService } from './message.service';

describe('MessageService',()=>{
    let service:MessageService;

    beforeEach(()=>{
        service = new MessageService();
    });

    it("should have no messages to start",()=>{
        expect(service.messages.length).toBe(0);
    });

    it("should add a message when add called",()=>{
        service.add("Test Message");
        expect(service.messages.length).toBe(1);
    });

    it("should remove all messages when clear called",()=>{
        service.add("Test Message");
        service.clear();
        expect(service.messages.length).toBe(0);
    });
})