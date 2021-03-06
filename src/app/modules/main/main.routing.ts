import { AuthGuard } from './../security/services/auth.guard';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';


const ROUTES: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class MainRouting { }
