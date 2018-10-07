import { SigninComponent } from './views/signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SignupComponent } from './views/signup/signup.component';


const ROUTES: Routes = [
    {
        path: '',
        component: SecurityComponent,
        children: [
            { path: 'login', component: SigninComponent },
            { path: 'register', component: SignupComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class SecurityRouting { }
