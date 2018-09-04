import { User } from './../../../models/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from '../../users/users.component';

@Component({
  selector: 'app-get-user-modal',
  templateUrl: './get-user-modal.component.html'
})
export class GetUserModalComponent implements OnInit {

  @Input('id') id: string;
  user: User;
  update: boolean = false
  loading: boolean;

  constructor(private userService: UserService, private router: Router, private modalService: NgbModal,
    private usersComponent: UsersComponent) {
    this.user = new User();
  }

  ngOnInit() {
  }

  private getUser(id) {
    this.loading = true;
    this.userService.getUser(id).subscribe((res: User) => {
      this.user = res;
      this.loading = false;
    })
  }

  private updateUser(user: User, id: string) {
    this.userService.updateUser(user, id).subscribe(res => {
      this.usersComponent.getUsers();
    })
  }

  openUserModal(content) {
    this.getUser(this.id);

    const options: NgbModalOptions = {
      centered: true,
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'animated fadeIn fast'
    }

    this.modalService.open(content, options).result.then((result) => {
      this.updateUser(this.user, this.id);
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

  edit() {
    return (this.update ? this.update = false : this.update = true)
  }


}
