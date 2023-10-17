import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/signup/login/login.component';
import { RegisterComponent } from './components/signup/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PreferencePageComponent } from './components/preference-page/preference-page.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TradeHistoryComponent } from './components/trade-history/trade-history.component';
import { ClientPreferencesComponent } from './components/client-preference/client-preference.component';
import { TradeComponent } from './components/trade/trade.component';
import { RoboAdvisorComponent } from './components/robo-advisor/robo-advisor.component';
import { ReportComponent } from './components/report/report.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from 'auth.guard';

const routes: Routes = [
  {path:'' , redirectTo:'landing-page', pathMatch:'full'},
  {path:'login' , component:LoginComponent,canActivate:[AuthGuard]},
  {path:'register' , component:RegisterComponent},
  {path:'preference' , component:ClientPreferencesComponent},
  {path:'portfolio' , component:PortfolioComponent},
  {path: 'trade-history', component:TradeHistoryComponent},
  {path: 'trade', component:TradeComponent},
  {path:'landing-page' , component:LandingPageComponent},
  {path:'home-page', component:HomePageComponent},
  {path:'robo-advisor',component:RoboAdvisorComponent},
  {path:'report', component:ReportComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterTestingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
