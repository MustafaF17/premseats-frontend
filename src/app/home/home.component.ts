import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user'
import { UserService } from '../_services/user.service';
import { HttpClient } from '@angular/common/http';
import { TicketService } from '../_services/ticket.service';
import { Ticket } from '../_models/ticket';
import { Fixure } from '../_models/fixture';
import { FixtureService } from '../_services/fixture.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;
  balance: number;
  name: string;
  public fixtures: Fixure[];

  constructor(private userService: UserService, private http: HttpClient, private fixtureService: FixtureService, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.getUser();
    this.GetFixtures();
  }


  public getUser(): void {
    this.userService.getUser(sessionStorage.getItem('id')).subscribe(
      (response: User[]) => {
        this.user = response;
        console.log(response);
        this.balance = this.user['balance'];
        this.name = this.user['userName'];
      }
    )
  }

  public GetFixtures(): void {
    //Load each fixture
    this.fixtureService.getAllFixtures().subscribe(
      (response: Fixure[]) => {
        this.fixtures = response;
      }
    )


  }



  public Purchase(id, price, home, away, date, available) {

    if (this.balance == null) {
      alert("Log in to purchase tickets");

    }

    else if (available == 0)
    {
      alert("No more tickets available!");
    }


    //Check if balance is more than ticket price
    else if (price > this.balance) {
      alert("Insufficient funds, top up your account");
    }


    //Buy corresponding ticket
    //Subtract amount from balance.
    else {

      var ticket = <Ticket>{};
      ticket.home = home;
      ticket.away = away;
      ticket.price = price;
      ticket.userid = parseInt(sessionStorage.getItem('id'));
      ticket.date = date;

      this.ticketService.PurchaseTicket(ticket, id);
      alert("Ticket purchased");
      window.location.reload();

    }


  }
}
