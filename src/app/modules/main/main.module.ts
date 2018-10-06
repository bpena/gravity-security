import { MainRouting } from './main.routing';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

@NgModule({
    imports: [
        CommonModule,
        MainRouting
    ],
    declarations: [
        HomeComponent,
        MainComponent
    ]
})
export class MainModule { }
