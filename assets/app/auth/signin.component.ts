import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "./user.model";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
    signinForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit(){
        const user = new User(this.signinForm.value.email, this.signinForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
            );
        // clear the input and the button
        this.signinForm.reset();
    }
    // build a custom form
    ngOnInit(){
        this.signinForm = new FormGroup({
            // fields created by angular2 automatically
            // only define control here
            // could add a email validator regex here
            email: new FormControl(null, [
                Validators.required]),
            password: new FormControl(null, Validators.required)
        })
    }
}