import { Component } from '@angular/core';
import {EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Price } from 'src/app/models/price.model';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { Trade } from 'src/app/models/trade';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Portfolio } from 'src/app/models/portfolio.model';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent {
  errorMessage: string = '';
  constructor(
    private clientTradesService: ClientTradesService, 
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<SellComponent>,
    private clientService: ClientService, 
    // private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){ }
  trade: Trade = new Trade(0, 0, 'SELL', '', '', '', 0);
  isprofit: boolean = false;
  profitamt = 0;
  // portFolio: Portfolio = new Portfolio("","","",new Date(),"",0,0,0);
  sell() {
    try{
      console.log(this.data.portfolio);
      let id = this.data.portfolio.externalId;
      this.trade.instrumentId = id;
      let p = this.data.portfolio.askPrice;
      this.trade.executionPrice = p;
      this.clientTradesService.recordTrade(this.data.email,this.trade);
      this.clientService.recordSellTradePortfolio(this.data.email,this.data.portfolio,this.trade);
      console.log(this.trade);
      this.dialogRef.close({data: 'Refresh'});
      
    }
    catch(e) {
      this.errorMessage = 'Quantity provided is greater than the current holding';
      
    }
  }
  isProfit(portfolio:Portfolio):boolean{
  return this.clientService.isProfit(portfolio)
  }
  calculateProfitLossPercentage(portfolio:Portfolio):string {
    return this.clientService.calculateProfitLossPercentage(portfolio);
  }
  calculateAmount(){
    this.profitamt = this.trade.quantity*(this.data.portfolio.askPrice - this.data.portfolio.bidPrice);
  }

}
