import { Component, OnInit } from '@angular/core';
import { Ticket } from '../_models/ticket';
import { TicketService } from '../_services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  public tickets: Ticket[];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.getMyTickets();
  }

  public getMyTickets(): void {
    this.ticketService.GetMyTickets(sessionStorage.getItem('id')).subscribe(
      (response: Ticket[]) => {
        this.tickets = response;
      }
    )
  }

}
