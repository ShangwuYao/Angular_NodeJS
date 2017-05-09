import {Component} from "@angular/core";
import {MessageService} from "./message.service";
import {Message} from "./message.model";
import {NgForm} from "@angular/forms";

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
    onSubmit(form: NgForm){
        const message = new Message(form.value.content, 'Tom');
        this.messageService.addMessage(message)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        form.resetForm();
    }
}