import { SecurityModule } from './modules/security/security.module';
import { MainModule } from './modules/main/main.module';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
    { path: '', redirectTo: '/main/home', pathMatch: 'full' },
    { path: 'main', loadChildren: () => MainModule },
    { path: 'security', loadChildren: () => SecurityModule },
];

export const AppRouting = RouterModule.forRoot(ROUTES);