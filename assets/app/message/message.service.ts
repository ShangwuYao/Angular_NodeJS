import {Message} from "./message.model";
import {Http} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http) {}

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        // send request to messsageRoutes in the back end
        // this line does not send the request yet
        // because no one has subscribed yet
        // so return it to the component
        // and subscribe in there
        return this.http.post('http://localhost:3000/message', body, {headers: {'Content-Type': 'application/json'}})
            .map((response: Response) => {
                const result =  response.json();
                // also use _id in here, because it is also a response from the backend
                const message =  new Message(result.obj.content, 'Dummy', result.obj._id, null);
                this.messages.push(message);
                return message;
            })
            .catch((error: any) => Observable.throw(error.toString()));
    }


    getMessages() {
        return this.http.get('http://localhost:3000/message')
            .map((response: Response) => {
                // obj corresponding to the response on the server
                const messages = response.json().obj;
                // transform the messages to real Message objects
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    // order matters here
                    // message._id, because the messages returned here is the message model in the backend
                    transformedMessages.push(new Message(message.content, 'Dummy', message._id, null));
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: any) => Observable.throw(error.toString()));
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        return this.http.patch('http://localhost:3000/message/' + message.messageId, body, {headers: {'Content-Type': 'application/json'}})
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.toString()));
    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}