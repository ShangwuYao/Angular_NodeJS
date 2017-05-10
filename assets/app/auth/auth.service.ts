import {User} from "./user.model";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

// so as to use http as before
@Injectable()
export class AuthService {
    constructor(private http: Http){}

    signup(user: User) {
        const body = JSON.stringify(user);
        return this.http.post('http://localhost:3000/user',body,{headers: {'Content-Type': 'application/json'}})
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.toString()));
    }
}