import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/signup/login/login.component';
import { SigninComponent } from './components/signup/signin/signin.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PreferencePageComponent } from './components/preference-page/preference-page.component';

const routes: Routes = [
  {path:'' , component: LandingPageComponent},
  {path:'login' , component:LoginComponent},
  {path:'signin' , component:SigninComponent},
  {path:'preference-page/:email' , component:PreferencePageComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
