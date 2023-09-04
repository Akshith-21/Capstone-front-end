import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/signup/login/login.component';
import { RegisterComponent } from './components/signup/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PreferencePageComponent } from './components/preference-page/preference-page.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  {path:'' , redirectTo:'landing-page', pathMatch:'full'},
  {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent},
  {path:'preference-page/:type' , component:PreferencePageComponent},
  {path:'portfolio/:email' , component:PortfolioComponent},
  {path:'landing-page' , component:LandingPageComponent},
  {path:'home-page/:email', component:HomePageComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
