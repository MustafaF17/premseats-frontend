import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../_services/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  message: any;
  
  
 

  constructor(private service:AuthService, private router: Router) {

  }

  ngOnInit(): void {
  }

  public LoginCheck() {
  
    this.service.AuthCheck(this.username, this.password);
    this.router.navigate(['/home']);
  
    
  }
}