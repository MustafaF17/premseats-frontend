import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../_models/team';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiServerUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  public getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiServerUrl}/team/all`);
  }

  public addTeam(team: Team){
    return this.http.post(`${this.apiServerUrl}/team/add` , team).subscribe();
  }

  public updateTeam(team: Team, teamId: number){
    return this.http.put<Team>(`${this.apiServerUrl}/team/update/${teamId}` , team).subscribe();
  }

  public deleteTeam(teamId: number){
    return this.http.delete<void>(`${this.apiServerUrl}/team/delete/${teamId}`).subscribe();
  }


}
