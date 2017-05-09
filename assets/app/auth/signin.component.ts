import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
    signupForm: FormGroup;

    onSubmit(){
        console.log(this.signupForm);
        // clear the input and the button
        this.signupForm.reset();
    }
    // build a custom form
    ngOnInit(){
        this.signupForm = new FormGroup({
            // fields created by angular2 automatically
            // only define control here
            // could add a email validator regex here
            email: new FormControl(null, [
                Validators.required]),
            password: new FormControl(null, Validators.required)
        })
    }
}