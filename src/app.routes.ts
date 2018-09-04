import { UsersComponent } from './app/components/users/users.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'users' }
];

export const app_routing = RouterModule.forRoot(appRoutes);