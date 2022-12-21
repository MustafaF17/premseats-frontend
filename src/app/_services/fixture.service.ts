import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fixure } from '../_models/fixture';

@Injectable({
  providedIn: 'root'
})
export class FixtureService {

  private apiServerUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  public getAllFixtures(): Observable<Fixure[]> {
    return this.http.get<Fixure[]>(`${this.apiServerUrl}/fixture/all`);
  }
}