import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/signup/login/login.component';
import { SigninComponent } from './components/signup/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PreferencePageComponent } from './components/preference-page/preference-page.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    NavComponent,
    LandingPageComponent,
    PreferencePageComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
