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
    @Inject(MAT_DIALOG_DATA) public portfolio: Portfolio
  ){ }
  trade: Trade = new Trade(0, 0, 'SELL', '', '', '', 0);
  // portFolio: Portfolio = new Portfolio("","","",new Date(),"",0,0,0);
  sell() {
    let email = this.route.snapshot.paramMap.get('email') || 'test@test.com';
    console.log(this.portfolio);
    try{
      console.log(this.portfolio);
      let id = this.portfolio.externalId;
      this.trade.instrumentId = id;
      let p = this.portfolio.askPrice;
      this.trade.executionPrice = p;
      this.clientTradesService.recordTrade(email,this.trade);
      this.clientService.recordSellTradePortfolio(email,this.portfolio,this.trade);
      console.log(this.trade);
      // this.portFolio.externalId = id;
      // this.portFolio.externalType = this.price.instrument.externalIdType;
      // this.portFolio.categoryId = this.price.instrument.categoryId;
      // this.portFolio.priceTimestamp = this.price.priceTimestamp;
      // this.portFolio.instrumentDescription = this.price.instrument.instrumentDescription;
      // this.portFolio.askPrice = this.price.askPrice;
      // this.portFolio.bidPrice = this.price.bidPrice;
      // this.clientService.recordPortFolioData(email,this.portFolio);
      // this.clientTradesService.recordTrade(email, this.trade);
      // this.errorMessage = '';
      // console.log(this.clientTradesService.mockBalanceData.get(email) + "*********************");
      // // this.router.navigateByUrl('/trade/'+email)
      this.dialogRef.close({data: 'Refresh'});
      
    }
    catch(e) {
      this.errorMessage = 'Quantity provided is greater than the current holding';
      
    }
  }
}
