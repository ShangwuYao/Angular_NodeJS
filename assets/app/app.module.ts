import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {FormsModule} from "@angular/forms";
import {MessageComponent} from "./message/message.component";
import {MessageListComponent} from "./message/message-list.component";
import {MessageInputComponent} from "./message/message-input.component";
import {MessagesComponent} from "./message/messages.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {HeaderComponent} from "./header.component";

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent
    ],
    imports: [BrowserModule, FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}