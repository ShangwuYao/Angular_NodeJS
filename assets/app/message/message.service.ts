import {Message} from "./message.model";
import {Http, Response} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ErrorService} from "../errors/error.service";

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http, private errorService: ErrorService) {}

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        // send request to messsageRoutes in the back end
        // this line does not send the request yet
        // because no one has subscribed yet
        // so return it to the component
        // and subscribe in there
        return this.http.post('http://localhost:3000/message' + token, body, {headers: {'Content-Type': 'application/json'}})
            .map((response: Response) => {
                const result =  response.json();
                // also use _id in here, because it is also a response from the backend
                const message =  new Message(
                    // already returned the entire user object
                    result.obj.content,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id
                );
                this.messages.push(message);
                return message;
            })
            .catch((error: any) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.toString());
            });
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
                    // add the user information to the frontend
                    transformedMessages.push(new Message(
                        message.content,
                        message.user.firstName,
                        message._id,
                        message.user._id
                    ));
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: any) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.toString());
            });
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, {headers: {'Content-Type': 'application/json'}})
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.toString());
            });
    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        // call the delete router on the backend
        return this.http.delete('http://localhost:3000/message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.toString());
            });
    }
}