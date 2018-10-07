import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _loggedIn = false;
    private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private authState: firebase.User = null;

    constructor(private fireauth: AngularFireAuth, private router: Router) {
        this.fireauth.authState.subscribe(auth => {
            this.authState = auth;
            this._loggedIn = this.authState !== null;
            this.loggedIn$.next(this._loggedIn);
        });
    }

    // Returns true if user is logged in
    authenticated(): boolean {
        return this.authState !== null;
    }

    get loggedIn() {
        return this.loggedIn$;
    }

    // Returns current user data
    get currentUser(): any {
        return this.authenticated() ? this.authState : null;
    }

    // Returns
    get currentUser$() {
        return this.fireauth.authState;
    }

    // Returns current user UID
    get currentUserId(): string {
        return this.authenticated() ? this.authState.uid : '';
    }

    // Anonimous User
    get currentUserAnonymous(): boolean {
        return this.authenticated() ? this.authState.isAnonymous : false;
    }

    // Returns current user display name or Guest
    get currentUserDisplayName(): string {
        if (!this.authState) { return 'Guest' }
        else if (this.currentUserAnonymous) { return 'Anonymous' }
        else { return this.authState['displayName'] || 'User without a Name' }
    }



    private login() {

    }

    private logout() {
        this.router.navigateByUrl('/security/login');
    }

    //// Social Auth ////

    signInWithGithub() {
        const _promise = this.fireauth.auth.signInWithPopup(
            new firebase.auth.GithubAuthProvider()
        );

        _promise
            .then(credential => {
                this.authState = credential.user;
                this.updateUserData();
            })
            .catch(error => this.handleError(error, this));

        return _promise;
    }

    signInWithGoogle() {
        const _promise = this.fireauth.auth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        );

        _promise
            .then(credential => {
                this.authState = credential.user;
                this.updateUserData();
            })
            .catch(error => this.handleError(error, this));

        return _promise;
    }

    signInWithFacebook() {
        const _promise = this.fireauth.auth.signInWithPopup(
            new firebase.auth.FacebookAuthProvider()
        );

        _promise
            .then(credential => {
                this.authState = credential.user;
                this.updateUserData();
            })
            .catch(error => this.handleError(error, this));

        return _promise;
    }

    signInWithTwitter() {
        const _promise = this.fireauth.auth.signInWithPopup(
            new firebase.auth.TwitterAuthProvider()
        );

        _promise
            .then(credential => {
                this.authState = credential.user;
                this.updateUserData();
            })
            .catch(error => this.handleError(error, this));

        return _promise;
    }



    //// Sign Out ////

    signout() {
        const _promise = this.fireauth.auth.signOut();

        _promise
            .then(() => this.logout())
            .catch(error => this.handleError(error, this));

        return _promise;
    }


    //// Helpers ////

    private updateUserData(): void {
        // Writes user name and email to firestore db
        // useful if your app display information about users or for admin features

        const path = `users`;
        const data = {
            email: this.authState.email,
            name: this.authState.displayName
        };
        /*
        this.db
            .collection(path)
            .doc(this.currentUserId)
            .set(data)
            .catch(error => this.handleError(error, this));
        */
    }

    private handleError(error: any, __this: any) {
        const errTitle = 'Server Error';
        let _errMsg = error.message;

        console.warn(_errMsg);
    }

}
