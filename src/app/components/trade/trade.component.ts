import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Price } from 'src/app/models/price.model';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { FmtsService } from 'src/app/services/fmts.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { BuyComponent } from '../buy/buy.component';
import { Portfolio } from 'src/app/models/portfolio.model';
import { ClientService } from 'src/app/services/client.service';
import { SellComponent } from '../sell/sell.component';
import { Balance } from 'src/app/models/balance';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  constructor(private cookieService: CookieService,
    private router: Router,
    private clientTradeService: ClientTradesService, 
    private fmtsService: FmtsService, 
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private clientService:ClientService
  ){}
  allPrices: Price[] = [];
  prices: Price[] = [];
  instrumentType: string = 'ALL';
  balance: number = 0;
  direction = 'BUY';
  public portfolio:Portfolio[] = [];
  
  ngOnInit() {
    // const token = this.cookieService.get('jwtToken');
    // if(!token){
    //   this.router.navigate(['login']);
    // }
    
    this.clientService.retrieveJsonPayLoadFromJwt();
    this.clientTradeService.setCreds(this.clientService.getCred());
    this.fetchPortFolio();
    this.fetchAllTrades();
    this.fetchBalance();
    // let b = this.clientTradeService.getBalance();
    // this.balance= b?b:0;
    console.log('Prices: ', this.prices);
  }

  fetchBalance() {
    this.clientTradeService.getBalance().subscribe({
      next: (response:Balance) => {
        console.log(response.balance,"Response balance:");
        this.balance = response.balance;
      },
      error:(error:any) =>{
          if(error.status===400)
          {
            console.log(error.error);
          }
      }
    });
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
      
      data: {
        price: price
      },
      width: '600px',
      height: '500px'
    });
    this.dialog.afterAllClosed.subscribe((res) => {
      // received data from dialog-component
      // console.log(res);
      this.ngOnInit();
    })
    // this.email = this.email?this.email:'test@test.com';
    console.log('Balance', this.clientTradeService.getBalance());
    // this.toBuy = price;
  }
  sell(portfolio: Portfolio){
    
    this.dialog.open(SellComponent,{
      data: {
        portfolio: portfolio
      },
      width: '600px',
      height: '500px'
    });
    this.dialog.afterAllClosed.subscribe((res) => {
      // received data from dialog-component
      // console.log(res);
      this.ngOnInit();
    })
    // this.email = this.email?this.email:'test@test.com';
    console.log('Balance', this.clientTradeService.getBalance());
    // this.toBuy = price;
  }
  
  getBuyOrSellTrade(){
    if(this.direction =='BUY'){
      this.fetchAllTrades();
    }
     else if(this.direction == 'SELL'){
      let e = this.route.snapshot.paramMap.get('email');
      // this.email = e?e:'test@test.com';
      this.fetchPortFolio();
    }
  }
  fetchAllTrades(){
    this.fmtsService.getAllPrices().subscribe(data => this.allPrices = this.prices = data);
  
    console.log(this.prices);
  }

    fetchPortFolio() {
      this.clientTradeService.getPortfolioData().subscribe((data)=>this.portfolio = data?data:this.portfolio);
    }
}
