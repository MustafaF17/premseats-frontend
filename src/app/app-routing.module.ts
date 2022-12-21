import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ManageComponent } from './manage/manage.component';
import { PaymentComponent } from './payment/payment.component';
import { TeamComponent } from './team/team.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = 
[
  {path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'team', component: TeamComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'pay', component: PaymentComponent },
    { path: 'ticket', component: TicketComponent },
    { path: 'manageticket', component: ManageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
