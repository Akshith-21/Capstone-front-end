import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Price } from 'src/app/models/price.model';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { FmtsService } from 'src/app/services/fmts.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { BuyComponent } from '../buy/buy.component';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  constructor(private clientTradeService: ClientTradesService, 
    private fmtsService: FmtsService, 
    private route: ActivatedRoute,
    private dialog: MatDialog
  ){}
  email: string | null = '';
  allPrices: Price[] = [];
  prices: Price[] = [];
  instrumentType: string = '';
  balance: number = 0;
  
  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    this.email = this.email?this.email:'test@test.com';
    this.fmtsService.getAllPrices().subscribe(data => this.allPrices = this.prices = data);
    let b = this.clientTradeService.mockBalanceData.get(this.email);
    this.balance= b?b:0;
    console.log('Prices: ', this.prices);
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
        price: price,
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
