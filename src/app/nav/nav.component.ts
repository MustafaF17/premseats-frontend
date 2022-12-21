import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLogged = false;
  isAdmin = false;

  constructor() { }

  ngOnInit(): void { 
    let user = sessionStorage.getItem('username');
    let role = sessionStorage.getItem('role');

    if (role == "ROLE_ADMIN")
    {
      this.isAdmin = true;
    }

    else {
      this.isAdmin = false;
    }

    if (user != null)
    {
      this.isLogged = true;
    }
    else {
      this.isLogged = false;
    }
  }

}
