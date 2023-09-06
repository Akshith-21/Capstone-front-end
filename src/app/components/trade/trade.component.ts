import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Price } from 'src/app/models/price.model';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { FmtsService } from 'src/app/services/fmts.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { BuyComponent } from '../buy/buy.component';
import { Portfolio } from 'src/app/models/portfolio.model';
import { ClientService } from 'src/app/services/client.service';
import { SellComponent } from '../sell/sell.component';
// import { SellComponent } from '../sell/sell.component';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  constructor(private clientTradeService: ClientTradesService, 
    private fmtsService: FmtsService, 
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private clientService:ClientService
  ){}
  email: string | null = '';
  allPrices: Price[] = [];
  prices: Price[] = [];
  instrumentType: string = '';
  balance: number = 0;
  direction = '';
  public portfolio:Portfolio[] = [];
  
  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    this.email = this.email?this.email:'';
    let b = this.clientTradeService.mockBalanceData.get(this.email);
    this.balance= b?b:0;
  }

  filterPrices(){
    this.prices = [];
    console.log('inside filter');
    for(let price of this.allPrices) {
      if(price.instrument.categoryId === this.instrumentType || this.instrumentType=='ALL') {
        console.log(price);
        this.prices.push(price);
      }
    }
  }

  buy(price: Price){
    
    this.dialog.open(BuyComponent,{
      data: price,
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
  sell(portfolio: Portfolio){
    
    this.dialog.open(SellComponent,{
      data: portfolio,
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
      let e = this.route.snapshot.paramMap.get('email');
      this.email = e?e:'test@test.com';
      this.fetchAllTrades(this.email);
    }
     else if(this.direction == 'SELL'){
      let e = this.route.snapshot.paramMap.get('email');
      this.email = e?e:'test@test.com';
      this.fetchPortFolio(this.email);
    }
  }
  fetchAllTrades(email:string){
    this.email = this.route.snapshot.paramMap.get('email');
    this.email = this.email?this.email:'test@test.com';
    this.fmtsService.getAllPrices().subscribe(data => this.allPrices = this.prices = data);
  
    console.log(this.prices);
  }

    fetchPortFolio(email:string) {
      this.clientService.getPortfolioData(email).subscribe((data)=>this.portfolio = data?data:this.portfolio);
    }
}
