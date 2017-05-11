import {User} from "./user.model";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ErrorService} from "../errors/error.service";

// so as to use http as before
@Injectable()
export class AuthService {
    constructor(private http: Http, private errorService: ErrorService){}

    signup(user: User) {
        const body = JSON.stringify(user);
        return this.http.post('http://localhost:3000/user',body,{headers: {'Content-Type': 'application/json'}})
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.toString());
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        return this.http.post('http://localhost:3000/user/signin',body,{headers: {'Content-Type': 'application/json'}})
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.toString());
            });
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}