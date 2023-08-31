import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/signup/login/login.component';
import { SigninComponent } from './components/signup/signin/signin.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PreferencePageComponent } from './components/preference-page/preference-page.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

const routes: Routes = [
  {path:'' , redirectTo:'landing-page', pathMatch: 'full'},
  {path:'login' , component:LoginComponent},
  {path:'signin' , component:SigninComponent},
  {path:'preference-page/:type' , component:PreferencePageComponent},
  {path:'portfolio/:email' , component:PortfolioComponent},
  {path:'landing-page' , component:LandingPageComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
