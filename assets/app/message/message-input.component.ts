import {Component, OnInit} from "@angular/core";
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
export class MessageInputComponent implements OnInit{
    message: Message;

    constructor(private messageService: MessageService) {

    }
    onSubmit(form: NgForm){
        if (this.message) {
            // Edit
            // fill the frontend with the new one
            this.message.content = form.value.content;
            // pass it to the backend with service
            this.messageService.updateMessage(this.message)
                .subscribe(
                    result => console.log(result)
                );
            this.message = null;  // if it isn't null, the html page will get it

        } else {
            const message = new Message(form.value.content, 'Tom');
            this.messageService.addMessage(message)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
        }
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.message = null;
        form.resetForm();
    }

    ngOnInit() {
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.message = message
        );
    }
}