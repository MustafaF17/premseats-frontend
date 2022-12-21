import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user'
import { UserService } from '../_services/user.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public users: User[];

  closeResult: string;
  currentx: number;
  balance: number;
  roles: string;



  constructor(private userService: UserService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  //Method to get all users registered to the database
  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }


  //Get reason of why modal was dismissed
  private getDismissReason(reason: any): string {
    this.ngOnInit();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //Edit current team, but first open modal
  Edit(update, id) {

    this.modalService.open(update, { ariaLabelledBy: 'edit' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.currentx = id;
  }

  onSubmitEdit() {

    //Update users balance
    if (this.balance != null) {
      this.userService.updateBalance(this.currentx, this.balance);

    }

    //Update users role
    if (this.roles != null) {
      this.userService.updateRole(this.currentx, this.roles);
    }

    //If either is not null refresh
    if (this.roles != null || this.balance != null) {
      window.location.reload();
    }

  }
}
