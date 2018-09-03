import { UserComponent } from './app/components/user/user.component';
import { UsersComponent } from './app/components/users/users.component';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'user/:id', component: UserComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'users' }
];

export const app_routing = RouterModule.forRoot(appRoutes);