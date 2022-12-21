import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Team } from '../_models/team'
import { TeamService } from '../_services/team.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  public teams: Team[];
  isAdmin = false;
  closeResult: string;
  currentx: number;


  name: string;
  location: string;
  nrseats: number;
  imageurl: string;

  uname: string;
  ulocation: string;
  unrseats: number;
  uimageurl: string;

  constructor(private teamService: TeamService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.getTeams();
    let s = sessionStorage.getItem('role');
    if (s == "ROLE_ADMIN") { this.isAdmin = true; }
    else {
      this.isAdmin = false;
    }
  }


  public getTeams(): void {
    this.teamService.getTeams().subscribe(
      (response: Team[]) => {
        this.teams = response;
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  //Open modal
  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'add' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this.ngOnInit();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //Add new team to database
  onSubmit() {

    var team = <Team>{};
    team.name = this.name;
    team.nrSeats = this.nrseats;
    team.location = this.location;

    if (this.uimageurl == null) { team.imageUrl = "https://www.espn.com/i/teamlogos/soccer/500/default-team-logo-500.png?h=100&w=100" }
    else { team.imageUrl = this.uimageurl; }

    this.teamService.addTeam(team);
    window.location.reload();

  }

  closeModal() {
    window.location.reload();
  }

  Delete(id) {
    this.teamService.deleteTeam(id);
    window.location.reload();
  }


  //Edit current team, but first open modal
  Edit(update, id) {

    this.modalService.open(update, { ariaLabelledBy: 'edit' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.currentx = id;
  }

  //Edit existing Team
  onSubmitEdit() {

    var team = <Team>{};
    team.name = this.uname;
    team.location = this.ulocation;
    team.nrSeats = this.unrseats;

    if (this.uimageurl == null) { team.imageUrl = "https://www.espn.com/i/teamlogos/soccer/500/default-team-logo-500.png?h=100&w=100" }
    else { team.imageUrl = this.uimageurl; }

    this.teamService.updateTeam(team, this.currentx);
    window.location.reload();

  }


}