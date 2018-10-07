import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    private error: any;
    private signinForm: FormGroup;

    constructor(private authService: AuthService,
        private router: Router) {
    }

    ngOnInit() {
        this.signinForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

    signIn(form: NgForm) {
        if (form.valid) {
            /*
            const { email, password } = form.value;
            this.authService.signInWithEmailAndPassword(email, password)
                .then(data => this.goToDashboard(data, this))
                .catch(this.processError);
            */
        }
    }

    signInWithTwitter() {
        this.authService.signInWithTwitter()
            .then(data => this.goToDashboard(data, this))
            .catch(this.processError);
    }


    signInWithFacebook() {
        this.authService.signInWithFacebook()
            .then(data => this.goToDashboard(data, this))
            .catch(this.processError);
    }


    signInWithGoogle() {
        this.authService.signInWithGoogle()
            .then(data => this.goToDashboard(data, this))
            .catch(this.processError);
    }


    signInWithGithub() {
        this.authService.signInWithGithub()
            .then(data => this.goToDashboard(data, this))
            .catch(this.processError);
    }


    goToDashboard(value: any, that: any) {
        that.router.navigateByUrl('/main/home');
    }


    processError(err: any) {
        console.log(err);
    }
}
