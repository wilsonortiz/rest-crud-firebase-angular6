import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';

import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: any = []
  loadingList: boolean = true;
  update: boolean;

  constructor(private userService: UserService, private router: Router,
    private activatedRoute: ActivatedRoute, private modalService: NgbModal) {
    this.getUsers();
  }

  ngOnInit() {
  }

  getUser(id) {
    this.userService.getUser(id)
      .subscribe(res => {
        this.router.navigate(['/user', id])
      })
  }

  addNewUser() {
    this.update = false;
    this.router.navigate(['/user', 'new']);
    // this.activatedRoute.paramMap
  }

  private getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
      this.loadingList = false;
    })
  }

  openModalDelete(addUserModal, k) {

    const options: NgbModalOptions = {
      centered: true,
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'animated fadeIn fast'
    }

    this.modalService.open(addUserModal, options).result.then((result) => {
      this.deleteUser(k);
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


}
