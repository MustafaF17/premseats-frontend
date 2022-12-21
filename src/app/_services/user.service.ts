import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Data } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/allusers`);
  }

  public updateBalance(userID: number, balance: number) {
    return this.http.put(`${this.apiServerUrl}/user/setbalance/${userID}/${balance}`, '').subscribe();
  }

  public TopUp(userID: number, balance: number) {
    return this.http.put(`${this.apiServerUrl}/user/topup/${userID}/${balance}`, '').subscribe();
  }

  public updateRole(userID: number, role: string) {
    return this.http.put(`${this.apiServerUrl}/user/give/${userID}/${role}`, '').subscribe();
  }

  public getUser(userID){
    return this.http.get(`${this.apiServerUrl}/user/getuser/${userID}`);
  }

}
