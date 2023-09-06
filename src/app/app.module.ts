import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from "@angular/material/dialog";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/signup/login/login.component';
import { RegisterComponent } from './components/signup/register/register.component';
import { NavComponent } from './components/nav/nav.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PreferencePageComponent } from './components/preference-page/preference-page.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TradeHistoryComponent } from './components/trade-history/trade-history.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientPreferencesComponent } from './components/client-preference/client-preference.component';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TradeComponent } from './components/trade/trade.component';
import { BuyComponent } from './components/buy/buy.component'
import { RoboAdvisorComponent } from './components/robo-advisor/robo-advisor.component';;
import { DialogModule } from 'primeng/dialog';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { ReportComponent } from './components/report/report.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    LandingPageComponent,
    ClientPreferencesComponent,
    PortfolioComponent,
    HomePageComponent,
    UserProfileComponent,
    TradeHistoryComponent,
    TradeComponent,
    BuyComponent,
    RoboAdvisorComponent,
    PopupComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    CardModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
