import {Component} from "@angular/core";
import {MessageService} from "./message.service";
import {Message} from "./message.model";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
    // telling it to create an instance of MessageService
    // and pass it to the constructor
    // , and can only use it in this component
    // providers: [MessageService]
})
export class MessageInputComponent {
    constructor(private messageService: MessageService) {

    }
    onSave(value: string){
        const message = new Message(value, 'Tom');
        this.messageService.addMessage(message);
    }
}