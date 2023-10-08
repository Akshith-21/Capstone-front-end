import { Component, ViewChild } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { ClientService } from 'src/app/services/client.service';
import { PreferencePageComponent } from '../preference-page/preference-page.component';
import { ClientPreferencesComponent } from '../client-preference/client-preference.component';
import { ActivatedRoute } from '@angular/router';
import { Price } from 'src/app/models/price.model';
import { BuyComponent } from '../buy/buy.component';
import { MatDialog } from '@angular/material/dialog';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { Portfolio } from 'src/app/models/portfolio.model';
import { SellComponent } from '../sell/sell.component';

@Component({
  selector: 'app-robo-advisor',
  templateUrl: './robo-advisor.component.html',
  styleUrls: ['./robo-advisor.component.css']
})
export class RoboAdvisorComponent { 
  riskValue: string ='';
  email: any;
  openBuy:boolean= false;
  openSell:boolean =false;
  direction = 'BUY';
  fmtsService: any;
  allPrices: Price[] = [];
  prices: Price[] = [];
  public portfolio:Portfolio[] = [];






  constructor(private clientService:ClientService, private route:ActivatedRoute, private clientTradeService:ClientTradesService,  private dialog: MatDialog
    ){
 }
 roboAdvisorData:any;
 ngOnInit(){
  this.email = this.route.snapshot.paramMap.get('email');
  this.clientService.getRiskValue().subscribe({
    next:x=>{
      this.riskValue = x;
    console.log("Risk value", this.riskValue)}
  });
  this.fetchPortFolio(this.email);
  this.getRoboAdvisorData(this.riskValue)

  console.log("the email,", this.email+"the risk value", this.riskValue)
 }

  getRoboAdvisorData(riskValue:string){
    this.clientService.getRoboAdvisorData(riskValue).subscribe((data)=>{
        this.roboAdvisorData = data;
        
    })
    // this.roboAdvisorData = this.clientService.mockRoboAdvisorDataH;
    console.log("datain RA", this.roboAdvisorData)
  }

  ifBuy(){
    this.openBuy = true;
  }
  ifSell(){
    this.openSell = true;
  }

  buy(price: Price){
    
    this.dialog.open(BuyComponent,{
      data: {
        price: price,
        email:this.email
      },
      width: '500px',
      height: '500px'
    });
    this.dialog.afterAllClosed.subscribe((res) => {
      // received data from dialog-component
      console.log(res);
      this.ngOnInit();
    })
    this.email = this.email?this.email:'test@test.com';
    console.log(this.clientTradeService.mockBalanceData.get(this.email));
    // this.toBuy = price;
  }

  getBuyOrSellTrade(){
    if(this.direction =='BUY'){
      this.fetchAllTrades();
    }
     else if(this.direction == 'SELL'){
      let e = this.route.snapshot.paramMap.get('email');
      this.email = e?e:'test@test.com';
      this.fetchPortFolio(this.email);
    }
  }
  fetchAllTrades(){
    this.fmtsService.getAllPrices().subscribe((data: any) => this.allPrices = this.prices = data);

  }

    fetchPortFolio(email:string) {
      this.clientService.getPortfolioData(email).subscribe((data)=>{this.portfolio = data?data:this.portfolio;
        console.log(this.portfolio+"******")
      });
    }

    sell(portfolio: Portfolio){
    
      this.dialog.open(SellComponent,{
        data: {
          portfolio: portfolio,
          email: this.email
        },
        width: '500px',
        height: '500px'
      });
      this.dialog.afterAllClosed.subscribe((res) => {
        // received data from dialog-component
        // console.log(res);
        this.ngOnInit();
      })
      this.email = this.email?this.email:'test@test.com';
      console.log('Balance', this.clientTradeService.mockBalanceData.get(this.email));
      // this.toBuy = price;
    }
}
