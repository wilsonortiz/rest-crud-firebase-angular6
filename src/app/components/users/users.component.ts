import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = []
  loadingList: boolean;

  constructor(private userService: UserService, private router: Router,
    private modalService: NgbModal) {
    this.getUsers();
  }

  getUsers() {
    this.loadingList = true;

    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.loadingList = false;
    })
  }

  openModalDelete(deleteUserModal, id: string) {

    const options: NgbModalOptions = {
      centered: true,
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'animated fadeIn fast'
    }

    this.modalService.open(deleteUserModal, options).result.then(result => {
      this.deleteUser(id);
    }, (reason) => {
      console.log(this.getDismissReason(reason));
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(res => {
      this.loadingList = true;
      this.getUsers();
    })
  }

  ngOnInit() {
  }

}
