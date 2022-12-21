import { Component, OnInit } from '@angular/core';
import { Ticket } from '../_models/ticket';
import { TicketService } from '../_services/ticket.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  public tickets: Ticket[];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.getAllTickets();
  }


  public getAllTickets(): void {
    this.ticketService.getAllTickets().subscribe(
      (response: Ticket[]) => {
        this.tickets = response;
      }
    )
  }

  Delete(ticketid)
  {
    this.ticketService.deleteTicket(ticketid);
    alert("Ticket has been deleted");
    window.location.reload();
    
  }

}
