import {NgModule} from "@angular/core";
import {MessagesComponent} from "./messages.component";
import {MessageListComponent} from "./message-list.component";
import {MessageInputComponent} from "./message-input.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MessageService} from "./message.service";

@NgModule({
    declarations: [
        MessagesComponent,
        MessageListComponent,
        MessagesComponent,
        MessageInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [MessageService]
})
export class MessageModule {

}