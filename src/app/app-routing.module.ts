import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/signup/login/login.component';
import { SigninComponent } from './components/signup/signin/signin.component';

const routes: Routes = [
  {path:'' , redirectTo:'/login' , pathMatch: 'full'},
  {path:'login' , component:LoginComponent},
  {path:'signin' , component:SigninComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
