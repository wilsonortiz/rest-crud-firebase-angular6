import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { app_routing } from '../app.routes';
import { UserService } from './services/user.service';
import { KeysPipe } from './pipes/keys.pipe';

import { NgbModule, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './components/loading/loading.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserModalComponent } from './components/user/add-user-modal/add-user-modal.component';
import { GetUserModalComponent } from './components/user/get-user-modal/get-user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    KeysPipe,
    LoadingComponent,
    UsersComponent,
    AddUserModalComponent,
    GetUserModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    app_routing
  ],
  providers: [UserService, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
