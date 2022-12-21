import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  pay: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  Pay() {

    console.log(this.pay);

    //Check postitive balance and not null
    if (this.pay == null || this.pay <= 0) {
      alert("You must top up a valid number");
    }

    //Update users balance
    else {
      let x = parseInt(sessionStorage.getItem('id'));
      this.userService.TopUp(x, this.pay);
      alert("Balance topped up with: $" + this.pay)
      this.router.navigate(['/home']);
    }
  }

}
