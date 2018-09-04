import { UserService } from './../../services/user.service';
import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  id: string;
  user: User;
  readonly: boolean;
  title: string;
  saveLoading: boolean = false;
  getUserLoading: boolean;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.user = new User();

    this.activatedRoute.params.subscribe((res: User) => {
      this.id = res['id'];
      this.getUser(this.id);
    });
  }

  ngOnInit() {
    if (this.getIsNew(this.id)) {
      this.title = 'Nuevo usuario'
    }
  }

  saveUser(newUserForm: NgForm) {
    this.saveLoading = true;

    if (this.getIsNew(this.id)) {
      this.userService.saveUser(this.user).subscribe(res => {
        this.saveLoading = false;
        this.router.navigate(['/user', res['name']])
      })
    } else {
      this.userService.updateUser(this.user, this.id).subscribe(res => {
        this.saveLoading = false;
        this.readonly = true;
      })
    }
  }

  edit() {
    return (this.readonly ? this.readonly = false : this.readonly = true);
  }

  private getUser(id: string) {

    if (!this.getIsNew(id)) {
      this.getUserLoading = true;
      this.userService.getUser(id).subscribe((res: User) => {
        this.user = res;
        this.getUserLoading = false;
        this.title = this.user.name
        this.readonly = true;
      })
    } else {
      //new User
      this.getUserLoading = false;
    }
  }

  private getIsNew(id: string) {
    return (id === 'new' ? true : false);
  }

}
