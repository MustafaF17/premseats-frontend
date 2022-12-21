import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BasicAuthHtppInterceptorService } from './_services/basic-auth-htpp-interceptor-service.service';
import { TeamComponent } from './team/team.component';
import { NavComponent } from './nav/nav.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from './admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './payment/payment.component';
import { TicketComponent } from './ticket/ticket.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TeamComponent,
    NavComponent,
    LogoutComponent,
    AdminComponent,
    PaymentComponent,
    TicketComponent,
    ManageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    {  
      provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
