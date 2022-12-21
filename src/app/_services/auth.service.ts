import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  AuthCheck(username, password) {
    let auth = username + ':' + password;
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(auth)
    })
     
    this.http.get(
      'http://localhost:8080/api/user/validate',
      { observe: 'response', 'headers': headers }
    )
      .subscribe(response => {
        
        // You can access status:
        let authstring = 'Basic ' + btoa(auth);

        sessionStorage.setItem('username', username);
        sessionStorage.setItem('basicauth', authstring);

        console.log(response.status);
        console.log("Logged in");
      },
        error => { alert("Invalid credentials"); }
      );
    
    this.GetRoles(auth);
    this.GetID(username);

  }

  GetRoles(auth) {
    this.http.post('http://localhost:8080/api/user/getrole', auth, { observe: 'response', responseType:'text' })
      .subscribe(response => {

        console.log(response.body);
        sessionStorage.setItem('role', response.body);
      });
  }

  GetID(username)
  {
    this.http.post('http://localhost:8080/api/user/getid', username, { observe: 'response', responseType:'text' })
      .subscribe(response => {

        console.log(response.body);
        sessionStorage.setItem('id', response.body);
      });
  }

}
    


