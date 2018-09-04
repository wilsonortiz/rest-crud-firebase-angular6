import { UsersComponent } from './app/components/users/users.component';
import { GetUserModalComponent } from './app/components/user/get-user-modal/get-user-modal.component';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'user/:id', component: GetUserModalComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'users' }
];

export const app_routing = RouterModule.forRoot(appRoutes);