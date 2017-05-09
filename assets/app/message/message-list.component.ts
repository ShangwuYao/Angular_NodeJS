
import {Component, OnInit} from "@angular/core";
import {Message} from "./message.model";
import {MessageService} from "./message.service";

@Component({
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-message
                    [message]="message"
                    (editClicked)="message.content = $event"
                    *ngFor="let message of messages">
            </app-message>
        </div>
    `
})
export class MessageListComponent implements OnInit {
    messages: Message[];

    constructor(private messageServices: MessageService) {

    }

    ngOnInit() {
        // 由于是引用传递，所以能自动update，非常方便
        // 改成http response，所以要用subscribe
        this.messageServices.getMessages()
            .subscribe(
                (messages: Message[]) => {
                    this.messages = messages;
                }
            );
    }
}