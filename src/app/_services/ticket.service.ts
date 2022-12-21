import { Injectable } from '@angular/core';
import { Ticket } from '../_models/ticket';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiServerUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  public getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiServerUrl}/ticket/all`);
  }

  public GetMyTickets(userid): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiServerUrl}/ticket/mytickets/${userid}`);
  }

  public deleteTicket(ticketid: number){
    return this.http.delete<void>(`${this.apiServerUrl}/ticket/delete/${ticketid}`).subscribe();
  }


  public PurchaseTicket(ticket: Ticket, fixtureid) {
    //Add ticket to database
    this.http.post(`${this.apiServerUrl}/ticket/add`, ticket).subscribe();
    //Subtract user balance
    this.http.put(`${this.apiServerUrl}/user/topdown/${ticket.userid}/${ticket.price}`, '').subscribe();
    //Remove 1 availble from database
    return this.http.put(`${this.apiServerUrl}/fixture/loweravailable/${fixtureid}`, '').subscribe();
  }

}
