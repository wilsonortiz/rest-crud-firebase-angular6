import { User } from './../../../models/user.model';
import { NgbModal, NgbModalOptions, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { UsersComponent } from '../../users/users.component';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html'
})
export class AddUserModalComponent implements OnInit {
  user: User;
  saving: boolean = true;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, private userService: UserService, private router: Router,
    private usersComponent: UsersComponent) {
    this.user = new User();
  }

  public saveUser() {
    this.saving = false;
    this.userService.saveUser(this.user).subscribe(res => {
      if (res != null) {
        this.saving = true;
      }
      this.usersComponent.getUsers();
    })
  }

  openUserModal(content) {
    this.user = new User();
    const options: NgbModalOptions = {
      centered: true,
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'animated fadeIn fast',
      backdrop: 'static'
    }

    let modal = this.modalService.open(content, options);
    modal.result.then((result) => {
      this.saveUser();

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

  ngOnInit() {
  }

}
